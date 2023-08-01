const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name:{type:String, required:true},
    exp:{type:Date, required:true},
    price:{type:Number, required:true}
})

module.exports = mongoose.model('Coupon', couponSchema)

