let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Bcontacts = require('../models/bcontacts');

module.exports.displayBcontactsList = (req, res, next) => {
    Bcontacts.find((err, bcontactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('bcontacts/list', 
            {title: 'Business Contacts', 
            BcontactsList: bcontactsList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('bcontacts/add', {title: 'Add Business Contacts', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBcontacts = Bcontacts({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email        
    });

    Bcontacts.create(newBcontacts, (err, Bcontacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/bcontacts');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Bcontacts.findById(id, (err, bcontactsToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('bcontacts/edit', {title: 'Update Bcontact', bcontacts: bcontactsToUpdate, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBcontacs = Bcontacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email      
    });

    Bcontacts.updateOne({_id: id}, updatedBcontacs, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/bcontacts');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Bcontacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/bcontacts');
        }
    });
}