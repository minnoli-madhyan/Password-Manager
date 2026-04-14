import express from 'express';
import {getVaultEntries,getVaultEntryById,createVaultEntry,updateVaultEntry,deleteVaultEntry} from '../controllers/vaultController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All vault routes are protected
router.use(authMiddleware);

// GET all vault entries
router.get('/', getVaultEntries);

// GET one particular vault entry
router.get('/:id', authMiddleware, getVaultEntryById);

// POST create a new vault entry
router.post('/', createVaultEntry);

// PUT update a vault entry
router.put('/:id', updateVaultEntry);

// DELETE a vault entry
router.delete('/:id', deleteVaultEntry);

export default router;