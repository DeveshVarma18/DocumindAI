import express from 'express';
import { 
  saveContact, 
  getContacts, 
  exportAllContactsCSV,
  exportContactsByDateCSV,
  getContactSummaryByDate 
} from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Save a new contact message
router.post('/', saveContact);

// GET /api/contact - Get all contact messages (for admin use)
router.get('/', getContacts);

// GET /api/contact/export - Export all contacts to CSV
router.get('/export', exportAllContactsCSV);

// GET /api/contact/export-by-date - Export contacts by date range to CSV
router.get('/export-by-date', exportContactsByDateCSV);

// GET /api/contact/summary - Get contact summary by date
router.get('/summary', getContactSummaryByDate);

export default router;
