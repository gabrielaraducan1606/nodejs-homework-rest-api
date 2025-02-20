
const mongoose = require("mongoose");
const Contact = require("./contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  console.log("Lista contactelor din MongoDB:", contacts); 
  return contacts;
};

module.exports = { listContacts };


const getContactById = async (contactId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return await Contact.findOne({ _id: contactId });
    }

    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Eroare la căutarea contactului:", error);
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  return await Contact.create({ name, email, phone });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  if (body.favorite === undefined) return null;
  return await Contact.findByIdAndUpdate(contactId, { favorite: body.favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,

};
