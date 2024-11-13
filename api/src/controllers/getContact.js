import { Contact } from "../models/Contact.js";

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    console.log(contact);
    // contact.sort().reverse()

    res.status(201).json({ contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
