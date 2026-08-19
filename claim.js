const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    foundItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoundItem",
        required: true
    },

    answers: {
        color: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            default: ""
        },

        uniqueMark: {
            type: String,
            default: ""
        },

        additionalDetails: {
            type: String,
            default: ""
        }
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Approved",
            "Rejected",
            "Collected"
        ],
        default: "Pending"
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    remarks: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Claim", claimSchema);