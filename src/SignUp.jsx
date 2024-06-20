import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const SignUp = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <form className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <div className="mb-4">
            <input type="text" placeholder="First Name" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Last Name" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Sign Up
          </button>
          <p className="text-center mt-4">
            Already a member? <a href="/login" className="text-blue-500">Log In</a>
          </p>
          <div className="flex justify-center mt-4">
            <FaFacebook className="text-3xl text-blue-600 mx-2" />
            <FaGoogle className="text-3xl text-red-600 mx-2" />
            <FaTwitter className="text-3xl text-blue-400 mx-2" />
          </div>
          <p className="text-center text-red-500 mt-4">If an error occurs when filling out the form, a message will show here.</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
