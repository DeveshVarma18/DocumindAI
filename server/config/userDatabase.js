import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri || uri.includes('username:password@cluster')) {
  console.warn('⚠️  MongoDB URI not configured. Please update MONGODB_URI in server/.env with your actual Atlas connection string.');
  console.warn('📋 Template: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
  throw new Error('Please add your MongoDB URI to server/.env file');
}

const options = {
  // Removed deprecated options
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the value
  // across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

