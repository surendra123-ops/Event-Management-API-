import express from 'express';
import {
  createEvent,
  getEventDetails,
  registerUser,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats
} from '../controllers/eventController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect,createEvent);
router.get('/:id',protect, getEventDetails);
router.post('/:id/register',protect, registerUser);
router.post('/:id/cancel',protect, cancelRegistration);
router.get('/upcoming/all',protect, listUpcomingEvents);
router.get('/:id/stats',protect, getEventStats);

export default router;
