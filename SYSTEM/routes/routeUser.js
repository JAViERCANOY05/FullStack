const express = require('express')
const router = express.Router();

const { postUser ,deleteUser  , getUsers ,updateUser , getUser} =  require('../controller/user.controller.js');


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

module.exports = router ;
