import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState({
  //   photo: '/default-profile.png', // Replace with your actual default image path
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   phone: '9876543210',
  //   address: '123 Main Street, New Delhi',
  //   gender: 'Male',
  //   dob: '',
  // });
  const {user, setUser} = useContext(AppContext);
  const [userData, setUserData] = useState(user);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // NEW state

  useEffect(() => {
    if (user && user.image) {
      setPreviewPhoto(user.image);
    }
  }, [user]);

  const handleEditClick = () => {
    setUserData(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    // setUser({ ...formData, photo: previewPhoto });
    // setIsEditing(false);

    if (!isValidPhone(userData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!isValidDOB(userData.dob)) {
      toast.error("Please enter a valid Date of Birth.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', userData.name);
      form.append('phone', userData.phone);
      form.append('address', userData.address);
      form.append('gender', userData.gender);
      form.append('dob', userData.dob);
      if (photoFile) {
        form.append('image', photoFile);
      }

      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:4000/api/auth/update-profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // or just `token` if that's what your backend uses
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUser(res.data.user); // Update context
        setPreviewPhoto(res.data.user.image); // After successful update
        setIsEditing(false);
        setPhotoFile(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Profile update failed.');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // store the actual file for uploading
      const imageUrl = URL.createObjectURL(file);
      setPreviewPhoto(imageUrl);
    }
  };

    const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const isValidDOB = (dob) => {
    const today = new Date();
    const selectedDate = new Date(dob);
    return dob && selectedDate <= today;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={previewPhoto}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-[#B2C6D5]"
        />

        {isEditing && (
          <div className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}

        <div className="mt-4 text-center w-full">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full mb-2 border rounded p-2"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                className="w-full mb-2 border rounded p-2 bg-gray-200"
                disabled
              />
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full mb-2 border rounded p-2"
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full mb-2 border rounded p-2"
                placeholder="Address"
              />
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full mb-2 border rounded p-2"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="w-full mb-2 border rounded p-2"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <p className="text-gray-600">Gender: {user.gender || 'Not specified'}</p>
              <p className="text-gray-600">
                Date of Birth: {user.dob || 'Not provided'}
              </p>
            </>
          )}
        </div>

        <div className="mt-4 w-full">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-[#B2C6D5]"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;