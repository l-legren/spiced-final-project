const aws = require('aws-sdk');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: 'eu-west-2'
});

exports.sendEmail = function (recipient, message, subject) {
    // will send an email in our behalf! return for making it asynchronous!
    return ses.sendEmail({
        Source: "Carlos Leret <carlosleret@gmail.com>",
        Destination: {
            ToAddresses: [recipient]
        },
        Message: {
            Body: {
                Text: {
                    Data: message
                }
            },
            Subject: {
                Data: subject
            }
        }
    }).promise()
        .then(() => console.log("It worked!"))
        .catch((err) => console.log("Got an error sending emails ses.sendEmail: ", err));
};