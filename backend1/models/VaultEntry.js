import mongoose from 'mongoose';

const vaultEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  siteName: { type: String, required: true },
  username: { type: String },
  password: { type: String, required: true }, // Store encrypted
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const vaultEntry = mongoose.model('VaultEntry', vaultEntrySchema);
export default vaultEntry;