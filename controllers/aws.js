const s3 = require('../lib/aws');

const bucketParams = {
  Bucket: process.env.AWS_BUCKET,
};

exports.getBucketList = async () => {
  try {
    return await s3.listObjects(bucketParams).promise();
  } catch (e) {
    return Promise.reject(e);
  }
};
