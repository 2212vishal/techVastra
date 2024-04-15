const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema(
    {
        TitleName: {
            type: String,
            required: true,
        },
        Primary_image: {
            type: String,
            required: true,
        },
        Secondary_image: {
            type: [
              {
                image1: { type: String, default: "" },
                placeholder: { type: String, default: "" }
              }
            ],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        company_name: {
            type: String,
            required: true
        },
        categoryId:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
