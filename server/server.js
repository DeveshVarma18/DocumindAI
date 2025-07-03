import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import clientPromise from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Contact form specific rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per windowMs
  message: {
    success: false,
    error: 'Too many contact form submissions, please try again later.'
  }
});

// Middleware
app.use(helmet()); // Security headers
app.use(limiter); // Apply rate limiting to all routes

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Database connection check
app.get('/api/db-check', async (req, res) => {
  try {
    const client = await clientPromise;
    const adminDb = client.db().admin();
    const status = await adminDb.ping();
    
    res.status(200).json({ 
      success: true, 
      message: 'Database connection successful',
      status: status
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed' 
    });
  }
});

// API Routes
app.use('/api/contact', contactLimiter, contactRoutes);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/contact - Submit contact form`);
  console.log(`   GET  http://localhost:${PORT}/api/contact - Get contact messages`);
  console.log(`   GET  http://localhost:${PORT}/health - Health check`);
  console.log(`   GET  http://localhost:${PORT}/api/db-check - Database connection check`);
});

export default app;
