const router = require('express').Router()
const { models: { User, Meme }} = require('../db')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const uploadImage  = require('../s3')

/** GET ROUTES */

router.get("/:userId/library", async (req, res, next) => {
  try {
      console.log('ALLO POPPET YOURE IN THE ROUTE')
    const memes = await Meme.findAll({
        where: {
            userId: req.params.userId
        }
    });
    console.log(memes)
    res.send(memes);
  } catch (err) {
    next(err);
  }
});


/** POST ROUTES */
 router.post('/:userId/add', upload.single('meme'), async (req,res, next)=>{
     const file = req.file
     const info = req.body
    console.log('file: ', file, "info: ", info)
    const result = await uploadImage(file)
    console.log('result: ', result)

    const createdMeme = Meme.create({
        imageUrl: result.Location,
        userId: req.params.userId
    })
    console.log(createdMeme)
    res.send(createdMeme)
 })




module.exports = router