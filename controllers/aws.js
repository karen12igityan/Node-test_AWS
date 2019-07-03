const fs = require('fs');
const s3 = require('../lib/aws');

const bucketParams = {
  Bucket: process.env.AWS_BUCKET,
};

exports.uploadFile = (path) => {
  return new Promise((resolve, reject) => {
    console.log('path', path);
    fs.readFile(path, 'utf8', (err, file) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('file', file);
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: 'test.txt',
        Body: file,
        ContentType: 'text/txt',
        ACL: 'public-read',
      };
      return s3.upload(params, (error, data) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(data);
      });
    });
  });
};

exports.getBucketList = async () => {
  try {
    return await s3.listObjects(bucketParams).promise();
  } catch (e) {
    return Promise.reject(e);
  }
};
