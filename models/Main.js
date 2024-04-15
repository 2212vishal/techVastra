const mongoose = require("mongoose");

// Define the Main schema
const mainSchema = new mongoose.Schema(
    {
        MainName: {
            type: String,
            required: true,
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
    },
    {
        timestamps: true
    }
);

// Export the Main model
module.exports = mongoose.model("Main", mainSchema);
