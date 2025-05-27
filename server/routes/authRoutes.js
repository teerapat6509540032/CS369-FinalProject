import express from 'express';
import { registerUser, loginUser } from
 '../controller/authController.js';

let router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;