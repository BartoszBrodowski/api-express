const mongoose = require('mongoose');
const express = require('express');
const products = require('./src/models/placeholderProducts');
const Product = require('./src/models/productModel');
const productsRoutes = require('./src/routes/productRoutes');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@pwasil.pl:27017/bartek`;

app.use('/products', productsRoutes);

const run = async () => {
	try {
		await mongoose.connect(uri);
		console.log('Connected to MongoDB');
		await Product.collection.drop();
		await Product.insertMany(products);
	} catch (err) {
		console.log(err);
	}
};

run();

app.listen(8000, () => {
	console.log('listening on port 8000');
});
