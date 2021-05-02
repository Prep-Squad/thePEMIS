 const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

// const s3 = new AWS.S3({
//     accessKeyId: process.env.KEY,
//     secretAccessKey: process.env.SECRET
//     })
// const goatherd = fs.readFileSync('./goatherd.png')
// const params = {
//     Bucket: 'meme-images-library',
//     Key: 'goatherd.png',
//     Body: goatherd
// }
// s3.upload(params, function (err, data) {
//     if(err){
//         console.log(err)
//     }
//     console.log(`file uploaded at ${data.Location}!`)
// })





// logging middleware
app.use(morgan("dev"));
// body parsing middleware
app.use(express.json());
// auth and api routes
//app.use("/auth", require("./auth"));
app.use("/api", require("../routes/api"));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));
// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});
// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});
// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});