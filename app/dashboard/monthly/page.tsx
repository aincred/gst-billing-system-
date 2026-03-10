"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area 
} from 'recharts';
import { 
  FileBarChart, TrendingUp, IndianRupee, 
  Calendar, ArrowUpRight, Loader2, Download 
} from 'lucide-react';

// --- Types ---
interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  gstRate: number;
  isHeading?: boolean;
}

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  customerName: string;
  totalAmount: number;
  items: InvoiceItem[];
}

interface MonthlyData {
  name: string;      // e.g., "Jan 2026"
  revenue: number;
  tax: number;
  count: number;
  rawDate: Date;
}

export default function MonthlyReportPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/invoices');
        const data = await response.json();
        if (data.success) {
          setInvoices(data.invoices);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  // --- Process Data ---
  const reportData = useMemo(() => {
    const months: Record<string, MonthlyData> = {};

    invoices.forEach((inv) => {
      const date = new Date(inv.date);
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!months[monthKey]) {
        months[monthKey] = {
          name: monthKey,
          revenue: 0,
          tax: 0,
          count: 0,
          rawDate: date,
        };
      }

      const total = Number(inv.totalAmount || 0);
      months[monthKey].revenue += total;
      months[monthKey].count += 1;
      
      // Calculate tax (assuming 18% if not explicitly totaled in your DB)
      // If your DB has a specific tax field, use that instead.
      months[monthKey].tax += (total * 18) / 118; 
    });

    return Object.values(months).sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
  }, [invoices]);

  const totalRevenue = reportData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalTax = reportData.reduce((acc, curr) => acc + curr.tax, 0);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Analyzing financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileBarChart className="text-indigo-600" /> Monthly Reports
            </h1>
            <p className="text-slate-500 text-sm">Review your business growth and tax liabilities.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export Summary
          </button>
        </div>

        {/* --- KPI Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg"><IndianRupee className="w-5 h-5 text-green-600" /></div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg"><TrendingUp className="w-5 h-5 text-indigo-600" /></div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Total Tax Collected</p>
            <p className="text-2xl font-bold text-slate-900">₹{totalTax.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg"><Calendar className="w-5 h-5 text-amber-600" /></div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Active Months</p>
            <p className="text-2xl font-bold text-slate-900">{reportData.length}</p>
          </div>
        </div>

        {/* --- Charts --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Tax Collection Trend</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData}>
                  <defs>
                    <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} hide />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="tax" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTax)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Monthly Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
                  <th className="p-4 font-semibold">Month</th>
                  <th className="p-4 font-semibold text-center">Invoices</th>
                  <th className="p-4 font-semibold text-right">Revenue</th>
                  <th className="p-4 font-semibold text-right">SGST (9%)</th>
                  <th className="p-4 font-semibold text-right">CGST (9%)</th>
                  <th className="p-4 font-semibold text-right">Total Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...reportData].reverse().map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors text-sm">
                    <td className="p-4 font-bold text-slate-700">{row.name}</td>
                    <td className="p-4 text-center text-slate-600">{row.count}</td>
                    <td className="p-4 text-right font-semibold text-slate-900">₹{row.revenue.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-right text-slate-500">₹{(row.tax / 2).toLocaleString('en-IN')}</td>
                    <td className="p-4 text-right text-slate-500">₹{(row.tax / 2).toLocaleString('en-IN')}</td>
                    <td className="p-4 text-right font-bold text-indigo-600">₹{row.tax.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}