const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");





const postUser = async (req , res )=>
{
   try {
            const user = await User.create(req.body);
            // const salt = bcrypt.genSaltSync(10);
            // const hash = await bcrypt.hash(user.password,salt)
            // console.log(user.password , "=============" , hash);

            const response = {
                message : "Successfully Created.",
                user
            }

            res.status(200).json(response);
        } catch (error) {

         

            res.status(500).json({message : error.message});
            
        }

}

const deleteUser = async(req , res) =>
{
   
        try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id,req.body)
        
        if(!user){
            return res.status(404).json({ message : "User Id Not found." });
        }
        res.status(200).json({message : "Successfully Deleted."});

    } catch (error) {
        res.status(500).json({message : error.message });
    }

}

const getUsers =  async(req , res) =>
{   
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}


const updateUser = async(req , res) =>
{

    try {
        const id = req.params.id;
        if (!id) {
          return res.status(400).json({ message: "Id is needed. " });
        }
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 8);
        const user = await User.findByIdAndUpdate(id, data, { new: true });

              const response = {
            message : "Successfully Updated.",
            user
        }
        
        return res.status(201).json(response);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Somthing went wrong. ", error: error.message });
      }
    // try {
    //     const { id } = req.params;
    //     const user = await User.findByIdAndUpdate(id,req.body)

    //     if(!user){
    //         return res.status(404).json({ message : "Not found ! " });
    //     }

    //     const roomUpdate = await User.findById(id);
    //     const response = {
    //         message : "Successfully Updated.",
    //         roomUpdate
    //     }

    //     res.status(200).json(response)

    // } catch (error) {
    //     res.status(500).json({message : error.message});
    // }

}


const getUser = async(req , res) =>
{
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Wrong credentials."});
    }
    const isMatch = await bcrypt.compare(password, existUser.password); // Note: await here
    
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials." });
    }
    
  
    
    return res.status(200).json({ message: "Login Successfully." }); // Include the token in the response
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.  " , error: process.env.secretKey });
  }
};



module.exports = {
    postUser,
    deleteUser,
    getUsers,
    updateUser,
    getUser,
    login
}