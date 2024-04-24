const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// const verifyToken = (req , res , next) =>
// {
//   const authHeader = req.headers.authrization ;
//   if(authHeader)
//   {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token , "mySecretKey",(err , user) =>
//     {
//       if(err)
//       {
//         return res.status(403).json("Token is not valid!");
//       }
//       req.user = user ;
//       next();
//     })
//   }else{
//     res.status(401).json("You are not authenticated!");
//   }
// }

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

// const deleteUser = async(req , res) =>
// {
   
//         try {
//         const { id } = req.params;
//         const user = await User.findByIdAndDelete(id,req.body)
        
//         if(!user){
//             return res.status(404).json({ message : "User Id Not found." });
//         }
//         res.status(200).json({message : "Successfully Deleted."});

//     } catch (error) {
//         res.status(500).json({message : error.message });
//     }

// }
const deleteUser = async (req, res) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
          return res.status(401).json({ message: "You are not authenticated!" });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, "mySecretKey", async (err, user) => {

          if (err) {
              return res.status(403).json({ message: "Token is not valid!" });
          }

          const { id } = req.params;
          const userToDelete = await User.findById(id);

          if (!userToDelete) {
              return res.status(404).json({ message: "User Id Not found." });
          }

          // Check if the authenticated user is the owner of the user to be deleted
          if (user.role !=='admin') {
            
              return res.status(403).json({ message: "You are not authorized to delete this user."  });
          }

          // If the authenticated user is authorized, proceed with deletion
          await User.findByIdAndDelete(id);
          res.status(200).json({ message: "Successfully Deleted." });
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


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
    const { email, password , _id  } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials."});
    }
    const token = jwt.sign({ _id : _id , role : user.role   } , "mySecretKey");
    const isMatch = await bcrypt.compare(password, user.password); // Note: await here
    
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials." });
    }
    
    return res.status(200).json({  message : "Login Successfully" , token ,  user  }); // Include the token in the response
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.  "});
  }
};



module.exports = {
    postUser,
    deleteUser,
    getUsers,
    updateUser,
    getUser,
    login , 
} 