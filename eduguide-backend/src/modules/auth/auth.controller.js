const { registerUser, loginUser, getUser } = require("./auth.service");

// Register a new user
const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;

        // validate the user data
        if (!firstName || !lastName || !username || !email || !password) {

            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const result = await registerUser({
            firstName,
            lastName,
            username,
            email,
            password,
            role
        });

        res.status(201).json({
            data: result
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Login user
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check username and password exist in the req body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const result = await loginUser({ username, password });

        res.status(200).json({ data: result });

    } catch (error) {
        res.status(401).json({ message: error.message });

    }


};


// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await getUser(req.user.id);

        res.status(200).json({ data: user});

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

module.exports = {
    register,
    login,
    getProfile
};