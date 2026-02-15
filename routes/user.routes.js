const express = require('express');
const router = express.Router(); // call the method
const { body, validationResult } = require('express-validator'); // for checking password email validity

const userModel = require('../models/user.model')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');



/* /user/test */

// router.get('/test', (req,res) => {
//     res.send('user test route');
// })



// we need to create routes to register userand registering data
// we will show the form through GET
router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register',
    
    
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({ min:5 }),
    body('username').trim().isLength({ min:3 }),

    async (req,res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if errors arent empty
            // return res.send("Invalid data!")
            return res.send(400).json({
                errors: errors.array(),
                message:'Invalid data'
            })
            
        }

        // get all the input in email username and password
        const { email, username, password} = req.body;
        // put all the input into creating a new user
        // this is for encrypting password. 10 times

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser =  await userModel.create({
            email,
            username,
            password: hashPassword // earlier it was password now hashPassword
        })
        // put it in json format, the newuser
        // res.json(newUser)  // do i change it here? 
        

    console.log(req.body)//saara data ismein aayega
    res.redirect('/user/login')
})


// now we will design login page

router.get('/login', (req,res) => {
    res.render('login')
})



router.post('/login',
    body('username').trim().isLength({ min:3 }),
    body('password').trim().isLength({ min:5}),

    async (req,res) => {

        // take errors here
        const errors = validationResult(req);

        // if errors file isnt empty. which means there are errors
        if(!errors.isEmpty()) { // wrong email pass
            return res.status(400).json({ // return error
                error:errors.array(), // put error in array
                message: 'Invalid Data' // print invalid data
            })

        }

        // if no errors. put them in req.body
        const { username, password } = req.body;
        
        // do they belond to the right user?

        const user = await userModel.findOne({
            username: username
        })

        if(!user){ // if user doesnt exist
            return res.status(400).json({
                message: 'username or password is INCORRECT'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        // compare the hashpassword in db and the input password

        // if wrongpassword
        if(!isMatch) {
            return res.status(400).json({
                message:'username or password is INCORRECT'
            })
        }

        // if correct password

        // a token will be generated when you succesfully sign in

        const token = jwt.sign(
            {
            userId:user._id,
            email: user.email,
            username: user.username
            },
        process.env.JWT_SECRET,
    )
        // token and then token
        res.cookie('token', token)
        res.redirect('/home');
    }
)


module.exports= router;
