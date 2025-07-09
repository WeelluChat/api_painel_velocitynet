// const fs = require('fs');
// const path = require('path');
// const Planos = require("../models/montarPlanos");
// const multer = require('multer');

// // === MULTER SETUP ===
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// exports.uploadFiles = upload.fields([
//     { name: 'beneficiosImages', maxCount: 10 }
// ]);

// function salvarImagemBase64(base64String, prefix = "img") {
//     const matches = base64String.match(/^data:(.+);base64,(.+)$/);
//     if (!matches) return null;

//     const ext = matches[1].split('/')[1];
//     const data = matches[2];
//     const buffer = Buffer.from(data, 'base64');
//     const filename = `${prefix}-${Date.now()}.${ext}`;
//     const filepath = path.join(__dirname, '..', 'uploads', filename);
//     fs.writeFileSync(filepath, buffer);
//     return filename;
// }

// exports.MontarGet = async (req, res) => {
//     // try {
//         const getPlanos = await Planos.find();
//         res.send(getPlanos);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// exports.MontarPost = async (req, res) => {
//     try {
//         let beneficios = [];

//         if (req.body.beneficios) {
//             if (typeof req.body.beneficios === 'string') {
//                 beneficios = JSON.parse(req.body.beneficios);
//             } else {
//                 beneficios = req.body.beneficios;
//             }
//         }

//         if (req.files && req.files.beneficiosImages) {
//             beneficios = beneficios.map((b, i) => ({
//                 ...b,
//                 image: req.files.beneficiosImages[i] ? req.files.beneficiosImages[i].filename : null,
//             }));
//         } else {
//             beneficios = beneficios.map((b, i) => {
//                 if (b.imageBase64) {
//                     return {
//                         ...b,
//                         image: salvarImagemBase64(b.imageBase64, `beneficio-${i}`)
//                     };
//                 }
//                 return b;
//             });
//         }

//         const novoPlano = new Planos({
//             nome: req.body.nome,
//             velocidade: req.body.velocidade,
//             valor: req.body.valor,
//             beneficios: beneficios,
//         });

//         await novoPlano.save();
//         res.status(201).send(novoPlano);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error.message });
//     }
// };

// exports.MontarPut = async (req, res) => {
//     try {
//         const putPlanos = await Planos.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.send(putPlanos);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// exports.MontarDelete = async (req, res) => {
//     try {
//         const deletePlanos = await Planos.findByIdAndDelete(req.params.id);
//         res.send(deletePlanos);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };
