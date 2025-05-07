
import React from 'react';
import Navbar from '../components/Navbar';
import AdminPanel from '../components/AdminPanel';
import { Database } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-cyber-dark pb-10">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Database className="mr-2 text-cyber-accent" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            System administration and monitoring
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminDashboard;
