const AWS = require('aws-sdk');
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: "us-west-2"});
var transcribeService = new AWS.TranscribeService;
exports.handler = async (event) => {
  const s3Url = /*s3 bucket*/ + event.Records[0].s3.object.key;
  const fileName = event.Records[0].s3.object.key.split('.')[0]; //removing .wav from filename
  console.log(fileName);
  return transcribeService.startTranscriptionJob({
    LanguageCode: 'en-US',
    Media: {MediaFileUri: s3Url},
    MediaFormat: 'wav',
    TranscriptionJobName: fileName, 
    OutputBucketName: 'hro-transcriptions'
  },(err,data) => {if(err) console.log(err); else {console.log('WE FINISHED'); console.log('DATA+++', data)}});

};
