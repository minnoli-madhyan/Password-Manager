// src/pages/PasswordDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const PasswordDetail = () => {
  const { vaultID } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '', notes: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/vault/${vaultID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntry(res.data);
        setFormData({
          username: res.data.username || '',
          password: res.data.password || '',
          notes: res.data.notes || '',
        });
      } catch (err) {
        console.error('Error fetching entry:', err);
        navigate('/vault');
      }
    };

    fetchEntry();
  }, [vaultID, navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/vault/${vaultID}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEntry(res.data);
      toast.success('Password updated!');
      setEditMode(false);
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.password);
    toast.success('Password copied to clipboard!');
  };

  if (!entry) return null;

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">{entry.siteName}</h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Username</label>
          {editMode ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
          ) : (
            <p className="text-gray-800">{entry.username || '—'}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          {editMode ? (
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          ) : (
            <p className="text-gray-800 flex items-center gap-2">
              {showPassword ? entry.password : '••••••••'}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

              {showPassword && (
                <button
                  onClick={handleCopy}
                  className="text-sm text-gray-600 hover:text-black"
                  title="Copy to clipboard"
                >
                  <Copy size={16}/>
                </button>
              )}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Notes</label>
          {editMode ? (
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-4 py-2"
            />
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap">{entry.notes || '—'}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/vault')}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Back
          </button>

          {editMode ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#2e4b5e] hover:bg-[#507687] text-[#fff2f2] rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-[#2e4b5e] hover:bg-[#507687] text-[#fff2f2] rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordDetail;