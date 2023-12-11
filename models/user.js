const mongoose = require('mongoose');
const  { Schema } = mongoose;

const user = new Schema({
    id: Number,
    email: String,
    displayName: String
})

mongoose.model('User', user);
