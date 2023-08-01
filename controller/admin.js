const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const Admin = require('../models/admin');


exports.login = async (req,res,next) => {

    try {
  
       const admin = await Admin.findOne({email:req.body.email})
       if(!admin) return res.status(404).json({ error: 'Admin not found' });
       
       const isPasswordCorrect = await bcrypt.compare(req.body.password,admin.password)
       if(!isPasswordCorrect) return res.status(500).json({ error: 'Incorrect Password and Email' });
       console.log(req.body);
       const token = jwt.sign({id:admin._id},process.env.JWT) 
       
       const { password,  ...otherDetails } = admin._doc;
       res.cookie("access_token",token,{
        httpOnly:true,
       })

       return res.status(200).json({...otherDetails});
  
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve admin' });
    }
  }



  // Create a new Admin
exports.createAdmin = async (req, res) => {
  console.log(req.body)
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);


    const newAdmin = new Admin({
      name:req.body.name,
      password:hash,
      status:req.body.status
     })

     await newAdmin.save()
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};