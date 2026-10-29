import "dotenv/config";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = {
  _handleFile(req, file, cb) {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "projeto-arts",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png"],
      },
      (error, result) => {
        if (error) {
          return cb(error);
        }

        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          size: result.bytes,
        });
      }
    );

    file.stream.pipe(upload);
  },
  _removeFile(_req, file, cb) {
    if (!file.filename) {
      return cb();
    }

    cloudinary.uploader.destroy(file.filename, cb);
  },
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens JPG, PNG e JPEG são permitidas."));
    }
  },
});
