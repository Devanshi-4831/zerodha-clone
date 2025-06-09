// AuthController.js
const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");

const bcrypt = require("bcryptjs");


module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      createdAt: new Date(),
    });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.error("Signup error:", error); // show actual cause
    res.status(500).json({ message: "Signup failed", error });
  }
};










// module.exports.Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     " });
//     }

//     console.log("User found:", user.email);
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match result:", isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Proceed to generate token and response
//     // ...
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };



module.exports.Login = async (req, res) => {
  try {
    const { email  } = req.body;
    // const { email, password  } = req.body;


    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }



    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password match result:", isMatch);

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // TODO: generate JWT or session token here
 const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.userVerification = async (req, res) => {
  return res.json({ success: true, message: "User Verified" });
};
