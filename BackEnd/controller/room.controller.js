const Room = require('../models/room.model.js');


const getRooms =  async(req , res) =>
{   
    try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const getRoom = async(req , res) =>
{
    try {
        const { id } = req.params;
        const room = await Room.findById(id)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json({message : error.message});
    }

}

const updateRoom = async(req , res) =>
{
    try {
        const { id } = req.params;
        const room = await Room.findByIdAndUpdate(id,req.body)

        if(!room){
            return res.status(404).json({ message : "Not found ! " });
        }

        const roomUpdate = await Room.findById(id);
        const successResponse = {
            message : "Successfully Updated.",
            roomUpdate
        }

        res.status(200).json(successResponse)

    } catch (error) {
        res.status(500).json({message : error.message});
    }

}


const deleteRoom = async(req , res) =>
{
   
        try {
        const { id } = req.params;
        const room = await Room.findByIdAndDelete(id,req.body)
        
        if(!room){
            return res.status(404).json({ message : "Room Id Not found." });
        }
        res.status(200).json({message : "Successfully Deleted."});

    } catch (error) {
        res.status(500).json({message : error.message });
    }

}
   
const postRoom = async (req , res )=>
{
        try {
            const room = await Room.create(req.body);

            const successResponse = {
                message : "Successfully Created.",
                room
            }

            res.status(200).json(successResponse);
        } catch (error) {

           
            res.status(500).json({message : error.message});
        }
}


module.exports =
{
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
    postRoom
}