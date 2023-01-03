import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

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
