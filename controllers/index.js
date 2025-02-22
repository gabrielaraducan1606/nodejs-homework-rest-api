const path = require("path");
const  Jimp  = require("jimp"); 

const {
    getAllUsers,
    getAllContacts,
    createUser,
    loginUser,
    logoutUser,
    addContact,
    getCurrentUser,
} = require("../service/index");

require("dotenv").config();

const getUsersController = async (req, res) => {
    try {
        const results = await getAllUsers();
        res.status(200).json({ status: "success", data: results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts(req.user.id); 
        res.status(200).json({ status: "success", data: contacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUserController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = await createUser({ email, password, name });

        return res.status(201).json({
            message: "User created successfully",
            user: { email: newUser.email, subscription: newUser.subscription },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            message: "Login successful",
            token: user.token,
            user: { email: user.email, subscription: user.subscription },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUserController = async (req, res) => {
    try {
        await logoutUser(req.user.id);
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addContactController = async (req, res) => {
    try {
        const { firstName, lastName, email, city } = req.body;
        if (!firstName || !lastName || !email || !city) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const owner = req.user.id;
        const newContact = await addContact({ firstName, lastName, email, city, owner });

        return res.status(201).json({ message: "Contact added successfully", contact: newContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUserController = async (req, res) => {
    try {
        const user = await getCurrentUser(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User details retrieved successfully",
            user: { email: user.email, subscription: user.subscription },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAvatarController = async (req, res, next) => {
    try {
        console.log("File:", req.file);

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No file uploaded or invalid file path." });
        }

        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        if (!req.file.originalname) {
            return res.status(400).json({ message: "Invalid file name." });
        }

        const uniqFilename = `${req.user._id}-${Date.now()}${path.extname(req.file.originalname)}`;
        const destinationPath = path.join(__dirname, `../public/avatars/${uniqFilename}`);

        const image = await Jimp.read(req.file.path); 
        image.resize(256, 256); 
        await image.writeAsync(destinationPath); 

        req.user.avatarURL = `/avatars/${uniqFilename}`;
        await req.user.save();

        res.status(200).json({ avatarURL: req.user.avatarURL });
    } catch (error) {
        console.error("Eroare detaliată:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsersController,
    getContactsController,
    createUserController,
    loginUserController,
    logoutUserController,
    addContactController,
    getCurrentUserController,
    updateAvatarController
};