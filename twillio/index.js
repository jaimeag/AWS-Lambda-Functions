let results = require('dotenv').config();
var jwt = require('jsonwebtoken');

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

exports.handler = async (event, context, callback) => {
    var chatName = event.sender;
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    token.identity = chatName;

    const grant = new VideoGrant;
    token.addGrant(grant);

    const result = {
        identity: chatName,
        token: token.toJwt(),
        status: 200
    }
    console.log('token sent');
    return result;
};
