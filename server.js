const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.log("❌ MongoDB Error:", error));

// Schemas
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const LostItem = mongoose.model("LostItem", itemSchema);
const FoundItem = mongoose.model("FoundItem", itemSchema);

// ============================
// Health Check
// ============================

app.get("/", (req, res) => {
  res.json({
    message: "College Lost & Found API Running",
  });
});

// ============================
// LOST ITEM
// ============================

// Add Lost Item
app.post("/api/lost", async (req, res) => {
  try {
    const { name, description, location, date, contact } = req.body;

    if (!name || !description || !location || !date || !contact) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const item = await LostItem.create({
      name,
      description,
      location,
      date,
      contact,
    });

    res.status(201).json({
      success: true,
      message: "Lost Item Submitted Successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Lost Items
app.get("/api/lost", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================
// FOUND ITEM
// ============================

// Add Found Item
app.post("/api/found", async (req, res) => {
  try {
    const { name, description, location, date, contact } = req.body;

    if (!name || !description || !location || !date || !contact) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const item = await FoundItem.create({
      name,
      description,
      location,
      date,
      contact,
    });

    res.status(201).json({
      success: true,
      message: "Found Item Submitted Successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Found Items
app.get("/api/found", async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================
// SERVER
// ============================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});