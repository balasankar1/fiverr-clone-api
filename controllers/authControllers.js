import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("user not found");
  const isCorrect = bcrypt.compare(req.body.password, user.password);
  if (!isCorrect) return res.status(400).send("wrong password or username");
  console.log(user);
  const { password, ...info } = user._doc;
  return res.status(200).send(user);
};
export const logout = async () => {};
