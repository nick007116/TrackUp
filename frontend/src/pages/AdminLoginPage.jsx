import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  AlertTriangle, 
  Loader2, 
  ArrowLeft 
} from 'lucide-react';
import { login } from '../services/api';

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(credentials);
      if (response.role !== 'admin') {
        throw new Error('Invalid credentials');
      }
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.role);
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.message || 'Invalid Admin ID or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="bg-purple-600 text-white p-8 text-center">
          <ShieldCheck className="mx-auto w-16 h-16 mb-4" strokeWidth={1.5} />
          <h2 className="text-3xl font-bold">Admin Portal</h2>
          <p className="text-purple-100 mt-2">Secure Access Required</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
              <AlertTriangle className="mr-3 w-6 h-6" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Admin ID"
              value={credentials.id}
              onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 
              transition flex items-center justify-center space-x-2 
              disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;