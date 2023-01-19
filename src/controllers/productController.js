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
	const { name, price, quantity, sort } = req.query;
	try {
		const products = await getProductsFunc(name, price, quantity);
		if (sort) {
			products.sort((a, b) => {
				if (a[sort] > b[sort]) {
					return 1;
				}
				if (a[sort] < b[sort]) {
					return -1;
				}
				return 0;
			});
		}
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
	const { id } = req.params;
	const { name, price, description, quantity } = req.body;
	try {
		const product = await Product.findOneAndUpdate(
			{ _id: id },
			{ name: name, price: price, description: description, quantity: quantity },
			{ new: true }
		);
		await product.save();
		res.status(200).json(product);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
