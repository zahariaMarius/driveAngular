const mongoose = require('mongoose');

const jsonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    cognome: String
});

module.exports = mongoose.model('Json', jsonSchema);
