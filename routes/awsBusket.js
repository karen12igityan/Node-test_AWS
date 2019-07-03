const express = require('express');

const bucketList = require('../controllers/aws');

const busketRouter = express.Router();

busketRouter.get('/', async (req, res) => {
  try {
    const data = await bucketList.getBucketList();
    console.log(data);
    for (let index = 1; index < data.Contents.length; index += 1) {
      console.log(data.Contents[index].Key);
    }
    res.json(data.Contents);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = busketRouter;
