const Coupon = require('../models/coupon')

exports.create = async (req,res) => {

    try{
        const coupon = await Coupon.create(req.body)
        res.status(200).send(coupon)
    }catch(e){
        console.log(e)
        res.status(500).send('Internal Server Error')
    }

}

exports.get = async(req,res)=>{

    try{
        const coupons = await Coupon.find({})
        res.status(200).send(coupons)
    }catch(e){
        console.log(e)
        res.status(500).send('Internal Server Error')
    }

}

exports.getById  = async(req,res)=>{
    try{
        const coupon = await Coupon.findById(req.params.id)
        res.status(200).send(coupon)
    }catch(e){
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

