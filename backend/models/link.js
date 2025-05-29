const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model('Link', LinkSchema);
