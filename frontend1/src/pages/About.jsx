import React from 'react';
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="text-black min-h-screen px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 text-lg">
          We're on a mission to make password management secure, simple, and stress-free.
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-800 text-base leading-relaxed">
          In a world where digital security is more important than ever, we built this Password Manager
          to help people protect their data without needing to be tech experts. We believe encryption and usability
          can go hand in hand, and that you should have full control over your credentials — always.
        </p>
      </section>

      {/* Why We Built This */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4">Why We Built This</h2>
        <p className="text-gray-800 text-base leading-relaxed">
          Most people use weak or reused passwords, putting themselves at risk. Many password managers are
          either expensive, complex, or closed-source. We wanted to create a solution that is free, transparent,
          and easy for everyone to use — whether you're a student, a professional, or just someone who forgets passwords.
        </p>
      </section>

      {/* Optional: Team Section */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-10">Meet the Creator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mx-auto md:col-start-2">
            <TeamCard
              name="Minnoli Madhyan"
              role="Developer & Designer"
              img={assets.me} // replace with real image if needed
              bio="Built this app with love for simplicity, privacy, and user empowerment."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const TeamCard = ({ name, role, img, bio }) => (
  <div className="bg-[#f4f6ff] p-6 rounded-xl shadow hover:shadow-lg transition-all min-h-80 flex flex-col items-center text-center justify-between">
    <img src={img} alt={name} className="w-32 h-36 object-cover rounded-full mx-auto mb-6" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-sm text-gray-500 mb-2">{role}</p>
    <p className="text-gray-600 text-sm">{bio}</p>
  </div>
);

export default About;
