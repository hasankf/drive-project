const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth')
const fileModel = require('../models/files.model')


router.get('/', (req, res) => {
  res.render('register');   // landing or login
});

router.get('/home', authMiddleware,async (req, res) => {

  const userFiles = await fileModel.find({
    user: req.user.userId
  })
  console.log(userFiles);
  

  res.render('home' , {
    files: userFiles
  });
});


router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  // handling error bcs all the data is stored in req.file
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // generate file unique name
    const fileext = req.file.originalname.split('.').pop(); // to get the extension
    const fileName = `${uuidv4()}.${fileext}`;  // to get extension
    const filePath = fileName;   // changed from const filePath = `pdfs/${fileName}`;

    // upload to supabase storage
    const { error } = await supabase.storage 
      .from('pdfs') // 👈 YOUR BUCKET NAME // accessing bucket which takes pdf
      .upload(filePath, req.file.buffer, {  // uploads them in the bucket
        contentType: req.file.mimetype,
      });
    if (error) throw error;


    // getting public url
    const { data } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath);

    // save to mongodbd with user information
    const newFile = await fileModel.create({
      path: filePath, // changed from path: data.filePath,
      originalname: req.file.originalname,
      user: req.user.userId
    })

   res.json(newFile)
    // res.json({
    //   success: true,
    //   url: data.publicUrl,
    // });

  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }


});


router.get('/dbupload', authMiddleware, async(req, res) => {
  try{
        const mongoose = require('mongoose');

        // get db name
        const dbName = req.app.get('mongoose_db') || 'unknown'

        // get all files
        const files = await fileModel.find().populate('user', 'username email');

        res.json({
          databaseName : dbName,
          filesCount : files.length,
          files: files
        });
} catch(err) {
        res.status(500).json({error: err.message});
      }
      
      

});


// to delete all files
// router.get('/wipefiles', authMiddleware, async(req,res) => {
//   await fileModel.deleteMany({});
//   console.log('everything cleared');
//   res.send('files cleared')
// })



router.get('/download/:id', authMiddleware, async (req,res) => {

  const loggedInuserid = req.user.userId ;
  const fileId = req.params.id ; // const path

  const file = await fileModel.findOne({
    user : loggedInuserid, 
    _id: fileId
    // if these two match, user is authorized and send the file 
  })

  if (!file){
    return res.status(401).json({
      message: "unauthorized"
    })
  } 
  // say we got the file now we want to show it

  const {data, error} = await supabase.storage
    .from('pdfs')
    .createSignedUrl(file.path, 60) ;

    if (error) {
      return res.status(500).json({message: 'failed to generate link'})
    }
   
    res.redirect(data.signedUrl)
})



module.exports = router;
