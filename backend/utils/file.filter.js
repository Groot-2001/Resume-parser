const path = require('path');
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = ['.pdf', '.doc', '.docx'];
    const allowedMime = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedExt.includes(ext) && allowedMime.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .pdf, .doc, and .docx files are allowed!"), false);
    }
};

module.exports = fileFilter;