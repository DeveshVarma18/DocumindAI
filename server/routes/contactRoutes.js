import express from 'express';
import { saveContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Save a new contact message
router.post('/', saveContact);

// GET /api/contact - Get all contact messages (for admin use)
router.get('/', getContacts);

export default router;
