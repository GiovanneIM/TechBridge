import express from 'express';
// MIDDLEWARES
import {
    authMiddleware,
    adminMiddleware,
    gerentePrincipalMiddleware,
    gerenteMiddleware
} from '../middlewares/authMiddleware.js';

const router = express.Router();