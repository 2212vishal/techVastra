const Product = require('../models/Products');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const Category = require('../models/Category');
const sharp = require('sharp')
const fs = require("fs");


const createProduct = async (req, res) => {
    try {
        const { TitleName, description, price, company_name, categoryId } = req.body;

        // Check for required fields
        if (!TitleName || !description || !price || !company_name || !categoryId) {

            throw new Error('Missing required fields');
        }

        // Check for required files

        const Primary_image=req.files.Primary_image;
        const Secondary_image1=req.files.Secondary_image1;
        const Secondary_image2=req.files.Secondary_image2;
        const Secondary_image3=req.files.Secondary_image3;

        console.log(Primary_image,Secondary_image1);


        if (!Primary_image || !Secondary_image1 || !Secondary_image2 || !Secondary_image3) {
            console.log(Primary_image,Secondary_image1,Secondary_image2,Secondary_image3)
            throw new Error('Missing required files',Primary_image,Secondary_image1,Secondary_image2,Secondary_image3);
        }

        // Read primary image file
        const imageData = fs.readFileSync(Primary_image.tempFilePath);

        // Compress primary image to WebP format
        const PrimaryWebPimage = await sharp(imageData)
            .webp({ quality: 80 })
            .toBuffer();

        // Upload primary image to Cloudinary
        const PrimaryImageUrl = await uploadImageToCloudinary(
            PrimaryWebPimage,
            process.env.FOLDER_NAME
        );

        // Upload secondary images to Cloudinary
        const secondaryImageData = [];
        for (let i = 1; i <= 3; i++) {
            const secondaryImage = req.files[`Secondary_image${i}`];
            const secondaryImageBuffer = fs.readFileSync(secondaryImage.tempFilePath);
            
            // Compress secondary image to WebP format
            const compressedSecondaryImage = await sharp(secondaryImageBuffer)
                .webp({ quality: 80 })
                .toBuffer();

            const imageUrl = await uploadImageToCloudinary(compressedSecondaryImage, process.env.FOLDER_NAME);
            secondaryImageData.push({
                image1: imageUrl.secure_url,
                placeholder: `image${i}`
            });
        }

        // Save product data to database, including image URLs
        const newProduct = new Product({
            TitleName,
            Primary_image: PrimaryImageUrl.secure_url,
            Secondary_image: secondaryImageData,
            description,
            price,
            company_name,
            categoryId
        });
        await newProduct.save();

        // Update category with the new product ID
        await Category.findOneAndUpdate(
            { _id: categoryId },
            { $push: { products: newProduct._id } }
        );

        res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Check if the category ID exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Find all products with the given category ID
        const products = await Product.find({ categoryId });

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



module.exports = {  createProduct ,getProductsByCategoryId};

