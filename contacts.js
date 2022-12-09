const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function updateFile(contacts = []) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw new Error('contact not found');
    }
    const updateContacts = contacts.slice(index, 1);
    updateFile();
    return updateContacts;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuid() };
    contacts.push(newContact);
    updateFile();
    return newContact;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateFile,
};
