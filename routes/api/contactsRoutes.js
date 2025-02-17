const express = require("express");
const mongoose = require("mongoose");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const contact = await getContactById(req.params.contactId);
    contact ? res.json(contact) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deleted = await removeContact(req.params.contactId);
    deleted ? res.json({ message: "Contact deleted" }) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    updatedContact ? res.json(updatedContact) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    const updatedContact = await updateStatusContact(req.params.contactId, req.body);
    updatedContact ? res.json(updatedContact) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
