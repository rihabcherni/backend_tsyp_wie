const Contact = require("../models/ContactModel");

async function addContact(req, res) {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(error);
  }
};
async function getContact(req, res){
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};
async function getContactById (req, res){
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send();
    }
    res.send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};
async function deleteContact (req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).send();
    }

    res.send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    addContact,
    getContact,
    getContactById,
    deleteContact,
  };