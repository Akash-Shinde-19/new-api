import * as AWS from "aws-sdk";
import * as fs from "fs";

// const BUCKET_NAME = "seecity";
// const IAM_USER_KEY = "AKIAJXWAMFKQB7ZRIZQQ";
// const IAM_USER_SECRET = "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";

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});

const processUpload = async (filename, readStream, mimetype): Promise<any> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: "Images" + "/" + filename,
        Body: readStream,
        ContentType: mimetype,
        ACL: "public-read"
    };

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, function (err, data) {
            readStream.destroy();

            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

export const uploadToS3 = async (file, id) => {
    var { filename, createReadStream, mimetype } = await file;
    filename = id + '_' + filename;
    const readStream = await createReadStream();

    readStream
        .on('data', function (chunk) {
            let temp = chunk.toString('base64')
            //console.log("here -> ", JSON.stringify(temp));
        })
        .on('end', function () {
            //console.log("end");
        });

    const data = await processUpload(filename, readStream, mimetype);
    console.log("AWS_Upload: ", data);

    var obj = {
        path: data.Location,
        filename: filename,
        mimetype: "image/png"
    }

    return obj;
};


const processDownload = async (file): Promise<any> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: "Images" + "/" + file.filename,
    };

    return new Promise((resolve, reject) => {
        s3bucket.getObject(params, function (err, data) {

            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

export const downloadFromS3 = async (file): Promise<any> => {
    const data = await processDownload(file);
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return ("data:image/jpeg;base64," + base64);
}


export const deleteFromS3 = async (file): Promise<any> => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: "Images" + "/" + file.filename,
    };

    return new Promise((resolve, reject) => {
        s3bucket.deleteObject(params, function (err, data) {

            if (err) {
                alert("failed")
                return reject(err);
            }

            return resolve(data);
        });
    });
}
