import clientPromise from '../config/database.js';
import { exportContactsToCSV, getContactsByDateRange, generateContactSummaryByDate } from '../utils/csvExporter.js';
import moment from 'moment';

export const saveContact = async (req, res) => {
  try {
    const { name, email, company, role, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    // Create contact document
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || '',
      role: role || '',
      message: message.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'new'
    };

    // Insert the contact message
    const result = await collection.insertOne(contactData);

    if (result.insertedId) {
      console.log('Contact message saved:', result.insertedId);
      return res.status(201).json({ 
        success: true, 
        message: 'Contact message saved successfully',
        id: result.insertedId 
      });
    } else {
      throw new Error('Failed to save contact message');
    }

  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error. Please try again later.' 
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.status(200).json({ 
      success: true, 
      contacts: contacts 
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Export all contacts to CSV
export const exportAllContactsCSV = async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const exportResult = await exportContactsToCSV(contacts);

    return res.status(200).json({
      success: true,
      message: 'CSV export completed successfully',
      ...exportResult
    });

  } catch (error) {
    console.error('Error exporting contacts to CSV:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to export contacts to CSV'
    });
  }
};

// Export contacts by date range to CSV
export const exportContactsByDateCSV = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required. Format: YYYY-MM-DD'
      });
    }

    // Validate date format
    if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || 
        !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    const contacts = await getContactsByDateRange(collection, startDate, endDate);

    const dateRange = { from: startDate, to: endDate };
    const exportResult = await exportContactsToCSV(contacts, dateRange);

    return res.status(200).json({
      success: true,
      message: `CSV export completed for ${startDate} to ${endDate}`,
      dateRange,
      ...exportResult
    });

  } catch (error) {
    console.error('Error exporting contacts by date to CSV:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to export contacts by date to CSV'
    });
  }
};

// Get contact summary by date
export const getContactSummaryByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    let contacts;
    if (startDate && endDate) {
      contacts = await getContactsByDateRange(collection, startDate, endDate);
    } else {
      // Get all contacts if no date range specified
      contacts = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    }

    const summary = generateContactSummaryByDate(contacts);

    return res.status(200).json({
      success: true,
      summary,
      totalRecords: contacts.length,
      dateRange: startDate && endDate ? { from: startDate, to: endDate } : 'all'
    });

  } catch (error) {
    console.error('Error generating contact summary:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate contact summary'
    });
  }
};
