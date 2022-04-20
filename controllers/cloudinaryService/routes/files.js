var express = require('express');
var router = express.Router();
const { CloudinaryClass}  = require('../service/cloudinary.service');


const cloudinaryClient = new CloudinaryClass()
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/uploadImage', async function(req, res, next) {
 const fileUrl = await cloudinaryClient.uploadPhoto(req.files.image, req.files.image.mimetype.split('/')[1])
  res.json({url:fileUrl});
});

router.post('/uploadVideo', async function(req, res, next) {
  const fileUrl = await cloudinaryClient.uploadVideo(req.files.image, req.files.image.mimetype.split('/')[1])
   res.json({videoUrl:fileUrl});
 });

module.exports = router;
