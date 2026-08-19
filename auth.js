const jwt = require("jsonwebtoken");

// ===============================
// Verify JWT Token
// ===============================
exports.protect = (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Please login first."
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "college_secret_key"
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};

// ===============================
// Admin Only
// ===============================
exports.isAdmin = (req, res, next) => {

    if (req.user.role !== "Admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access only."
        });

    }

    next();

};

// ===============================
// Security Staff Only
// ===============================
exports.isSecurity = (req, res, next) => {

    if (req.user.role !== "Security") {

        return res.status(403).json({
            success: false,
            message: "Security staff access only."
        });

    }

    next();

};

// ===============================
// Student Only
// ===============================
exports.isStudent = (req, res, next) => {

    if (req.user.role !== "Student") {

        return res.status(403).json({
            success: false,
            message: "Student access only."
        });

    }

    next();

};