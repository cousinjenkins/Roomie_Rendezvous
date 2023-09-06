import express from 'express';
import { getProfile, addProfile, updateExistingProfile, removeProfile } from '../controllers/profiles';

const router = express.Router();

router.get('/:id', getProfile);
router.post('/', addProfile);
router.put('/:id', updateExistingProfile);
router.delete('/:id', removeProfile);

export default router;
