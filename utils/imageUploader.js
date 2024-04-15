const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  return new Promise((resolve, reject) => {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    // Convert buffer to readable stream
    const readableStream = streamifier.createReadStream(file);

    readableStream.pipe(uploadStream);
  });
};
