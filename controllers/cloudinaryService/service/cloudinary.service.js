const cloudinaryClient = require("cloudinary").v2;
const AWS = require("aws-sdk");

cloudinaryClient.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.en.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
class CloudinaryClass {
  constructor() {}
  async uploadPhoto(file) { 
    //data:image/${extension};base64${Buffer.from(file, "binary").toString("base64")}
    const uploadToS3 = await new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: "starcatering",
          Key: file.name, 
          Body: Buffer.from(file.data, "base64"),
        },
        function(err, image) {
          if (err) {
            throw err;
          }
          resolve(image);
        }
      );
    });

    const uploadToCloudinary = await new Promise((resolve, reject) => {
      cloudinaryClient.uploader.upload(
        `https://starcatering.s3.us-east-2.amazonaws.com/${file.name}`,
        {
          tags: "connectMe2OppourtunityProvider",
          transformation: { size: "500", width: "500" },
        },
        function(err, image) {
          if (err) {
            console.warn(err);
            reject(err);
          }
          console.log(image);
          resolve(image);
        }
      );
    });

    return uploadToCloudinary.secure_url;
  }

  async uploadVideo(file) {
    const uploadVideoToS3 = await new Promise((resolve, reject) => {
        s3.putObject(
          {
            Bucket: "starcatering",
            Key: 'newnameAgain.mp4',
            Body: Buffer.from(file.data, "base64"),
          },
          function(err, image) {
            if (err) {
              throw err;
            }
            resolve(image);
          }
        );
      });

      const uploadVideoToCloudinary = await new Promise((resolve, reject) => {
        cloudinaryClient.uploader.upload(
            `https://starcatering.s3.us-east-2.amazonaws.com/${file.name}`,
          {
            tags: "ProviderVideo",
             resource_type: "video"
          },
          function(err, image) {
            if (err) {
              console.log(err);
              reject(err);
            }
            console.log(image);
            resolve(image);
          },
        );
      });

      return uploadVideoToCloudinary.secure_url
  }
}

module.exports = {
  CloudinaryClass,
};
