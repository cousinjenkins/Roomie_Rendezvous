import { Router } from 'express';
import * as DisputesController from '../controllers/disputes';

const router = Router();

router.post('/', DisputesController.addDispute);
router.put('/resolve/:dispute_id', DisputesController.resolveADispute);
router.get('/', DisputesController.getAllDisputes);

export default router;
