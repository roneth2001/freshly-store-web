import { useState } from 'react';
import axios from "axios";
import Footer from '../components/footer';

export default function SignUp() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shopName: '',
    address: '',
    telephone: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit form to backend
  const handleSubmit = async () => {
    // Frontend validation
    const { firstName, lastName, shopName, address, telephone, email, password } = formData;

    if (!firstName || !lastName || !shopName || !address || !telephone || !email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

      console.log(response.data);

      setSubmitted(true);

      // Clear form after success
      setFormData({
        firstName: '',
        lastName: '',
        shopName: '',
        address: '',
        telephone: '',
        email: '',
        password: ''
      });

    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      setErrorMessage(msg);
    }

    setLoading(false);
  };

  return (
    <div className="w-screen bg-gradient-to-br from-green-400 to-green-500 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Freshly Store</h1>
          <p className="text-gray-600 text-lg">Create Account</p>
        </div>

        {/* Success message */}
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-green-700 font-semibold text-lg mb-2">
              ✓ Account Created Successfully!
            </p>
            <p className="text-gray-600">Welcome! Your account is ready.</p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Error message */}
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Telephone
              </label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg mt-6 transition 
              ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"}`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
