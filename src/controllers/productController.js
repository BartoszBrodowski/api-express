const Product = require('../models/productModel');

const getProductsFunc = async (name, price, quantity) => {
	if (name) {
		const products = await Product.find({ name: { $regex: name, $options: 'i' } });
		if (products.length === 0) {
			return { error: 'No product found' };
		}
		return products;
	}
	if (price) {
		const products = await Product.find().where('price').equals(price);
		if (products.length === 0) {
			return { error: 'No product found' };
		}
		return products;
	}
	if (quantity) {
		const products = await Product.find().where('quantity').equals(quantity);
		if (products.length === 0) {
			return { error: 'No product found' };
		}
		return products;
	} else {
		const products = await Product.find();
		if (products.length === 0) {
			return { error: 'No product found' };
		}
		return products;
	}
};

module.exports.getProducts = async (req, res) => {
	// req.body is undefined
	const { name, price, quantity } = req.query;
	try {
		const products = await getProductsFunc(name, price, quantity);
		res.status(200).json(products);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports.postProduct = async (req, res) => {
	const { name, price, description, quantity } = req.query;
	try {
		const newProduct = new Product({
			name: name,
			price: price,
			description: description,
			quantity: quantity,
		});
		await newProduct.save();
		res.status(200).json(newProduct);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

module.exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ message: 'Product deleted' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		const { id, name, price, description, quantity } = req.query;
		const product = await Product.findByIdAndUpdate(id, {
			name: name,
			price: price,
			description: description,
			quantity: quantity,
		});
		res.status(200).json(product);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
