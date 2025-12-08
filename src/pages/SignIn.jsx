import React from "react";
import Footer from "../components/footer";

const SignIn = () => {
  return (
    <div className="w-screen h-screen">

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

          {/* Form */}
          <form className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sign In Button */}
            <button
              className=" bg-green hover:bg-green-700 text-black p-3 rounded-lg font-semibold shadow-lg transition"
            >
              Sign In
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
