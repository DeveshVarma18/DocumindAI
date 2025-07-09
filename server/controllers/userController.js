import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import clientPromise from '../config/database.js';
import { ObjectId } from 'mongodb';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, role = 'user' } = req.body;

    const client = await clientPromise;
    const db = client.db('documind');
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user document
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role,
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: new Date(),
        endDate: null,
        features: ['basic_ai_assistance']
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };

    const result = await usersCollection.insertOne(userData);

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email: userData.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: result.insertedId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        subscription: userData.subscription
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const client = await clientPromise;
    const db = client.db('documind');
    const usersCollection = db.collection('users');

    // Find user by email
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Update user subscription
export const updateSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, status, endDate, features } = req.body;

    const client = await clientPromise;
    const db = client.db('documind');
    const usersCollection = db.collection('users');

    const updateData = {
      'subscription.plan': plan,
      'subscription.status': status,
      'subscription.endDate': endDate ? new Date(endDate) : null,
      'subscription.features': features || [],
      updatedAt: new Date()
    };

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscription updated successfully'
    });

  } catch (error) {
    console.error('Subscription update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get user subscription status
export const getSubscriptionStatus = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user.subscription) {
      return res.json({
        success: true,
        subscription: {
          plan: 'free',
          status: 'inactive',
          message: 'You are not subscribed to DocumindAI'
        }
      });
    }

    const now = new Date();
    const isExpired = user.subscription.endDate && new Date(user.subscription.endDate) < now;
    
    res.json({
      success: true,
      subscription: {
        plan: user.subscription.plan,
        status: isExpired ? 'expired' : user.subscription.status,
        features: user.subscription.features || [],
        startDate: user.subscription.startDate,
        endDate: user.subscription.endDate,
        message: user.subscription.plan === 'free' || isExpired ? 
          'You are not subscribed to DocumindAI' : 
          `You have an active ${user.subscription.plan} subscription`
      }
    });

  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
