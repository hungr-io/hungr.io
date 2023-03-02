const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'hungrio'
})
.then(() => console.log('Connected to BongoDB'))
.catch(err => console.log(err))

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    price: { type: Number, required: true},
    zip: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    rating: {type: Number, required: true}
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;


// category: [{
//     alias: { type: String },
//     title: { type: String },
// }],