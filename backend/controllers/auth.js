import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
// import { nanoid } from "nanoid";

export const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { firstname, email, password } = req.body;
    //validation
    if (!firstname) return res.status(400).send("First Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be minimum 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("E-mail is taken");

    //hash password
    const hashedPassword = await hashPassword(password);

    //register
    const user = new User({
      firstname,
      email,
      password: hashedPassword,
    });
    await user.save();
    // console.log("Saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Password is incorrect");
    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //return user and token to client, exclude hasshed possword
    user.password = undefined;
    // send token in token
    res.cookie("token", token, {
      httpOnly: true,
      //secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout Successfull" });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req._id).select("-password").exec();
    console.log("CURRENT_USER", user);
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

<<<<<<< HEAD
export const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email)
    //const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    //prepare for email
  } catch (err) {
    console.log(err);
  }
};
=======
export const forgetpassword =  async (req, res) => {
  try {
    const { email } = req.body
    console.log(email)
  } catch (err) {
    console.log(err)
  }
}
>>>>>>> 38fdc5231341cbb4daebf43a10c45bf8bcc3e768
