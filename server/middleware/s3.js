import AWS from 'aws-sdk';
import * as fs from 'fs';
import express from 'express';
import multer from 'multer';
import * as path from 'path';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
});

const s3 = new AWS.S3();
const router = express.Router();
const upload = multer({ dest: 'public/' });


const uploadFile = async (req, res) => {
  const file = req.file;
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
    ContentDisposition: 'inline',
    ContentType: 'application/pdf'
  };

  s3.upload(s3Params, function(err, data) {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).send('Error uploading file');
    }

    // Optionally, remove the file from the local uploads folder
    fs.unlinkSync(file.path);

    res.status(200).send({documentName: data.key});
  });
};

const downloadFile = async (req, res) => {
  const filename = req.params.filename;

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename
  };

  s3.headObject(s3Params, function(err, metadata) {
    if (err && err.code === 'NotFound') {
      return res.status(404).send('File not found');
    } else {
      const fileStream = s3.getObject(s3Params).createReadStream();
      res.attachment(filename);
      fileStream.pipe(res);
    }
  });
}

const getPresignedReadUrl = async (req, res) => {
  const filename = req.params.filename;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Expires: 60 * 5,
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    console.log('Pre-signed URL:', url);
    return res.status(200).send(url);
  } catch (error) {
    res.status(500).send('Error generating pre-signed URL:', error);
    console.error('Error generating pre-signed URL:', error);
  }
};

router.post('/upload', upload.single('file'), uploadFile);

router.get('/download/:filename', downloadFile);

router.get('/show/:filename', getPresignedReadUrl);

export default router;