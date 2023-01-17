const mongoose = require('mongoose');
const express = require('express');

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@pwasil.pl:27017/bartek`;
