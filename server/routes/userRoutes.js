import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateSubscription,
  getSubscriptionStatus
} from '../controllers/userController.js';

const router = Router();

// Register new user
router.post(
  '/register',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  registerUser
);

// Login user
router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  loginUser
);

// Get user profile
router.get('/profile', authenticateToken, getUserProfile);

// Update subscription
router.put('/subscription/:userId', [authenticateToken, requireAdmin], updateSubscription);

// Get subscription status
router.get('/subscription', authenticateToken, getSubscriptionStatus);

export default router;
