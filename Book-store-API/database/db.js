const mongoose = require('mongoose');


async function DBConnection (){
    try {
       await mongoose.connect(
            'mongodb+srv://sampleProjectPractice:sampleProjectPractice@clustersamplepractice.zavwl.mongodb.net/'
        )
        console.log('Database connected successfully ')
    } catch (error) {
        console.error('Database connection failed',error);
        process.exit(1);
    }
}

module.exports= DBConnection;