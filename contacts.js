const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {}

async function getContactById(contactId) {}

async function removeContact(contactId) {}

async function addContact(name, email, phone) {}
