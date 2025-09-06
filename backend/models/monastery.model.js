const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This defines the structure of our documents
const monasterySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from start and end
    },
    district: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
    },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    tags: [String], // Defines an array of strings
    panoImage_url: {
        type: String,
        required: false // This field is optional
    }
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// The first argument 'Monastery' is the singular name of the model.
// Mongoose will automatically look for the plural, lowercased version 'monasteries' in the database.
const Monastery = mongoose.model('Monastery', monasterySchema);

module.exports = Monastery;