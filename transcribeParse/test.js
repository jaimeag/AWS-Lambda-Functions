var uuid = require('uuid/v4');
var AWS = require('aws-sdk');

AWS.config.update({accessKeyId: "AKIASY7YKZ7IGGPVWQ7N"/*process.env.AWS_ACCESS_KEY_ID*/, secretAccessKey: "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"/*process.env.AWS_SECRET_ACCESS_KEY*/, region: "us-west-2"});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = 'Message-uj5r2vhvnzejnkyslfkscgvdpi-dev';
const id = uuid();
const chatbot = true;
const content = "NEW TEST";
const createdAt = new Date().toISOString();
const file = true;
const isSent = true;
const messageConversationId = '7bcb2ee0-fe9e-43a7-9838-93a7c3404d11';
const owner = '8c3c21a7-8a1a-433b-93bb-a710bbf12dbf'
const ownerName = 'jaime';
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
