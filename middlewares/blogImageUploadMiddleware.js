const multer = require("multer");
const path = require("path");

function blogImageUploadMiddleware(fieldname) {
  let middleware;
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve("./public/uploads"));
      },
      filename: (req, file, cb) => {
        const fileUniqueName = Date.now() + "-" + file.originalname;
        cb(null, fileUniqueName);
      },
    });

    const fileFilter = (req, file, cb) => {
      if (!file) {
        // If no file, just skip filtering
        return cb(null, true);
      }

      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        cb(null, true);
      } else {
        return cb(new Error("Only .jpeg, .jpg, .png files supported!"));
      }
    };

    const upload = multer({
      storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter,
    });

    middleware = upload.single(fieldname);
  } catch (error) {
    console.error(
      "File:Backend/middlewares/blogImageUploadMiddleware.js:47 from 'blogImageUploadMiddleware' method error:- ",
      error
    );
    return (req, res, next) => next(error);
  }

  return function (req, res, next) {
    middleware(req, res, function (error) {
      if (error) {
        return res.status(400).json({
          success: false,
          message:
            "File:Backend/middlewares/blogImageUploadMiddleware.js:47 from 'blogImageUploadMiddleware's' returnned method ",
          error: error.message,
        });
      }
      next();
    });
  };
}

module.exports = { blogImageUploadMiddleware };
