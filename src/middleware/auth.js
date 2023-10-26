import userModel from "../../DB/model/User.model.js"
import { verifyToken } from "../utils/GenerateAndVerifyToken.js"

const auth = async(req,res,next)=>{
  try {
    const {authorization} = req.headers
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return res.json({message:"authorization is required or In-valid token Bearer key"})
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]
    if (!token) {
      return res.json({message:"Token is required or In-valid token Bearer key"})
    }
    const decoded = verifyToken({
      token,
      // signature:process.env.TOKEN_SIGNATURE
    })
    if (!decoded?.id || !decoded?.isLoggedIn) {
      return res.json({message:"In-valid token payload"})
    }
    const authUser = await userModel.findById(decoded.id).select("userName email role")
    if (!authUser) {
      return res.json({message:"this account not exist"})
    }
    req.user = authUser;
    return next()
  } catch (error) {
    return res.json({message:"catch error", err: error?.message})
  }
}

export default auth