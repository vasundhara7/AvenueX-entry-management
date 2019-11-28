const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const entrylogSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    hostname: String,
    hostemail: String,
    hostphone: Number,
    checkin: String,
    checkout: String

});


const Entry = mongoose.model('entry', entrylogSchema);

module.exports = Entry;