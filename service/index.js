const User = require("../schemas/userSchema"); 
const Contact = require("../schemas/contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");

require("dotenv").config();

const getAllUsers = async () => {
    return await User.find({}, "-password -token"); 
};

const getAllContacts = async () => {
    return await Contact.find();
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};


const createUser = async ({ email, password, name }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email already in use");
    }
  
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const verificationToken = nanoid(); 
  
    const user = new User({ email, password, name, avatarURL, verificationToken });
    await user.save();
  
    return user;
  };


const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    user.token = token;
    await user.save();

    return user;
};


const logoutUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    user.token = null;
    await user.save();
};

const addContact = async ({ firstName, lastName, email, city, owner }) => {
    const newContact = new Contact({ firstName, lastName, email, city, owner });
    await newContact.save();
    return newContact;
};

const getCurrentUser = async (userId) => {
    return await User.findById(userId, "-password -token"); 
};

module.exports = {
    getAllUsers,
    getAllContacts,
    getUserByEmail,
    createUser,
    loginUser,
    logoutUser,
    addContact,
    getCurrentUser
  };