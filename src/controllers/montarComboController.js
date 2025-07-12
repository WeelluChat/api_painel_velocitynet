const Combo = require("../models/montarCombos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/beneficios";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Gerar campos para benefícios
const generateFields = () => {
    const fields = [];
    for (let p = 0; p < 10; p++) {
        for (let b = 0; b < 10; b++) {
            fields.push({ name: `beneficio${p}_${b}_image`, maxCount: 1 });
        }
    }
    return fields;
};
const uploadBeneficios = upload.fields(generateFields());

// GET all combos
exports.CombosGet = async (req, res) => {
    try {
        const combos = await Combo.find();
        res.send(combos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// POST combo com imagem nos benefícios
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

// PUT combo completo
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

// DELETE combo
exports.CombosDelete = async (req, res) => {
    try {
        const comboDeletado = await Combo.findByIdAndDelete(req.params.id);
        res.send(comboDeletado);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// ✅ Atualizar plano (subdocumento do Combo)
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

// ✅ Atualizar benefício (subdocumento de plano dentro do Combo)
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

// ✅ Atualizar detalhe (subdocumento de plano dentro do Combo)
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
