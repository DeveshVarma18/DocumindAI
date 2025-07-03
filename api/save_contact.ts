import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

// Reuse client in development
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production use a new one each time (or Vercel edge cache workaround)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('documind');
    const collection = db.collection('contact_messages');

    const { name, email, company, role, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await collection.insertOne({
      name,
      email,
      company,
      role,
      message,
      createdAt: new Date()
    });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('MongoDB error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
