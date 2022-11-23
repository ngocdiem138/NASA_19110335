const mongoose = require("mongoose");

require('dotenv').config();

const MONGO_URL = "mongodb+srv://ngocdiemxt2001:138200113@cluster0.rk8c2nn.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
})

mongoose.connection.once('error', (err) => {
    console.log(err);
})

async function mongoConnect() {
    console.log("URL", MONGO_URL);
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}