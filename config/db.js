const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to DB');
    })
}
// then export this
module.exports = connectToDB;
// importthis in the main app.js
