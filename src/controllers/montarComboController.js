const Combo = require("../models/montarCombos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const beneficiosStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/beneficios');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix + ext);
    }
});

const uploadBeneficio = multer({
    storage: beneficiosStorage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG, GIF)'));
        }
    }
});

const generateFields = () => {
    const fields = [];
    for (let p = 0; p < 10; p++) {
        for (let b = 0; b < 10; b++) {
            fields.push({ name: `beneficio${p}_${b}_image`, maxCount: 1 });
        }
    }
    return fields;
};

const uploadBeneficios = multer({ storage: beneficiosStorage }).fields(generateFields());

exports.CombosGet = async (req, res) => {
    try {
        const combos = await Combo.find();
        res.send(combos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.CombosPost = [
    uploadBeneficios,
    async (req, res) => {
        try {
            const { title, isVisible } = req.body;
            let planosParsed = [];

            if (req.body.planos) {
                planosParsed = JSON.parse(req.body.planos);
            }

            planosParsed.forEach((plano, pIndex) => {
                if (plano.beneficios && Array.isArray(plano.beneficios)) {
                    plano.beneficios.forEach((beneficio, bIndex) => {
                        const fileKey = `beneficio${pIndex}_${bIndex}_image`;
                        if (req.files[fileKey] && req.files[fileKey][0]) {
                            beneficio.image = req.files[fileKey][0].filename;
                        }
                    });
                }
            });

            const novoCombo = new Combo({
                title,
                isVisible,
                planos: planosParsed,
            });

            await novoCombo.save();
            res.status(201).send(novoCombo);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
        }
    },
];

exports.CombosPut = async (req, res) => {
    try {
        const comboAtualizado = await Combo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.send(comboAtualizado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.CombosDelete = async (req, res) => {
    try {
        const comboDeletado = await Combo.findByIdAndDelete(req.params.id);
        res.send(comboDeletado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.AtualizarPlanoViaBody = async (req, res) => {
    try {
        const { comboId, planoId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        Object.assign(plano, updateData);
        await combo.save();

        res.send(plano);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.AtualizarBeneficioViaBody = async (req, res) => {
    try {
        const { comboId, planoId, beneficioId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const beneficio = plano.beneficios.id(beneficioId);
        if (!beneficio) return res.status(404).send({ message: "Benefício não encontrado" });

        Object.assign(beneficio, updateData);
        await combo.save();

        res.send(beneficio);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.AtualizarDetalheViaBody = async (req, res) => {
    try {
        const { comboId, planoId, detalheId, ...updateData } = req.body;

        const combo = await Combo.findById(comboId);
        if (!combo) return res.status(404).send({ message: "Combo não encontrado" });

        const plano = combo.planos.id(planoId);
        if (!plano) return res.status(404).send({ message: "Plano não encontrado" });

        const detalhe = plano.detalhes.id(detalheId);
        if (!detalhe) return res.status(404).send({ message: "Detalhe não encontrado" });

        Object.assign(detalhe, updateData);
        await combo.save();

        res.send(detalhe);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.AtualizarImagemBeneficio = [
    uploadBeneficio.single('imagem'),
    async (req, res) => {
        try {
            const { comboId, planoId, beneficioId } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Nenhuma imagem válida foi enviada"
                });
            }

            if (!comboId || !planoId || !beneficioId) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    success: false,
                    message: "IDs do combo, plano e benefício são obrigatórios"
                });
            }

            const combo = await Combo.findById(comboId);
            if (!combo) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({
                    success: false,
                    message: "Combo não encontrado"
                });
            }

            const plano = combo.planos.id(planoId);
            if (!plano) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({
                    success: false,
                    message: "Plano não encontrado"
                });
            }

            const beneficio = plano.beneficios.id(beneficioId);
            if (!beneficio) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({
                    success: false,
                    message: "Benefício não encontrado"
                });
            }

            if (beneficio.image) {
                const oldImagePath = path.join(__dirname, '../uploads/beneficios', beneficio.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            beneficio.image = req.file.filename;
            await combo.save();

            res.json({
                success: true,
                message: "Imagem do benefício atualizada com sucesso",
                imageUrl: `/uploads/beneficios/${req.file.filename}`,
                beneficio: beneficio.toObject()
            });

        } catch (error) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }

            console.error("Erro ao atualizar imagem:", error);
            res.status(500).json({
                success: false,
                error: "Erro ao atualizar imagem",
                details: error.message
            });
        }
    }
];