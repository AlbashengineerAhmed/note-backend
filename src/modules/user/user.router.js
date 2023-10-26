import {Router} from 'express'
import * as userController from  './controller/user.js'
import auth from '../../middleware/auth.js';
const router = Router();


router.get("/" , userController.getUserModule)
router.get("/profile" , auth , userController.getUserProfile)

router.put("/" , auth , userController.updateUserModule)
router.delete("/" , auth , userController.deleteUserModule)

export default  router