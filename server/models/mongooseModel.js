const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Project 0'
})
.then(() => console.log('Connected to BongoDB'))
.catch(err => console.log(err))

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    price: { type: String, required: true},
    zip: { type: String, required: true },
    category: [{
        alias: { type: String },
        title: { type: String },
    }],
    url: { type: String, required: true },
    image: { type: String, required: true },
});
const Restaurants = mongoose.model('restaurants', restaurantSchema);

module.exports = {
    Restaurants, 
};