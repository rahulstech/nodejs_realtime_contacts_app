const express = require('express');
const { saveContact, isContactExists,
    getContactById, getAllContacts,
    deleteContacts } = require('../models/contact');



module.exports = (app, rtconnection) => {
    const router = express.Router();

    router.get('/contacts', (req, res) => {
        let contacts = getAllContacts();
        res.status(200);
        res.send(JSON.stringify({ contacts }));
    });

    router.get('/contact/:contactid', (req, res) => {
        let contact_id = req.params.contactid;
        let contact = getContactById(contact_id);
        if (!contact) {
            res.status(404);
            res.send(JSON.stringify({ 'message': 'contact not found' }));
        }
        else {
            res.status(200);
            res.send(JSON.stringify(contact));
        }
    });

    router.post('/contact', (req, res) => {
        let data = req.body;
        let contact_id = saveContact({ name: data.name, phone_numbers: data.phone_numbers });
        res.status(200);
        res.send(JSON.stringify({ contact_id }));
        rtconnection.triggerEvent('CREATE',JSON.stringify({contact_id}));
    });

    router.put('/contact/:contactid', (req, res) => {
        let contact_id = req.params.contactid;
        if (!isContactExists(contact_id)) {
            res.status(404);
            res.send(JSON.stringify({ 'message': 'contact not found' }))
            return;
        }
        let data = req.body;
        let saved = contact_id == saveContact({ contact_id, name: data.name, phone_numbers: data.phone_numbers });
        if (saved) {
            res.status(200);
            res.send(JSON.stringify({ contact_id }));
            rtconnection.triggerEvent('UPDATE',JSON.stringify({contact_id}));
        }
        else {
            res.status(500);
            res.send(JOSN.stringify({ 'message': 'fail to save contact due to server side error. please try again' }));
        }
    });

    router.delete('/contacts', (req, res) => {
        let contactids = req.body.contactids;
        let deletedids = deleteContacts(contactids);
        if (deletedids) {
            res.status(200);
            res.send(JSON.stringify({ 'message': 'contact(s) deleted successfully' }));
            rtconnection.triggerEvent('DELETE',JSON.stringify({contactids}));
        }
        else {
            res.status(500);
            res.send(JSON.stringify({ 'message': 'fail to delete contact(s) due to server side error, please try again' }));
        }
    });
    app.use('/api/v1', router);
}