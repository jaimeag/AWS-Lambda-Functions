//set up aws sdk
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: "us-west-2"});
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  region: "us-west-2"
});
exports.handler = async (event) => {
    return {
      link: s3.getSignedUrl('putObject', {
        Bucket: /*s3 bucket*/,
        ACL: 'public-read',
        ContentType: 'audio/wav',
        Key: 'audio/' + event.fileName,
        Expires: 60 //seconds
        })
    }
};
