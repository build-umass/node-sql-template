const fs = require('fs');
const knex = require('../database/database');
const multer = require('multer');
const router = require('express').Router();

const dir = "\\tmp";

let storage = multer.diskStorage({
    // file uploaded is stored in local directory
    destination: (req, file, cb) => {
        const uploadDir = "\\tmp/uploads/"
        // create a new local directory if it did not already exist
        fs.exists(uploadDir, exist => {
            if (!exist) {
                return fs.mkdir(uploadDir, {recursive: true }, err => cb(err, uploadDir));
            }
            return cb(null, uploadDir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({ storage: storage });

// [base] = localhost:[port]/files
// POST [base]/upload/[a username] attached with a file that has fieldname:'myfile'
// to upload an arbitrary file to the database
router.post('/upload/:user', upload.single('myfile'), async (req, res, next) => {
    try {
        let username = req.params.user;
        let path = req.file.destination + req.file.filename
        await knex.raw('INSERT INTO "files" VALUES (?, pg_read_binary_file(?), ?)',
                        [req.file.filename, path, username]);
        res.send("Succesfully uploads file");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;