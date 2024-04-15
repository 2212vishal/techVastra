const Category = require('../models/Category');
const Main = require('../models/Main');

// Controller function to create a new category entry
const createCategory = async (req, res) => {
    try {
        const { mainId, CategoryName } = req.body;

        // Check if mainId and CategoryName are provided
        if (!mainId || !CategoryName) {
            return res.status(400).json({ success: false, message: 'Data not entered correctly' });
        }

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ CategoryName, mainId });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'Category already exists' });
        }

        const category = new Category({ CategoryName, mainId, sections });
        const savedCategory = await category.save();

        // Update the Main model with the new category
        await Main.findOneAndUpdate(
            { _id: mainId },
            { $push: { categories: savedCategory._id } }
        );

        res.status(201).json({
            success: true,
            message: "Category entry created successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Controller function to get categories by main_id and populate category data
// Controller function to get categories by main_id and populate category data
const getCategoriesByMainId = async (req, res) => {
    try {
        const { main_id } = req.body; // Assuming main_id is passed in the request body
        // const main = await Main.findById({_id:main_id}).populate('categories');
        const main = await Category.find({mainId:main_id})
        if (!main) {
            return res.status(404).json({ success: false, message: 'Main category not found' });
        }
        
        res.status(200).json({
            success: true,
            data: main
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};



// Controller function to get all category entries
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};

module.exports = { createCategory, getCategories,getCategoriesByMainId };
