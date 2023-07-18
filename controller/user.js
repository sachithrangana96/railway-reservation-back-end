const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
  console.log(req.body)
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);


    const newUser = new User({
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      gender:req.body.gender,
      email:req.body.email,
      mobile:req.body.mobile,
      address:req.body.address,
      password:hash,
      status:req.body.status
     })

     await newUser.save()
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.login = async (req,res,next) => {

  try {

     const user = await User.findOne({email:req.body.email})
     if(!user) return res.status(404).json({ error: 'User not found' });
     
     const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
     if(!isPasswordCorrect) res.status(500).json({ error: 'Incorrect Password and Email' });
     console.log(req.body);
     const token = jwt.sign({id:user._id},process.env.JWT) 
     
     const { password,  ...otherDetails } = user._doc;
     res.cookie("access_token",token,{
      httpOnly:true,
     }).status(200).json({...otherDetails});

  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}


// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Read a single user by ID
exports.getUserById = async (req, res) => {
  
 let userId = req.userId ? req.user_id : req.params.id

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
