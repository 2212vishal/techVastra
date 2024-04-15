const mongoose = require("mongoose");


// Define the Category schema
const categorySchema = new mongoose.Schema(
    {
        CategoryName: {
            type: String,
            required: true,
        },
        mainId:{
            type: String,
            required:true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true
    }
);

// Export the Category model
module.exports = mongoose.model("Category", categorySchema);
