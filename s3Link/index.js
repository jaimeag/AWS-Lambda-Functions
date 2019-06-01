//set up aws sdk
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
exports.handler = async (event) => {
    return s3.getSignedUrl('getObject', {
       Bucket: 'Transcribe_Conversation',
       Key: '/audio/' + event.fileName,
       Expires: 60 //seconds
    });
};
