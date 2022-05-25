const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const recommendationsSchema = require('./Recommendations');

const listingSchema = new Schema(
    {
        // photo, description, username, createdAt, Recommendations
    }
);

const Listing = model('Listing', listingSchema);

module.exports = Listing;