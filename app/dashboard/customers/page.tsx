"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, MapPin, Building2, 
  Plus, Loader2, History as HistoryIcon, PlusCircle 
} from 'lucide-react';
import Link from 'next/link';

interface Customer {
  id: string;
  name: string;
  address: string;
  state: string;
}

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.success) setCustomerList(data.customers);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filtered = customerList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Loading client database...</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-indigo-600 w-7 h-7" /> Client Database
          </h1>
          <p className="text-slate-500 text-sm">Manage customers and view billing history.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Summary Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Clients</p>
          <p className="text-2xl font-bold text-slate-900">{customerList.length}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="p-4">Customer Details</th>
                <th className="p-4">Billing Address</th>
                <th className="p-4 text-center">State</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                      <span className="max-w-xs truncate">{customer.address}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200 uppercase">
                      {customer.state}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* NEW INVOICE ACTION */}
                      <Link 
                        href={`/dashboard/billing?customerId=${customer.id}`}
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Quick Invoice"
                      >
                        <PlusCircle className="w-4 h-4" />
                      </Link>

                      {/* VIEW HISTORY ACTION - FIXED ICON REFERENCE */}
                      <Link 
                        href={`/dashboard/customers/${customer.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-all text-xs font-bold border border-indigo-100"
                      >
                        <HistoryIcon className="w-3.5 h-3.5" /> History
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm italic">No customers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}