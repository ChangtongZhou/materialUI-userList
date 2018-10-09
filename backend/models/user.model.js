const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema ({
    id: Number,
    fn: String,
    ln: String,
    sex: String,
    age: Number,
    password: {type: String, required: true}    
})

module.exports = mongoose.model('User', UserSchema);
