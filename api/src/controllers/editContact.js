import { Contact } from "../models/Contact.js";

export const editContact = async (req, res) => {
  const { cellphone, phone, email, address, fax } = req?.body;
  const replacement = {
    cellphone: cellphone ? cellphone : "",
    phone: phone ? phone : "",
    email: email ? email : "",
    address: address ? address : "",
    fax: fax ? fax : "",
  };

  try {
    const result = await Contact.findOneAndUpdate({}, replacement, {
      new: true,
    });
    res.status(201).json({ message: "Contact info updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
