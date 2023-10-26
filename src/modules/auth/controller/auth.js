import userModel from "../../../../DB/model/User.model.js";
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";
import { compare, hash } from "../../../utils/HashandCompare.js";

export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password, userName, cPassword } = req.body;
    if (password != cPassword) {
      return res.json({
        message: "password and confirmation password misMatch",
      });
    }
    // console.log({ email, password, userName });
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: "Email exist" });
    }
    const hashValue = hash({ plaintext: password, saltRound: process.env.SALT_ROUND });
    const user = await userModel.create({
      email,
      password: hashValue,
      userName,
    });
    // const newUser = new userModel({email , password , userName})
    // const user = await newUser.save()
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "In-valid Email" });
    }
    const match = compare({plaintext:password, hashValue:user.password})
    if (!match) {
      return res.json({ message: "In-valid Password" });
    }
    const token = generateToken({
      payload:{id:user._id, isLoggedIn: true},
      expiresIn: 60*60*24
    })
    return res.json({ message: "Done", token })
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};
