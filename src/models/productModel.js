const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product must have a name'],
		trim: true,
		maxlength: [20, 'Product name must have less or equal then 40 characters'],
		unique: true,
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
productSchema.plugin(validator);
const Product = mongoose.model('products', productSchema);

module.exports = Product;
