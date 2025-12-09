import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const SignIn = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('✅ Login successful:', data);

        // Navigate to dashboard or home page
        navigate('/dashboard');
      } else {
        // Show error message from backend
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scroll-smooth h-screen w-screen flex flex-col">

      {/* FULLSCREEN BACKGROUND */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 via-green-500 to-green-700">

        {/* Sign in card */}
        <div className="bg-white/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md">

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-green-700 mb-3">
            Freshly Store
          </h1>
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">
            Sign In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-5">
              <p className="text-red-700 text-sm text-center font-medium">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-black ">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold shadow-lg transition disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-700 text-sm mt-6">
            Don't have an account?
            <a href="/signup" className="text-green-700 font-semibold hover:underline"> Sign Up</a>
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;