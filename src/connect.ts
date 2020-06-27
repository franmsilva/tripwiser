const mongoose = require('mongoose');
const { mongooseEnv } = require('./environment');

mongoose.connect(mongooseEnv.uri, mongooseEnv.config);
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB Atlas connection established!');
});

db.on('error', () => {
  console.error('MongoDB Atlas connection error!');
});

module.exports = db;
