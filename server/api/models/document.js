const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    type: {type: String, require: true},
    dimension: {type: String, require: true},
    path: {type: String, required: true, unique: false},
    uploadedAt: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, unique: false}
});

module.exports = mongoose.model('Document', documentSchema);
