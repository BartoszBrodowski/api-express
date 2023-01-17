const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product must have a name'],
		trim: true,
		maxlength: [20, 'Product name must have less or equal then 40 characters'],
	},
	price: {
		type: Number,
		required: [true, 'Product must have a price'],
		min: [0, 'Product price must be greater or equal then 0'],
	},
	description: {
		type: String,
		required: [true, 'Product must have a description'],
		trim: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Product must have a quantity'],
		min: [0, 'Product quantity must be greater or equal then 0'],
	},
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
