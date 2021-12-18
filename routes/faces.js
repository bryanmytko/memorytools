require('dotenv').config();

const AWS = require('aws-sdk');
const faker = require('faker');

const BUCKET_NAME = "peoplethatdontexist";
const FACES_LEN = 20;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const params = {
  Bucket: BUCKET_NAME
};

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const URI = `https://${BUCKET_NAME}.s3.amazonaws.com`;
  let images = [];

  s3.listObjectsV2(params, (err, data) => {
    if(err) console.log(err, err.stack);
    const randomImages = [];

    data.Contents.forEach(d => {
      images.push(`${URI}/${d.Key}`);
    });

    for(i = 0; i < FACES_LEN; i++){
      const ran = Math.floor(Math.random() * images.length);
      const img = images[ran];
      randomImages.push({ img, name: faker.name.findName() });
      images.pop(img); // avoid duplicates by removing from the array
    }

    res.render('faces', { data: { faces: randomImages }});
  });
});

module.exports = router;
