import { useState, useEffect } from 'react';
import { Menu, X, BarChart3, ShoppingCart, Users, Package, Settings, LogOut, Loader } from 'lucide-react';

export default function ShopDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('No Name');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch('/api/dashboard/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent orders
      const ordersRes = await fetch('/api/orders?limit=5');
      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData);

      // Fetch customers
      const customersRes = await fetch('/api/customers');
      const customersData = await customersRes.json();
      setCustomers(customersData);

      // Fetch shop name
      const shopRes = await fetch('/api/shop/info');
      const shopData = await shopRes.json();
      setName(shopData.name || 'No Name');
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 w-screen">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-1/5' : 'w-1/12'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold">Freshly</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-gray-800 p-2 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                activeTab === item.id ? 'bg-green-600' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">{name} - Dashboard</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-green-600">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {loading && (
            <div className="flex justify-center items-center h-full">
              <Loader className="animate-spin" size={48} />
            </div>
          )}

          {activeTab === 'overview' && !loading && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.length > 0 ? (
                  stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-4 rounded-lg`}>
                          <stat.icon size={24} className="text-gray-700" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No stats available</p>
                )}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-8 py-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  {orders.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                            <td className="px-8 py-4 text-sm text-gray-900 font-semibold">{order.orderId}</td>
                            <td className="px-8 py-4 text-sm text-gray-600">{order.customerName}</td>
                            <td className="px-8 py-4 text-sm text-gray-900 font-semibold">${order.amount}</td>
                            <td className="px-8 py-4 text-sm">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-8 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="px-8 py-4 text-gray-600">No orders available</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && !loading && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">All Orders</h3>
              </div>
              <div className="overflow-x-auto">
                {orders.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-8 py-4 text-sm text-gray-900 font-semibold">{order.orderId}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{order.customerName}</td>
                          <td className="px-8 py-4 text-sm text-gray-900 font-semibold">${order.amount}</td>
                          <td className="px-8 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="px-8 py-4 text-gray-600">No orders available</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'products' && !loading && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Products</h3>
              </div>
              <div className="overflow-x-auto">
                {products.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Product Name</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-8 py-4 text-sm text-gray-900 font-semibold">{product.name}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{product.sku}</td>
                          <td className="px-8 py-4 text-sm text-gray-900 font-semibold">${product.price}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">{product.stock}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{product.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="px-8 py-4 text-gray-600">No products available</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'customers' && !loading && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Customers</h3>
              </div>
              <div className="overflow-x-auto">
                {customers.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Total Orders</th>
                        <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-8 py-4 text-sm text-gray-900 font-semibold">{customer.name}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{customer.email}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{customer.phone}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">{customer.totalOrders}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{new Date(customer.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="px-8 py-4 text-gray-600">No customers available</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Settings</h3>
              <p className="text-gray-600">Settings section coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}