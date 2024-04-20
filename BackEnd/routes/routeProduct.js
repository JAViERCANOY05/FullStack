
const express = require('express')
const router = express.Router();


const { getRooms  , getRoom ,updateRoom , deleteRoom , postRoom} = require('../controller/room.controller.js');


//GET Rooms
router.get('/',getRooms) ;

//GET Room
router.get('/:id',getRoom) ;

//UPDATE Room
router.put('/:id',updateRoom) ;

//DELETE Room
router.delete('/:id',deleteRoom) ;

//POST / CREATE Room
router.post('/',postRoom) ;


module.exports = router ;
