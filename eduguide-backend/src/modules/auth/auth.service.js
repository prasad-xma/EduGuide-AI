const { hashPassword, comparePassword } = require("../../utils/password.util");
const { createJWTToken } = require("../../utils/jwt.util");
const User = require("./user.model");

// user registration
const registerUser = async (data) => {
    const { firstName, lastName, username, email, password, role } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ username  });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: role || "student"
    });

    return newUser;
};

// user login
const loginUser = async (data) => {
    const { username, password } = data;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Check if user is active
    if (!user.isActive) {
        throw new Error("Account is deactivated");
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    };

    // Generate token
    const token = createJWTToken({
        id: user._id,
        username: user.username,
        role: user.role
    });

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
}

// get user
const getUser = async (userId) => {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error("User not found");
    }

    return user;
};


module.exports = {
    registerUser,
    loginUser,
    getUser
};