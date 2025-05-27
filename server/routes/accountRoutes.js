import express from 'express';
import { getProfileDetail, updateProfile } from
 '../controller/accountController.js';

let router = express.Router();

router.get('/profileDetail', getProfileDetail);
router.put('/updateProfile', updateProfile);

export default router;