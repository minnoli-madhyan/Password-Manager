import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className='col-span-2'>
          <h3 className="text-2xl font-semibold mb-4">🔐 PassMan</h3>
          {/* <img src={assets.PassMan} className="w-40" onClick={()=>navigate('/')}/> */}
          <p className="text-sm text-gray-400">
            Your secure and reliable password manager.
            All data is end-to-end encrypted.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/register" className="hover:text-white">Register</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} PassVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
