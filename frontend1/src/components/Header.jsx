import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header = () => {

  const { token } = useContext(AppContext);

  return (
    <div className="text-black min-h-screen px-6 py-12">
        {/* --------------Hero section-------------- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Securely Store and Manage Your Passwords</h1>
            <p className="text-gray-800 text-lg mb-8">Encrypted. Accessible. Simple to use.</p>
              <div className="flex justify-center gap-4">
                {token 
                  ? <>
                      <Link to="/vault" className="bg-[#273f4f] hover:bg-[#507687] text-[#fff2f2] px-6 py-3 rounded-full font-medium">My Vault</Link>
                      <Link to="/add" className="bg-gray-200 border border-gray-300 hover:bg-gray-400 px-6 py-3 rounded-full font-medium">Add Password</Link>
                    </>
                  : <>
                      <Link to="/login" state={{ action: 'Sign Up' }} className="bg-[#273f4f] hover:bg-[#507687] text-[#fff2f2] px-6 py-3 rounded-full font-medium">Get Started</Link>
                      <Link to="/login" state={{ action: 'Login' }} className="border border-gray-300 hover:bg-gray-400 px-6 py-3 rounded-full font-medium">Login</Link>
                    </> 
                }
              </div>
        </div>
        {/* --------------Features Section-------------- */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Feature icon="🔒" title="Encryption" desc="Passwords are AES-256 encrypted." />
            <Feature icon="📱" title="Cross Platform" desc="Access your vault anywhere, anytime." />
            <Feature icon="🧠" title="User Friendly" desc="Simple and intuitive interface." />
            <Feature icon="💡" title="Open Source" desc="Completely transparent and secure." />
        </section>
        {/* --------------How It Works-------------- */}
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Step num="1" text="Sign Up and Login" />
                <Step num="2" text="Add Your Passwords" />
                <Step num="3" text="Access Anytime Securely" />
            </div>
        </section>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="bg-[#f4f6ff] p-6 rounded-xl text-center shadow hover:shadow-lg transition-all">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const Step = ({ num, text }) => (
  <div className="p-4">
    <div className="text-5xl font-bold text-[#005C78] mb-2">{num}</div>
    <p>{text}</p>
  </div>
);

export default Header;