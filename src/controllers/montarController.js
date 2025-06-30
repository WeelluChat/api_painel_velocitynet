const Planos = require("../models/montarPlanos");

exports.MontarGet = async (req, res) => {
    try {
        const getPlanos = await Planos.find();
        res.send(getPlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.MontarPost = async (req, res) => {
    try {
        const postPlanos = new Planos({
            nome: req.body.nome,
            velocidade: req.body.velocidade,
            valor: req.body.valor,
            image: req.body.image,
            beneficios: req.body.beneficios,
        });
        await postPlanos.save();
        res.send(postPlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.MontarPut = async (req, res) => {
    const putPlanos = await Planos.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    try {
        res.send(putPlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.MontarDelete = async (req, res) => {
    const deletePlanos = await Planos.findByIdAndDelete(req.params.id);
    try {
        res.send(deletePlanos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


