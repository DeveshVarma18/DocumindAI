# RAG AI Assistant Backend

A Node.js Express backend API for handling contact form submissions with MongoDB Atlas integration.

## Features

- 🚀 Express.js REST API
- 📦 MongoDB Atlas integration
- 🔒 Security middleware (Helmet, CORS, Rate limiting)
- ✅ Input validation and sanitization
- 📧 Contact form submission handling
- 🏥 Health check endpoints
- 🛡️ Error handling and logging

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)
- `GET /health` - Health check
- `GET /api/db-check` - Database connection check

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the server directory with your MongoDB Atlas URI:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string and update the MONGODB_URI in .env

## Database Schema

The contact messages are stored in the `contact_messages` collection with the following structure:

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  company: String (optional),
  role: String (optional),
  message: String (required),
  createdAt: Date,
  updatedAt: Date,
  status: String (default: 'new')
}
```

## Security Features

- **Rate Limiting:** 100 requests per 15 minutes globally, 5 contact form submissions per 15 minutes per IP
- **CORS:** Configured to only allow requests from the frontend URL
- **Helmet:** Adds security headers
- **Input Validation:** Email format validation and required field checking
- **Request Size Limiting:** 10MB limit on request body size

## Development

The server will automatically restart when files change using nodemon in development mode.

```bash
npm run dev
```

## Production Deployment

For production deployment, make sure to:

1. Set `NODE_ENV=production` in your environment variables
2. Use a production MongoDB Atlas cluster
3. Configure proper CORS origins
4. Use a reverse proxy like Nginx
5. Set up SSL/TLS certificates
6. Configure monitoring and logging

## Testing the API

You can test the contact form endpoint using curl:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "role": "developer",
    "message": "This is a test message"
  }'
```

## Error Handling

The API returns standardized error responses:

```javascript
{
  "success": false,
  "error": "Error message description"
}
```

Success responses include:

```javascript
{
  "success": true,
  "message": "Operation successful",
  "id": "document_id" // for POST requests
}
```
