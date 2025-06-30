const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'documind';
const collectionName = 'contact_messages';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const data = req.body;

    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);

    return res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
};
