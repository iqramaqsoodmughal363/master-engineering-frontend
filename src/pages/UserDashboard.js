import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { projectsData } from '../date/projectsData';

const API_URL = process.env.REACT_APP_API_URL || 'https://master-engineering-api.vercel.app';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [orders, setOrders] = useState([]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({ name: user?.name || '', phone: '', address: '' });

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const loadData = async () => {
    try {
      const [cartResponse, ordersResponse] = await Promise.all([
        fetch(`${API_URL}/api/cart`, { headers: headers() }),
        fetch(`${API_URL}/api/orders/my`, { headers: headers() }),
      ]);
      if (!cartResponse.ok || !ordersResponse.ok) throw new Error('Unable to load your dashboard.');
      setCart(await cartResponse.json());
      setOrders(await ordersResponse.json());
    } catch (error) {
      toast.error(error.message || 'Unable to load your dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const addItem = async (product) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ productId: product.id, title: product.title, thumbnail: product.thumbnail, category: product.category }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to add item.');
      setCart(data);
      toast.success('Item added to your cart.');
    } catch (error) { toast.error(error.message || 'Unable to add item to your cart.'); }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/items/${productId}`, {
        method: 'PATCH', headers: headers(), body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to update your cart.');
      setCart(data);
    } catch (error) { toast.error(error.message || 'Unable to update your cart.'); }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST', headers: headers(), body: JSON.stringify({ items: cart.items, customer }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to place your order.');
      toast.success('Order placed successfully.');
      setCart({ items: [] });
      setOrders((current) => [data.order, ...current]);
      setCustomer({ name: user?.name || '', phone: '', address: '' });
    } catch (error) { toast.error(error.message || 'Unable to place your order.'); }
    finally { setIsSubmitting(false); }
  };

  const signOut = () => { logout(); navigate('/login'); };

  if (isLoading) return <div className="text-center py-20 font-semibold text-gray-600">Loading your dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-8">
          <div><p className="text-secondary font-semibold">Customer Dashboard</p><h1 className="text-3xl font-bold text-primary">Welcome, {user?.name || 'Customer'}</h1><p className="text-gray-600">Manage your selected equipment and orders.</p></div>
          <div className="flex gap-3"><Link to="/gallery" className="px-4 py-2 bg-secondary text-white rounded-lg font-semibold">Browse Catalog</Link><button onClick={signOut} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center gap-2"><FaSignOutAlt /> Sign Out</button></div>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-5"><div><h2 className="text-2xl font-bold text-primary">Your Cart</h2><p className="text-gray-500">{cart.items.length} item{cart.items.length === 1 ? '' : 's'} selected</p></div><FaShoppingCart className="text-2xl text-secondary" /></div>
          {cart.items.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center"><div className="mx-auto mb-4 w-16 h-16 rounded-full bg-secondary text-white text-4xl flex items-center justify-center"><FaPlus /></div><h3 className="text-xl font-semibold text-gray-800">You have not added any items to your cart.</h3><p className="text-gray-500 mt-2 mb-5">Browse our catalog and select equipment for a quote.</p><button onClick={() => setShowCatalog((value) => !value)} className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold">+ Add Items</button></div>
          ) : (
            <div className="space-y-3">{cart.items.map((item) => <div key={item.productId} className="flex items-center gap-4 border-b border-gray-100 pb-3"><img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover" /><div className="flex-1"><h3 className="font-semibold text-primary">{item.title}</h3><p className="text-sm text-gray-500">{item.category}</p></div><div className="flex items-center gap-3"><button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-full border flex items-center justify-center" aria-label="Decrease quantity"><FaMinus className="text-xs" /></button><span className="font-semibold">{item.quantity}</span><button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-full border flex items-center justify-center" aria-label="Increase quantity"><FaPlus className="text-xs" /></button></div></div>)}</div>
          )}
        </section>

        {showCatalog && <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"><div className="flex justify-between items-center mb-5"><h2 className="text-2xl font-bold text-primary">Available Equipment</h2><button onClick={() => setShowCatalog(false)} className="text-gray-500">Close</button></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{projectsData.slice(0, 12).map((product) => <div key={product.id} className="border rounded-lg overflow-hidden"><img src={product.thumbnail} alt={product.title} className="w-full h-28 object-cover" /><div className="p-3"><h3 className="font-semibold text-sm">{product.title}</h3><button onClick={() => addItem(product)} className="mt-3 w-full py-2 bg-secondary text-white rounded font-semibold text-sm">Add to Cart</button></div></div>)}</div></section>}

        {cart.items.length > 0 && <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"><h2 className="text-2xl font-bold text-primary mb-5">Place Your Order</h2><form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-3 gap-4"><input className="border rounded-lg px-4 py-3" placeholder="Full name" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} required /><input className="border rounded-lg px-4 py-3" placeholder="Phone number" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} required /><input className="border rounded-lg px-4 py-3" placeholder="Delivery address" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} required /><button disabled={isSubmitting} className="md:col-span-3 py-3 bg-primary text-white rounded-lg font-semibold disabled:opacity-50">{isSubmitting ? 'Placing Order...' : 'Place Order'}</button></form></section>}

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h2 className="text-2xl font-bold text-primary mb-5">Order History</h2>{orders.length === 0 ? <p className="text-gray-500">You have not placed any orders yet.</p> : <div className="space-y-3">{orders.map((order) => <div key={order._id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-2"><div><p className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</p><p className="text-sm text-gray-500">{order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}</p></div><span className="text-secondary font-semibold">{order.status}</span></div>)}</div>}</section>
      </div>
    </div>
  );
};

export default UserDashboard;
