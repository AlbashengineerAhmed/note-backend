import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";

export const getUserModule = async (req, res, next) => {
  const user = await userModel.find();
  return res.json({ message: "Done", user });
};

export const getUserProfile = async (req,res,next)=>{
    try {
    const user = await userModel.findById(req.user._id).select("userName email")
    return res.json({message:"Done", user})
  } catch (error) {
    return res.json({message:"catch error", error})
  }
}

export const updateUserModule = async (req, res, next) => {
  try {

    const user = await userModel.findByIdAndUpdate(req.user._id , req.body ,{new:true});
    return user ? res.json({ message: "Done", user })
      : res.json({ message: "In-valid AccountID" });
  } catch (error) {
    return res.json({ message: "catch error", error })
  }
};

export const deleteUserModule = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const user = await userModel.findByIdAndDelete(req.user._id )
    return user ? res.json({ message: "Done", user })
      : res.json({ message: "In-valid AccountID" });
  } catch (error) {
    return res.json({ message: "catch error", error })
  }
};
