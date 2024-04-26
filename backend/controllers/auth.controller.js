import Users from "../model/users.model.js";
import bcrypt from "bcrypt";
import generateJwt from "../utils/generateJwt.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await Users.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Incorrect username or passwords" });
    } else {
      generateJwt(user._id, res);

      res.status(201).json({
        userID: user._id,
        username: user.username,
        message: ` "${user.username}" has logged-in`,
      });
    }
  } catch (error) {
    console.log("Error in Login of auth controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Users.findOne({ username });

    if (user) {
      res.status(400).json({ message: "User Already exits" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
      });

      if (newUser) {
        generateJwt(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          userID: newUser._id,
          username: newUser.username,
          message: `A new user "${newUser.username}" has been created`,
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    }
  } catch (error) {
    console.log(`Error in "Register" of auth controller`, error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
  
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({ message: "User logged out sucessfully" });

  } catch (error) {
    console.log("Error in Login of auth controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
