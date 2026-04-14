import React from 'react'

const Contact = () => {
  return (
    <div className="px-4 py-16">
      <div className="bg-gray-100 shadow-2xl rounded-2xl p-10 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mb-6">We’re here to help! Reach out to us anytime.</p>

        <div className="text-left space-y-4">
          <p><strong>Email:</strong> contact@example.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123, Example Street, Bengaluru, India</p>
          <p><strong>Hours:</strong> Mon–Fri, 10am – 6pm</p>
        </div>
      </div>
    </div>
  )
}

export default Contact