const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const products = require('./src/models/placeholderProducts');
const Product = require('./src/models/productModel');

require('dotenv').config();

const app = express();

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@pwasil.pl:27017/bartek`;

const run = async () => {
	try {
		await mongoose.connect(uri);
		console.log('Connected to MongoDB');
		Product.collection.drop();
		Product.insertMany(products);
	} catch (err) {
		console.log(err);
	}
};

run();

app.listen(8000, () => {
	console.log('listening on port 8000');
});
