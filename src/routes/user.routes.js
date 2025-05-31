import { Router } from "express";
import {signup , verifyOTP} from "../controllers/user/user.controller.js"

const router = Router();

router.route('/signup').post(signup);
router.route('/optverify').post(verifyOTP);


export const user_router = router;