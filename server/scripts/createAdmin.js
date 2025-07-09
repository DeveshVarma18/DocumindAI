import bcrypt from 'bcryptjs';
import clientPromise from '../config/database.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
  try {
    console.log('🔧 Creating admin user...');
    
    const client = await clientPromise;
    const db = client.db('documind');
    const usersCollection = db.collection('users');

    // Admin credentials
    const adminData = {
      name: 'Devesh Varma',
      email: 'deveshvarma@admin.com',
      password: 'devehs@18',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ 
      email: adminData.email 
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists with email:', adminData.email);
      process.exit(1);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Create admin user document
    const userData = {
      name: adminData.name,
      email: adminData.email.toLowerCase(),
      password: hashedPassword,
      role: adminData.role,
      subscription: {
        plan: 'enterprise',
        status: 'active',
        startDate: new Date(),
        endDate: null,
        features: ['admin_access', 'user_management', 'analytics', 'priority_support']
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };

    // Insert admin user
    const result = await usersCollection.insertOne(userData);

    if (result.insertedId) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', adminData.email);
      console.log('🔑 Password:', adminData.password);
      console.log('👤 Role:', adminData.role);
      console.log('🆔 ID:', result.insertedId);
      console.log('\n🚀 You can now log in to the admin panel at /admin');
    } else {
      console.log('❌ Failed to create admin user');
    }

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
};

createAdminUser();
