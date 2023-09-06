import express from 'express';
import { addMatch, getMatch } from '../controllers/matches';

const router = express.Router();

router.post('/', addMatch);
router.get('/:matchId', getMatch);

// Add more routes as required...

export default router;
