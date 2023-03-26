const mongoose = require('mongoose');

const connectDB = async () => {
    
   await mongoose.connect(`mongodb:${process.env.DB}`);
   console.log("MongoDB Connected");
};

module.exports = {connectDB};


