const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// Register Student
// POST /api/auth/register
// ===============================

exports.register = async (req, res) => {

    try {

        const {
            name,
            prn,
            email,
            phone,
            department,
            year,
            password
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email },
                { prn }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            prn,
            email,
            phone,
            department,
            year,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Login
// POST /api/auth/login
// ===============================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET || "college_secret_key",

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Profile
// GET /api/auth/profile
// ===============================

exports.profile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// Logout
// ===============================

exports.logout = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logged Out Successfully"

    });

};