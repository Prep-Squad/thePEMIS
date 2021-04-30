const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const multer = require('multer')
const upload = multer({dest: 'uploads/'})


const { uploadImage } = require('../s3')
router.post('/memes', upload.single('meme'), async (req,res, next)=>{
    const file = req.file
    const info = req.body

    const result = await uploadImage(fileStream)
    console.log('file: ', file, "info: ", info, "result: ", result)
    res.send()
})