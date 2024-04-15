const express = require('express');
const router = express.Router();
const { createMain, getMains } = require('../controllers/mainController');
const { createCategory, getCategories,getCategoriesByMainId } = require('../controllers/categoryController');
const {createProduct,getProductsByCategoryId} = require('../controllers/productController');

router.post('/main', createMain);
router.get('/main', getMains);

router.post('/category', createCategory);
router.get('/allcategory', getCategories);
router.get('/categoryByMainId', getCategoriesByMainId);


router.post('/product',createProduct);
router.get('/productByCategoryId',getProductsByCategoryId);


module.exports = router;

