const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const roomRoute = require('./routes/routeProduct.js');
const userRoute = require('./routes/routeUser.js');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/rooms", roomRoute);
app.use("/user", userRoute);

// Default route
app.get('/', (req, res) => {
    res.send("Hello from the Node API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:xzzCitjdt8HefeOO@backend.7nldbhx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend")
    .then(() => {
        console.log("Connected to MongoDB");
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });



  //==========================wrong ni mo error ni ug mo gamit sa laing host 
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose');

// const roomRoute = require('./routes/routeProduct.js');
// const userRoute = require('./routes/routeUser.js');

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended : false}));



// //routes
// app.use("/api/rooms", roomRoute);
// app.use("/user", userRoute);

// const cors = require('cors');
// // Enable CORS for all routes
// app.use(cors());

// // Start the server
// const PORT = process.env.PORT || 4000;

// app.get(`/` , (req , res)=>
// {
//     res.send("hello from node API !  comming fr232om node API !  ");

// });


// //to connect monggoDB
// mongoose.connect("mongodb+srv://admin:xzzCitjdt8HefeOO@backend.7nldbhx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend").then(()=>
// {

//     console.log("connecte data based ! ");
// //     app.listen(4000, ()=>
// // {

// //     console.log("From server  Running for port 3000!");

// // });
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
  


// }).catch(()=>
// {
//     console.log("Something is Error.");

// })