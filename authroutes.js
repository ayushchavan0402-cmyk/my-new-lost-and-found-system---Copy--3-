const express = require("express");

const router = express.Router();

/*
==================================
Student Registration
POST /api/auth/register
==================================
*/

router.post("/register", (req, res) => {

    res.status(201).json({

        success: true,

        message: "Student Registration Route"

    });

});

/*
==================================
Student Login
POST /api/auth/login
==================================
*/

router.post("/login", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Student Login Route"

    });

});

/*
==================================
Get Logged In User
GET /api/auth/profile
==================================
*/

router.get("/profile", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Student Profile Route"

    });

});

/*
==================================
Logout
POST /api/auth/logout
==================================
*/

router.post("/logout", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logout Successful"

    });

});

module.exports = router;