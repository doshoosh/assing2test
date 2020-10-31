let mongoose = require('mongoose');

// create a model class
let bcontactsModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "business_contacts"
});

module.exports = mongoose.model('BusinessContacts', bcontactsModel);