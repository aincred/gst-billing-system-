"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, FileText, Calculator, Building, User } from 'lucide-react';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh"
];

const GST_RATES = [0, 5, 12, 18, 28];

export default function App() {
  const [activeTab, setActiveTab] = useState('edit');

  // Seller Details (Your Company)
  const [seller, setSeller] = useState({
    name: 'Acme Corp Technologies',
    gstin: '27AADCB2230M1Z2',
    address: '123 Tech Park, Andheri East, Mumbai, 400069',
    state: 'Maharashtra'
  });

  // Buyer Details (Customer)
  const [buyer, setBuyer] = useState({
    name: 'Globex Corporation',
    gstin: '29ABCDE1234F2Z5',
    address: '456 Business Road, Koramangala, Bengaluru, 560034',
    state: 'Karnataka'
  });

  // Invoice Meta
  const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceNo: 'INV-2026-001',
    date: new Date().toISOString().split('T')[0]
  });

  // Line Items
  const [items, setItems] = useState([
    { id: 1, description: 'Web Development Services', hsn: '998311', qty: 1, price: 50000, gstRate: 18 },
    { id: 2, description: 'Server Hosting (1 Year)', hsn: '998315', qty: 1, price: 15000, gstRate: 18 }
  ]);

  // Handlers
  
  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', hsn: '', qty: 1, price: 0, gstRate: 18 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Calculations
  const isInterState = seller.state !== buyer.state;

  const calculations = useMemo(() => {
    let totalTaxable = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    const processedItems = items.map(item => {
      const taxableValue = (Number(item.qty) || 0) * (Number(item.price) || 0);
      const taxAmount = (taxableValue * (Number(item.gstRate) || 0)) / 100;
      
      let cgst = 0, sgst = 0, igst = 0;

      if (isInterState) {
        igst = taxAmount;
        totalIGST += igst;
      } else {
        cgst = taxAmount / 2;
        sgst = taxAmount / 2;
        totalCGST += cgst;
        totalSGST += sgst;
      }

      totalTaxable += taxableValue;

      return {
        ...item,
        taxableValue,
        cgst,
        sgst,
        igst,
        total: taxableValue + taxAmount
      };
    });

    const grandTotal = totalTaxable + totalCGST + totalSGST + totalIGST;

    return {
      items: processedItems,
      totalTaxable,
      totalCGST,
      totalSGST,
      totalIGST,
      totalTax: totalCGST + totalSGST + totalIGST,
      grandTotal
    };
  }, [items, isInterState]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header - Hidden on Print */}
      <header className="bg-indigo-600 text-white p-4 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-wide">GST Billing Pro</h1>
          </div>
          <div className="flex space-x-2 bg-indigo-700 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'edit' ? 'bg-white text-indigo-700 font-semibold' : 'text-white hover:bg-indigo-500'}`}
            >
              Edit Invoice
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white text-indigo-700 font-semibold' : 'text-white hover:bg-indigo-500'}`}
            >
              Preview & Print
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 print:p-0 print:m-0 print:max-w-full">
        
        {/* ================= EDIT MODE ================= */}
        {activeTab === 'edit' && (
          <div className="space-y-6 print:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Seller Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2 mb-4 text-indigo-600">
                  <Building className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Billed By (Your Details)</h2>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="Company Name" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none" value={seller.name} onChange={e => setSeller({...seller, name: e.target.value})} />
                  <input type="text" placeholder="GSTIN" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none uppercase" value={seller.gstin} onChange={e => setSeller({...seller, gstin: e.target.value})} />
                  <textarea placeholder="Address" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none resize-none" rows={2} value={seller.address} onChange={e => setSeller({...seller, address: e.target.value})}></textarea>
                  <select className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none" value={seller.state} onChange={e => setSeller({...seller, state: e.target.value})}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Buyer Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2 mb-4 text-indigo-600">
                  <User className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Billed To (Customer Details)</h2>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="Customer Name" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none" value={buyer.name} onChange={e => setBuyer({...buyer, name: e.target.value})} />
                  <input type="text" placeholder="GSTIN" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none uppercase" value={buyer.gstin} onChange={e => setBuyer({...buyer, gstin: e.target.value})} />
                  <textarea placeholder="Address" className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none resize-none" rows={2} value={buyer.address} onChange={e => setBuyer({...buyer, address: e.target.value})}></textarea>
                  <select className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none" value={buyer.state} onChange={e => setBuyer({...buyer, state: e.target.value})}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Invoice Number</label>
                <input type="text" className="p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none font-medium" value={invoiceMeta.invoiceNo} onChange={e => setInvoiceMeta({...invoiceMeta, invoiceNo: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Invoice Date</label>
                <input type="date" className="p-2 border rounded focus:ring-2 focus:ring-indigo-200 outline-none" value={invoiceMeta.date} onChange={e => setInvoiceMeta({...invoiceMeta, date: e.target.value})} />
              </div>
              <div className="ml-auto flex items-center bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <span className="text-sm text-slate-500 mr-2">Sale Type:</span>
                <span className={`font-bold ${isInterState ? 'text-blue-600' : 'text-emerald-600'}`}>
                  {isInterState ? 'INTER-STATE (IGST)' : 'INTRA-STATE (CGST+SGST)'}
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Products / Services</h2>
                <button onClick={addItem} className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
              
              <table className="w-full text-left border-collapse" style={{ minWidth: '800px' }}>
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm border-y border-slate-200">
                    <th className="p-3 font-medium w-1/3">Description</th>
                    <th className="p-3 font-medium w-24">HSN/SAC</th>
                    <th className="p-3 font-medium w-24">Qty</th>
                    <th className="p-3 font-medium w-32">Rate (₹)</th>
                    <th className="p-3 font-medium w-24">GST %</th>
                    <th className="p-3 font-medium text-right">Amount (₹)</th>
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-2">
                        <input type="text" placeholder="Item description" className="w-full p-2 border border-transparent hover:border-slate-200 focus:border-indigo-300 rounded outline-none bg-transparent focus:bg-white" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input type="text" className="w-full p-2 border border-transparent hover:border-slate-200 focus:border-indigo-300 rounded outline-none bg-transparent focus:bg-white" value={item.hsn} onChange={e => handleItemChange(item.id, 'hsn', e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input type="number" min="1" className="w-full p-2 border border-transparent hover:border-slate-200 focus:border-indigo-300 rounded outline-none bg-transparent focus:bg-white" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input type="number" min="0" className="w-full p-2 border border-transparent hover:border-slate-200 focus:border-indigo-300 rounded outline-none bg-transparent focus:bg-white" value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)} />
                      </td>
                      <td className="p-2">
                        <select className="w-full p-2 border border-transparent hover:border-slate-200 focus:border-indigo-300 rounded outline-none bg-transparent focus:bg-white" value={item.gstRate} onChange={e => handleItemChange(item.id, 'gstRate', e.target.value)}>
                          {GST_RATES.map(rate => <option key={rate} value={rate}>{rate}%</option>)}
                        </select>
                      </td>
                      <td className="p-2 text-right font-medium text-slate-700">
                        {((Number(item.qty) || 0) * (Number(item.price) || 0)).toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-1 transition-colors" title="Remove Item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Summary Bar */}
            <div className="bg-indigo-900 text-white p-4 rounded-xl shadow-lg flex justify-between items-center sticky bottom-6">
              <div className="text-indigo-200 text-sm">
                Taxable: ₹{calculations.totalTaxable.toFixed(2)} <span className="mx-2">|</span> 
                Tax: ₹{calculations.totalTax.toFixed(2)}
              </div>
              <div className="text-xl font-bold flex items-center space-x-4">
                <span>Total: ₹{calculations.grandTotal.toFixed(2)}</span>
                <button 
                  onClick={() => setActiveTab('preview')}
                  className="bg-white text-indigo-900 px-4 py-2 rounded text-sm hover:bg-indigo-50 transition-colors flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" /> Generate Invoice
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= PREVIEW / PRINT MODE ================= */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} print:block`}>
          
          <div className="mb-4 flex justify-between items-center print:hidden">
            <p className="text-slate-500">Previewing Invoice. Click print to generate PDF or send to printer.</p>
            <button onClick={handlePrint} className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors shadow-sm">
              <Printer className="w-5 h-5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* Actual Invoice Paper */}
          <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm max-w-[210mm] mx-auto min-h-[297mm] text-slate-800 print:shadow-none print:p-0 border border-slate-200 print:border-none">
            
            {/* Invoice Header */}
            <div className="text-center mb-8 border-b-2 border-slate-800 pb-4">
              <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-800">Tax Invoice</h1>
              <p className="text-xs font-medium text-slate-500 mt-1">(Original for Recipient)</p>
            </div>

            {/* Two Column details */}
            <div className="flex flex-col sm:flex-row justify-between border-b border-slate-300 pb-6 mb-6 gap-6">
              <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed By</h3>
                <p className="font-bold text-lg">{seller.name || 'Company Name'}</p>
                <p className="text-sm mt-1 whitespace-pre-wrap">{seller.address}</p>
                <p className="text-sm mt-1">State: <span className="font-medium">{seller.state}</span></p>
                <p className="text-sm mt-2 font-semibold">GSTIN: {seller.gstin}</p>
              </div>
              
              <div className="flex-1 border-l-0 sm:border-l border-slate-200 sm:pl-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</h3>
                <p className="font-bold text-lg">{buyer.name || 'Customer Name'}</p>
                <p className="text-sm mt-1 whitespace-pre-wrap">{buyer.address}</p>
                <p className="text-sm mt-1">State: <span className="font-medium">{buyer.state}</span></p>
                <p className="text-sm mt-2 font-semibold">GSTIN: {buyer.gstin}</p>
              </div>
            </div>

            <div className="flex justify-between mb-8 text-sm">
              <div>
                <span className="font-semibold">Invoice No:</span> {invoiceMeta.invoiceNo}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {new Date(invoiceMeta.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric'})}
              </div>
              <div>
                <span className="font-semibold">Place of Supply:</span> {buyer.state}
              </div>
            </div>

            {/* Main Table */}
            <table className="w-full text-sm border-collapse mb-8">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-y border-slate-300">
                  <th className="p-2 border-x border-slate-300 text-left w-10">#</th>
                  <th className="p-2 border-x border-slate-300 text-left">Item Description</th>
                  <th className="p-2 border-x border-slate-300 text-center w-20">HSN/SAC</th>
                  <th className="p-2 border-x border-slate-300 text-right w-16">Qty</th>
                  <th className="p-2 border-x border-slate-300 text-right w-24">Rate</th>
                  <th className="p-2 border-x border-slate-300 text-right w-24">Taxable Val</th>
                  {!isInterState && <th className="p-2 border-x border-slate-300 text-right w-20">CGST</th>}
                  {!isInterState && <th className="p-2 border-x border-slate-300 text-right w-20">SGST</th>}
                  {isInterState && <th className="p-2 border-x border-slate-300 text-right w-24">IGST</th>}
                  <th className="p-2 border-x border-slate-300 text-right w-24 font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="border-b border-slate-300">
                {calculations.items.map((item, idx) => (
                  <tr key={item.id} className="border-b border-slate-200">
                    <td className="p-2 border-x border-slate-300 text-center">{idx + 1}</td>
                    <td className="p-2 border-x border-slate-300">{item.description}</td>
                    <td className="p-2 border-x border-slate-300 text-center">{item.hsn}</td>
                    <td className="p-2 border-x border-slate-300 text-right">{item.qty}</td>
                    <td className="p-2 border-x border-slate-300 text-right">{Number(item.price).toFixed(2)}</td>
                    <td className="p-2 border-x border-slate-300 text-right">{item.taxableValue.toFixed(2)}</td>
                    {!isInterState && (
                      <td className="p-2 border-x border-slate-300 text-right text-xs">
                        <div>{item.cgst.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">({item.gstRate/2}%)</div>
                      </td>
                    )}
                    {!isInterState && (
                      <td className="p-2 border-x border-slate-300 text-right text-xs">
                        <div>{item.sgst.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">({item.gstRate/2}%)</div>
                      </td>
                    )}
                    {isInterState && (
                      <td className="p-2 border-x border-slate-300 text-right text-xs">
                        <div>{item.igst.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">({item.gstRate}%)</div>
                      </td>
                    )}
                    <td className="p-2 border-x border-slate-300 text-right font-medium">{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Section */}
            <div className="flex justify-end mb-12">
              <div className="w-1/2 md:w-1/3">
                <div className="flex justify-between py-1 text-sm border-b border-slate-200">
                  <span className="text-slate-600">Total Taxable Value</span>
                  <span>₹{calculations.totalTaxable.toFixed(2)}</span>
                </div>
                {!isInterState && (
                  <>
                    <div className="flex justify-between py-1 text-sm border-b border-slate-200">
                      <span className="text-slate-600">Total CGST</span>
                      <span>₹{calculations.totalCGST.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm border-b border-slate-200">
                      <span className="text-slate-600">Total SGST</span>
                      <span>₹{calculations.totalSGST.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {isInterState && (
                  <div className="flex justify-between py-1 text-sm border-b border-slate-200">
                    <span className="text-slate-600">Total IGST</span>
                    <span>₹{calculations.totalIGST.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 text-lg font-bold border-b-2 border-slate-800 mt-2">
                  <span>Grand Total</span>
                  <span>₹{calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer / Signatures */}
            <div className="flex justify-between items-end mt-16 pt-8 border-t border-slate-200">
              <div className="text-xs text-slate-500 w-1/2">
                <p className="font-bold mb-1 text-slate-700">Terms & Conditions:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Goods once sold will not be taken back.</li>
                  <li>Interest @ 18% p.a. will be charged if payment is delayed.</li>
                  <li>Subject to local jurisdiction.</li>
                </ol>
              </div>
              <div className="text-center w-1/3">
                <div className="h-16 border-b border-slate-300 mb-2"></div>
                <p className="text-sm font-bold">Authorized Signatory</p>
                <p className="text-xs text-slate-500">For {seller.name}</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}