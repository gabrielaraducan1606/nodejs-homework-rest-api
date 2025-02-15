const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Eroare la citirea fișierului contacts.json:", error);
        return [];
    }
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    return contacts.find(contact => String(contact.id) === String(contactId)) || null;
};

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => String(contact.id) !== String(contactId));

    if (contacts.length === filteredContacts.length) return null;

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return true;
};

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => String(contact.id) === String(contactId));

    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};
