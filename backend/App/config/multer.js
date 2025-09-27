import multer from 'multer';
import fs from 'fs';
import path from 'path';
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls') {
            return cb(new Error('Only Excel files are allowed'));
        }
        cb(null, true);
    }
});
export default upload;
