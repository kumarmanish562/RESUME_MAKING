import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb ) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${date.now()}-${file.orginalname}`)
  },
})

//File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

const upload = multer({
  storage, fileFilter
})
export default upload;