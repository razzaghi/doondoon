import express from 'express';
import userRoutes from './user.route';
import game2048 from './game2048.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount game2048 routes at /users
router.use('/game2048', game2048);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
