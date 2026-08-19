const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// MongoDB Connection
// =====================

const MONGO_URI =
process.env.MONGO_URI ||
"mongodb://127.0.0.1:27017/college_lost_found";

mongoose
.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log(err));

// =====================
// Test Route
// =====================

app.get("/", (req, res) => {

    res.json({
        message: "College Lost & Found API Running"
    });

});

// =====================
// Lost Item API
// =====================

app.post("/api/lost", async (req, res) => {

    try{

        console.log(req.body);

        res.status(201).json({

            success:true,

            message:"Lost Item Submitted Successfully",

            data:req.body

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

});

// =====================
// Found Item API
// =====================

app.post("/api/found", async (req, res) => {

    try{

        console.log(req.body);

        res.status(201).json({

            success:true,

            message:"Found Item Submitted Successfully",

            data:req.body

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

});

// =====================
// Get All Lost Items
// =====================

app.get("/api/lost", async (req,res)=>{

    res.json({

        success:true,

        items:[]

    });

});

// =====================
// Get All Found Items
// =====================

app.get("/api/found",(req,res)=>{

    res.json({

        success:true,

        items:[]

    });

});

// =====================
// Server
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(`🚀 Server Running on Port ${PORT}`);

});