const multer = require('multer');
const path = require('path');
const express = require("express");
const router = express.Router();

const fileExtensions = {
    "image/png": ".png",
    "image/gif": ".gif",
    "image/jpeg": ".png",
}
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/photos"));
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + "-" + Date.now() + fileExtensions[file.mimetype];
        req.savedFile = fileName;
        cb(null, fileName)
    }
})
const upload = multer({storage: diskStorage});


router.post("/", upload.array("file", 9), (req, res) => {
    // console.log(req.files)
    res.json({files: req.files});
})
// router.post("/", upload.single("file"), (req, res) => {
//     res.json({filePath: "/public/photos/" + req.savedFile});
// })

module.exports = router;