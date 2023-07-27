const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name:{type:String, required:true},
    status: { type: Boolean ,default:true},
})

module.exports = mongoose.model('Station',stationSchema);