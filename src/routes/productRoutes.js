const express = require('express');
const productsController = require('../controllers/productController');

const router = express.Router();

router.get('/', productsController.getProducts);
router.post('/', productsController.postProduct);
router.delete('/:id', productsController.deleteProduct);
router.put('/:id', productsController.updateProduct);
router.get('/report', productsController.getReport);
module.exports = router;
