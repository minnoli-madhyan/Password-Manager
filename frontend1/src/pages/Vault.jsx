// src/pages/Vault.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Vault = () => {
  const navigate = useNavigate();
  const [vault, setVault] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVault = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/vault', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVault(res.data);
    } catch (err) {
      console.error('Error fetching vault entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this password?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/vault/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVault((prev) => prev.filter((entry) => entry._id !== id));
      toast.success('Password deleted!');
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  useEffect(() => {
    fetchVault();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/password/${id}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by website or username..."
          className="w-full border px-4 py-2 rounded-md shadow-sm"
        />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Your Vault</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : vault.length === 0 ? (
        <p className="text-center text-gray-500">No passwords stored yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {vault
            .filter((entry) =>
              entry.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              entry.username?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((entry) => (
            <div
              key={entry._id}
              onClick={() => handleCardClick(entry._id)}
              className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">{entry.siteName}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Added on {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry._id);
                }}
                className="mt-4"
              >
                <img
                  src={assets.delete_icon}
                  alt="delete"
                  className="w-5 transition hover:scale-110"
                />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/add')}
          className="px-6 py-2 bg-[#2e4b5e] hover:bg-[#507687] text-[#fff2f2] rounded-full shadow transition"
        >
          + Add another password
        </button>
      </div>
    </div>
  );
};

export default Vault;
