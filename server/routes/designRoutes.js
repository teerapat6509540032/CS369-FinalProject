import express from 'express';
import { createDesign, getAllDesigns } from '../controller/designController.js';

let router = express.Router();

router.post('/createDesign', createDesign);
router.get('/getAllDesigns', getAllDesigns);

export default router;