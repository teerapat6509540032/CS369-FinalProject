import express from 'express';
import { createDesign, getAllDesigns, deleteDesign } from '../controller/designController.js';

let router = express.Router();

router.post('/createDesign', createDesign);
router.get('/getAllDesigns', getAllDesigns);
router.delete('/deleteDesign/:id', deleteDesign);

export default router;