const uuid = require('uuid');

const contacts = new Map();

module.exports = {
    saveContact: ({contact_id,name,phone_numbers}) => {
        contact_id = contact_id ? contact_id : uuid.v1();
        contacts.set(contact_id,{contact_id,name,phone_numbers});
        return contact_id;
    },
    isContactExists: (contactid) => {
        return [...contacts.keys()].includes(contactid);
    },
    getContactById: (contactid) => {
        let contact = contacts.get(contactid);
        return contact;
    },
    getAllContacts: () => {
        return [...contacts.values()];
    },
    deleteContacts: (contactids) => {
        var deletedids = [];
        contactids.forEach((id) => {
            if (contacts.delete(id)) deletedids.push(id);
        });
        return deletedids;
    },
}