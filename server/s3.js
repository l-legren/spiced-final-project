const fs = require("fs");
const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "mysocialspicedbucket",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("Upload succesful");
            // it worked!!!
            next();
            // fs.unlink(path, () => {});
        })
        .catch((err) => {
            // uh oh
            console.log(err);
            res.sendStatus(404);
        });
};
