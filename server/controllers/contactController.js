import clientPromise from '../config/database.js';

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
