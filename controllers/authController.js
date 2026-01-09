const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//registrer ny bruger
exports.registerUser = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ 
            message: 'Bruger oprettet succesfuldt!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });     
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'Forkert brugernavn eller password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Forkert brugernavn eller password' });
        }

        res.status(200).json({ 
            message: 'Login succesfuldt!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};