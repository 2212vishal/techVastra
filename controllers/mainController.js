const Main = require('../models/Main');

// Controller function to create a new main entry
const createMain = async (req, res) => {
    try {
        const { MainName, categories } = req.body;

        // Check if MainName and categories are provided
        if (!MainName || !categories) {
            throw new Error('MainName and categories are required');
        }

        // Check if MainName already exists
        const existingMain = await Main.findOne({ MainName });
        if (existingMain) {
            return res.status(400).json({
                success: false,
                message: 'MainName already exists'
            });
        }

        // Create new main entry
        const main = new Main({ MainName, categories });
        const savedMain = await main.save();
        res.status(201).json({
            success: true,
            message: "Main entry created successfully",
            data: savedMain
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};


// Controller function to get all main entries
const getMains = async (req, res) => {
    try {
        const mains = await Main.find();
        res.status(200).json({
            success: true,
            data: mains
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
};

module.exports = { createMain, getMains };
