import React from "react";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-6">
      {/* Top Navbar */}
      <header className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">Freshly Store</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Total Shops</h2>
          <p className="text-4xl font-bold text-green-600">56</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Pending Orders</h2>
          <p className="text-4xl font-bold text-green-600">23</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Revenue</h2>
          <p className="text-4xl font-bold text-green-600">$4,230</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Recent Activities</h2>

        <ul className="space-y-3">
          <li className="p-3 bg-green-50 rounded-lg border border-green-200">
            🍏 New shop “Fresh Mart” registered.
          </li>
          <li className="p-3 bg-green-50 rounded-lg border border-green-200">
            📦 Order #4839 placed by customer.
          </li>
          <li className="p-3 bg-green-50 rounded-lg border border-green-200">
            🛠 Shop “Vegie House” updated inventory.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
