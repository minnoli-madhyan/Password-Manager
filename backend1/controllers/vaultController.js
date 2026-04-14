import VaultEntry from '../models/VaultEntry.js';
import { encrypt, decrypt } from '../utils/encryption.js';

// GET /vault - Get all vault entries for user
export const getVaultEntries = async (req, res) => {
  try {
    const entries = await VaultEntry.find({ user: req.user.id });
    const decryptedEntries = entries.map(entry => ({
      ...entry._doc,
      password: decrypt(entry.password)
    }));
    res.json(decryptedEntries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /vault/:id - Get one particular vault entry for user
export const getVaultEntryById = async (req, res) => {
  try {
    const entry = await VaultEntry.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    const decryptedEntry = {
      ...entry._doc,
      password: decrypt(entry.password),
    };

    res.json(decryptedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.log(err);
  }
};

// POST /vault - Create a new vault entry
export const createVaultEntry = async (req, res) => {
  const { siteName, username, password, notes } = req.body;
  try {
    const newEntry = new VaultEntry({
      user: req.user.id,
      siteName,
      username,
      password: encrypt(password),
      notes
    });
    const saved = await newEntry.save();
    res.status(201).json({ ...saved._doc, password });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /vault/:id - Update vault entry
export const updateVaultEntry = async (req, res) => {
  const { siteName, username, password, notes } = req.body;
  try {
    const updatedEntry = await VaultEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        siteName,
        username,
        password: encrypt(password),
        notes
      },
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ ...updatedEntry._doc, password });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.log(err)
  }
};

// DELETE /vault/:id - Delete vault entry
export const deleteVaultEntry = async (req, res) => {
  try {
    const deleted = await VaultEntry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
