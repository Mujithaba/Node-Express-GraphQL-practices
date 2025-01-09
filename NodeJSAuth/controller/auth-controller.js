const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register controller
const registerUser = async (req, res) => {
  try {
    // extract the user information from the request body
    const { username, email, password, role } = req.body;

    // Check if either username or email already exists in the database
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // slat and hash the password
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in the database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to register user, Please try again later...",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured ! Please try again",
    });
  }
};

// login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find if the current user is exist in database or not
    const isUser = await User.findOne({ username });
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists!",
      });
    }

    // if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid crendetials!",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: isUser._id,
        username: isUser.username,
        role: isUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully...",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
