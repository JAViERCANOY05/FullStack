const express = require('express')
const app = express()
const mongoose = require('mongoose');

const roomRoute = require('./routes/routeProduct.js');
const userRoute = require('./routes/routeUser.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));



//routes
app.use("/api/rooms", roomRoute);
app.use("/user", userRoute);

app.get(`/` , (req , res)=>
{
    res.send("hello from node API !  comming fr232om node API !  ");

});


//to connect monggoDB
mongoose.connect("mongodb+srv://admin:xzzCitjdt8HefeOO@backend.7nldbhx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend").then(()=>
{

    console.log("connecte data based ! ");
    app.listen(3000, ()=>
{

    console.log("From server  Running for port 3000!");

});


}).catch(()=>
{
    console.log("Something is Error.");

})