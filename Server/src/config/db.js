const mongoose = require("mongoose")
const dns = require ('dns')

dns.setServers(['8.8.8.8','8.8.4.4'])

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODBURI)
        console.log("MongoDb is connected")        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;
