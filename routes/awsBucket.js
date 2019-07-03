const path = require('path');
const express = require('express');

const s3 = require('../controllers/aws');

const bucketRouter = express.Router();

bucketRouter.get('/', async (req, res) => {
  try {
    const data = await s3.getBucketList();
    console.log(data);
    for (let index = 1; index < data.Contents.length; index += 1) {
      console.log(data.Contents[index].Key);
    }
    res.json(data.Contents);
  } catch (e) {
    res.status(500).json(e);
  }
});

bucketRouter.post('/upload', async (req, res) => {
  try {
    const data = await s3.uploadFile(path.resolve(__dirname, '../', 'public/test.txt'));
    console.log('data', data);
    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = bucketRouter;
