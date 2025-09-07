const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This defines the structure of our review documents
const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: false, // Optional field
        trim: true
    },
    reviewText: {
        type: String,
        required: true
    },
    // This links the review to a specific monastery
    monasteryId: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;