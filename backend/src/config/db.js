const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error(' MONGO_URI missing in environment');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { autoIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = mongoose;
