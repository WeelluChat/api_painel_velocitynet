const multer = require("multer");
const storage = require("./storage");
const storageArray = require("./storageArray");

const upload = multer({ storage });
const uploadArray = multer({ storage: storageArray });

module.exports = { upload, uploadArray };
