require('dotenv').config()

const S3 = require('aws-sdk/clients/S3')
const fs = require('fs')

const bucket = process.env.BUCKET_NAME;
const region = process.env.REGION;
const key = process.env.KEY;
const secret = process.env.SECRET;

const s3 = new S3({
    region,
    key,
    secret
})


function uploadImage(file){
    const fileStream = fs.createReadStream(file.path)

const params ={
    bucket: bucket,
    body: fileStream,
    key: file.filename
}

return s3.upload(params).promise()
}

uploadImage.export = uploadImage;

