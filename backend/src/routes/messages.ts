import express from 'express';
import { sendMessage, getMessages } from '../controllers/messages';

const router = express.Router();

router.post('/', sendMessage);
router.get('/', getMessages); // e.g., /messages?receiver_id=some-uuid

// ... other routes for additional features

export default router;
