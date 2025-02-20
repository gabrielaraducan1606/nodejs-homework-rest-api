const Contact = require("../models/contacts");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id });
  res.status(200).json(contacts);
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone, owner: req.user._id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id });
  if (!deletedContact) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    { new: true }
  );
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    { favorite: req.body.favorite },
    { new: true }
  );
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.json(updatedContact);
};

module.exports = { listContacts, addContact, removeContact, updateContact, updateStatusContact };
