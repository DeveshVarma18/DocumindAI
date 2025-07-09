import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats
} from '../controllers/adminController.js';

const router = Router();

// Apply authentication and admin middleware to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Get dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/users/:userId', getUserById);

// Update user
router.put('/users/:userId', updateUser);

// Delete user
router.delete('/users/:userId', deleteUser);

export default router;
