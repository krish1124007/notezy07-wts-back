import { Router } from "express";
import {signup , verifyOTP , findUser} from "../controllers/user/user.controller.js"

const router = Router();

router.route('/signup').post(signup);
router.route('/optverify').post(verifyOTP);
router.route('/finduser').post(findUser);


export const user_router = router;