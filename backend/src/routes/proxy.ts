// src/routes/proxyRoutes.ts

import { Router } from 'express';
import { proxyToUniversities } from '../controllers/proxy';

const router = Router();

router.use('/search', proxyToUniversities);

export default router;
