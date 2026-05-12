import express from 'express';
import { listarUsuarios } from '../controllers/teste.js';

const router = express.Router();

router.get('/supabase', listarUsuarios);


export default router;