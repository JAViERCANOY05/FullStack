const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth.js");


const { postUser ,deleteUser  , getUsers ,updateUser , getUser , login} =  require('../controller/user.controller.js');


//POST User
router.post('/',postUser) ;

//DELETE User
router.delete('/:id',deleteUser) ;

//GET Users
router.get('/',getUsers) ;

//GET Users
router.get('/:id',getUser) ;

//GET User
router.put('/:id',updateUser) ;
//Login User
router.post('/login',login) ;


module.exports = router ;
