import express from 'express';
import {
  createEvent,
  getEventDetails,
  registerUser,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.post('/:id/register', registerUser);
router.post('/:id/cancel', cancelRegistration);
router.get('/upcoming/all', listUpcomingEvents);
router.get('/:id/stats', getEventStats);

export default router;
