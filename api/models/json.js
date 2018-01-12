const mongoose = require('mongoose');

const jsonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {type: String, require: true},
    cognome: {type: String, require: true},
    immagine: {type: String, require: true}
});

module.exports = mongoose.model('Json', jsonSchema);
