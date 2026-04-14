// src/pages/AddPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';

const AddPassword = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    siteName: '',
    username: '',
    password: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
        toast.error("Your confirmed password doesn't match your password!");
        return;
    }
    setLoading(true);
    try {
      console.log("Sending data:", formData);
      await axios.post('http://localhost:4000/api/vault', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Password added successfully!');
      navigate('/vault');
    } catch (err) {
      console.error('Error adding password:', err);
      alert('Failed to add password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Password</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Site Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2"
              placeholder="e.g. github.com"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
              placeholder="e.g. johndoe (Recommended for easier recall)"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block font-medium text-gray-700 mb-1">Password<span className="text-red-500">*</span></label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2"
              placeholder="e.g. MySecurePassword123!"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[39px] text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                // className="w-full border rounded-md px-4 py-2 pr-10"
                className={`w-full border rounded-md px-4 py-2 pr-10 ${confirmPassword && formData.password !== confirmPassword ? 'border-red-500' : ''}`}
                placeholder="Re-type password to confirm"
              />
              {confirmPassword && formData.password !== confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-4 py-2"
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/vault')}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#2e4b5e] hover:bg-[#507687] text-[#fff2f2] rounded transition"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPassword;