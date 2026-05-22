import express from 'express';
import LogController from '../controllers/Log.js';

const router = express.Router();

/**
 * @swagger
 * /admin/log/total:
 *   get:
 *     summary: Obter total de Logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/log/total', LogController.total)

export default router;