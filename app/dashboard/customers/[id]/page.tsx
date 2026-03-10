"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, FileText, Calendar, IndianRupee, 
  ChevronRight, MapPin, Loader2, Package,
  History as HistoryIcon // Aliased to avoid naming conflict with DOM History
} from 'lucide-react';
import Link from 'next/link';

interface HistoryPageProps {
  params: { id: string };
}

export default function CustomerHistoryPage({ params }: { params: HistoryPageProps['params'] }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/customers/${params.id}/history`);
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [params.id]);

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
  );

  if (!data) return <div className="p-8 text-center text-slate-500">Customer record not found.</div>;

  // Calculate Lifetime Value (LTV) across all invoices
  const ltv = data.invoices.reduce((acc: number, inv: any) => {
    const invTotal = inv.items.reduce((sum: number, item: any) => {
      if (item.isHeading) return sum;
      const subtotal = (item.qty || 0) * (item.rate || 0);
      const tax = (subtotal * (item.gstRate || 0)) / 100;
      return sum + subtotal + tax;
    }, 0);
    return acc + invTotal - (inv.discount || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <Link href="/dashboard/customers" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>

        {/* Customer Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-100">
              {data.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{data.name}</h1>
              <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {data.address}, {data.state}
              </p>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-6 py-4 text-right min-w-[180px]">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Lifetime Value</p>
            <p className="text-2xl font-black text-indigo-900">₹{ltv.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Transaction History Timeline */}
        
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 px-1">
            <HistoryIcon className="w-4 h-4 text-indigo-600" /> Transaction History
          </h3>

          {data.invoices.map((inv: any) => (
            <div key={inv.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-all shadow-sm group">
              <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">Invoice #{inv.invoiceNo}</span>
                      <span className="text-[9px] px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded-full font-bold uppercase">Settled</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Issued on {new Date(inv.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 mb-0.5">Amount</p>
                    <p className="text-lg font-black text-slate-900">₹{inv.totalAmount?.toLocaleString('en-IN') || '0'}</p>
                  </div>
                  <Link 
                    href={`/dashboard?id=${inv.id}`}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Items Summary Preview */}
              <div className="flex flex-wrap gap-2">
                {inv.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                    <Package className="w-3 h-3 opacity-40" />
                    <span className="truncate max-w-[150px]">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {data.invoices.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No invoices found for this customer.</p>
              <Link href="/dashboard/billing" className="text-indigo-600 text-sm font-bold hover:underline mt-2 inline-block">
                Create New Invoice
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}