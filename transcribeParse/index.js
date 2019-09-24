var uuid = reqiure('uuid/v4');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({region: "us-west-2"});
var dynamodb = new AWS.DynamoDB();

AWS.config.update({accessKeyId: "AKIASY7YKZ7IGGPVWQ7N"/*process.env.AWS_ACCESS_KEY_ID*/, secretAccessKey: "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"/*process.env.AWS_SECRET_ACCESS_KEY*/, region: "us-west-2"});
const transcribeKey = event.Records[0].s3.object.key;
const transcribeInfo = transcribeKey.split('_');
exports.handler = function(event, context, callback){
    var getParams = {
        Bucket: 'hro-transcriptions', //replace example bucket with your s3 bucket name
        Key: event.Records[0].s3.object.key
    }
    return s3.getObject(getParams, (err, data)=> {
      if(err) console.log(err);
      else{
        const obj = JSON.parse(data.Body.toString()).results.items;
        console.log('OBJ', obj);
        const convo = obj.reduce((accu, el) =>{
          const wordObj = el.alternatives[0];
          accu += `confidence: ${wordObj.confidence}----content: ${wordObj.content} \n`
          return accu;
        }, '');
        console.log('CONVO', convo);
        var table = 'Message-uj5r2vhvnzejnkyslfkscgvdpi-dev';
        const id = uuid();
        const chatbot = true;
        const content = convo;
        const createdAt = new Date().toISOString();
        const file = true;
        const isSent = true;
        const messageConversationId = transcribeInfo[2];
        const owner = transcribeInfo[1];
        const ownerName = transcribeInfo[0];
        const updatedAt = createdAt;

        var Item = {
          __typename: 'Message',
          id,
          chatbot,
          content,
          createdAt,
          file,
          isSent,
          messageConversationId,
          owner,
          ownerName,
          updatedAt
        }
        docClient.put({TableName: table, Item, ReturnValues: 'ALL_OLD'}, (err, data) => {
          if(err)console.log(err);
          else{
            console.log("Added item", JSON.stringify(data));
          }
        });
        callback(null, event);
      }
    })
}