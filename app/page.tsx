"use client";

import Link from 'next/link';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Trash2, Printer, FileText, Settings, Users, Building, List, Languages, Keyboard, Calculator, LogIn, FilePlus } from 'lucide-react';

// Utility for Indian Rupee Number to Words
function numberToWordsINR(numInput: number | string) {
  let numStr = numInput.toString();
  if (numStr.length > 9) return 'overflow';
  
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  let n = ('000000000' + numStr).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + 'Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + 'Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + 'Thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + 'Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])]) : '';
  
  return str.trim() ? str.trim() + ' Only' : 'Zero Only';
}

const STATES = [
  "Jharkhand", "Bihar", "Odisha", "West Bengal", "Chhattisgarh", "Uttar Pradesh", "Maharashtra", "Karnataka", "Delhi", "Others"
];

const TRANSLATIONS = {
  en: {
    billOfSupply: "Bill Of Supply", mob: "Mob.", workOrderNo: "Work Order No.", panNumber: "Pan Number", invoiceNo: "Invoice No.", invoiceDate: "Invoice Date", partyName: "Billed To", slNo: "SL No.", descriptions: "Descriptions", qnty: "Qnty.", rate: "Rate", unitRate: "Unit Rate", gst: "GST", amount: "Amount", rupeesInWord: "Rupees In Word:", payId: "PAYID:-", acName: "A/C Name:", acNo: "A/C No:-", ifscCode: "IFSC Code:-", terms: "Term & Conditions", jharkhandTerm: "Payment Within 30 days from Date of Invoice", jurisdiction: "All Subject to Chaibasa Jurisdictions only", total: "Total Taxable", discount: "Discount", roundOff: "Round off", grandTotal: "Grand total", signature: "Authorized Signatory"
  },
  hi: {
    billOfSupply: "आपूर्ति बिल (Bill Of Supply)", mob: "मोबा. (Mob.):", workOrderNo: "कार्य आदेश सं. (Work Order)", panNumber: "पैन नंबर (Pan Number)", invoiceNo: "बीजक सं. (Invoice No.):", invoiceDate: "बीजक दिनांक (Invoice Date):", partyName: "पार्टी का नाम (Billed To)", slNo: "क्र.सं.", descriptions: "विवरण (Descriptions)", qnty: "मात्रा", rate: "दर", unitRate: "इकाई दर", gst: "GST", amount: "राशि (Amount)", rupeesInWord: "शब्दों में रुपये (Rupees In Word):", payId: "पे आईडी (PAYID):-", acName: "खाता नाम (A/C Name):", acNo: "खाता सं. (A/C No):-", ifscCode: "आईएफएससी कोड (IFSC Code):-", terms: "नियम व शर्तें (Term & Conditions)", jharkhandTerm: "चालान की तारीख से 30 दिनों के भीतर भुगतान", jurisdiction: "सभी चाईबासा क्षेत्राधिकार के अधीन", total: "कुल (Taxable)", discount: "छूट (Discount)", roundOff: "पूर्णांक (Round off)", grandTotal: "कुल योग (Grand total)", signature: "हस्ताक्षर (Signature)"
  }
};

const HinglishInput = ({ value, onChange, enabled, as: Component = 'input', ...props }: any) => {
  const inputRef = useRef<any>(null);
  const [internalVal, setInternalVal] = useState(value || '');

  useEffect(() => { 
    setInternalVal(value || ''); 
  }, [value]);

  const handleChange = (e: any) => {
    setInternalVal(e.target.value);
    onChange(e);
  };

  const handleKeyDown = async (e: any) => {
    if (!enabled || e.key !== ' ') return;

    const el = e.target;
    const cursorPos = el.selectionStart;
    const textBefore = internalVal.slice(0, cursorPos);
    const textAfter = internalVal.slice(cursorPos);
    
    const words = textBefore.split(/[\s\n]+/);
    const lastWord = words[words.length - 1];

    if (lastWord && /^[a-zA-Z]+$/.test(lastWord)) {
      e.preventDefault();
      try {
        const res = await fetch(`https://inputtools.google.com/request?text=${lastWord}&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`);
        const data = await res.json();
        
        if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1]) {
          const hindiWord = data[1][0][1][0];
          const newTextBefore = textBefore.substring(0, textBefore.length - lastWord.length) + hindiWord + ' ';
          const newVal = newTextBefore + textAfter;
          
          setInternalVal(newVal);
          onChange({ target: { value: newVal } });

          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = newTextBefore.length;
              inputRef.current.selectionEnd = newTextBefore.length;
            }
          }, 10);
        } else {
          const newVal = textBefore + ' ' + textAfter;
          setInternalVal(newVal);
          onChange({ target: { value: newVal } });
        }
      } catch (err) {
        const newVal = textBefore + ' ' + textAfter;
        setInternalVal(newVal);
        onChange({ target: { value: newVal } });
      }
    }
  };

  return <Component ref={inputRef} value={internalVal} onChange={handleChange} onKeyDown={handleKeyDown} {...props} />;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('edit');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [hinglishEnabled, setHinglishEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const t = TRANSLATIONS[lang];

  // ALL BLANK FIELDS
  const [company, setCompany] = useState({
    name: '', gstin: '', mobile: '', address: '', taxPayerType: '', panNo: '', state: 'Jharkhand'
  });

  const [invoice, setInvoice] = useState({
    invoiceNo: '', date: new Date().toISOString().split('T')[0], workOrderNo: '', letterNo: ''
  });

  const [customer, setCustomer] = useState({
    name: '', address: '', state: 'Jharkhand'
  });

  const [bank, setBank] = useState({
    payId: '', acName: '', bankName: '', acNo: '', ifsc: ''
  });

  // Start with one completely empty product row
  const [items, setItems] = useState([
    { id: Date.now(), isHeading: false, description: '', qty: 1, rate: 0, gstRate: 18 }
  ]);

  const [discount, setDiscount] = useState(0);

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = (isHeading: boolean = false) => {
    setItems([...items, { id: Date.now(), isHeading, description: '', qty: 1, rate: 0, gstRate: 18 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Instantly resets invoice-specific data without a confirmation pop-up
  const handleCreateNew = () => {
    setCustomer({ name: '', address: '', state: 'Jharkhand' });
    setInvoice({ invoiceNo: '', date: new Date().toISOString().split('T')[0], workOrderNo: '', letterNo: '' });
    setItems([{ id: Date.now(), isHeading: false, description: '', qty: 1, rate: 0, gstRate: 18 }]);
    setDiscount(0);
    setActiveTab('edit');
  };

  const calculations = useMemo(() => {
    let rawTotalTaxable = 0;
    let totalTaxAmount = 0;

    const processedItems = items.map((item) => {
      if (item.isHeading) return { ...item, unitRate: 0, gstAmt: 0, igstAmt: 0, amount: 0 };
      
      const unitRate = (Number(item.qty) || 0) * (Number(item.rate) || 0); 
      const gstAmt = (unitRate * (Number(item.gstRate) || 0)) / 100;

      const amount = unitRate + gstAmt;
      rawTotalTaxable += unitRate;
      totalTaxAmount += gstAmt;

      return { ...item, unitRate, gstAmt, igstAmt: gstAmt, amount };
    });

    const rawGrandTotal = rawTotalTaxable - discount + totalTaxAmount;
    const roundedGrandTotal = Math.round(rawGrandTotal);
    const roundOff = roundedGrandTotal - rawGrandTotal;

    return {
      items: processedItems, totalTaxable: rawTotalTaxable, totalGstAmount: totalTaxAmount, rawTotalAmount: rawTotalTaxable + totalTaxAmount, igst: totalTaxAmount, roundOff, grandTotal: roundedGrandTotal
    };
  }, [items, discount, company.state, customer.state]);

  const handlePrint = () => window.print();

  // Unified function: Saves to DB then switches to Preview automatically
  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    const dataToSave = { company, customer, invoice, bank, items, discount };
    
    try {
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();
      
      if (!result.success) {
        console.error("Failed to save to database:", result.error);
        // We still proceed to preview so the user isn't blocked from printing
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setIsGenerating(false);
      setActiveTab('preview'); // Switch to preview regardless of network status
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-10">
      
      <header className="bg-indigo-600 text-white p-4 shadow-md print:hidden sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-wide">GST Billing Pro</h1>
          </div>
          <div className="flex bg-indigo-700 p-1 rounded-lg items-center flex-wrap gap-2">
            <button onClick={() => setHinglishEnabled(!hinglishEnabled)} className={`px-3 py-1.5 flex items-center rounded-md transition-colors text-sm font-medium ${hinglishEnabled ? 'bg-emerald-500 text-white shadow' : 'bg-indigo-800 text-indigo-200 hover:bg-indigo-600'}`}>
              <Keyboard className="w-4 h-4 mr-1.5" /> {hinglishEnabled ? 'Hinglish: ON' : 'Hinglish: OFF'}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="px-3 py-1.5 flex items-center rounded-md transition-colors text-sm font-medium text-white hover:bg-indigo-500">
              <Languages className="w-4 h-4 mr-1.5" /> {lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            </button>
            <div className="w-px h-6 bg-indigo-500 mx-1"></div>
            
            <button onClick={handleCreateNew} className="px-4 py-1.5 flex items-center rounded-md transition-colors text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm">
              <FilePlus className="w-4 h-4 mr-1.5" /> New
            </button>
            <div className="w-px h-6 bg-indigo-500 mx-1"></div>

            <button onClick={() => setActiveTab('edit')} className={`px-4 py-1.5 rounded-md transition-colors text-sm font-medium ${activeTab === 'edit' ? 'bg-white text-indigo-700 shadow' : 'text-white hover:bg-indigo-500'}`}>
              Edit Invoice
            </button>
            <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-md transition-colors text-sm font-medium flex items-center ${activeTab === 'preview' ? 'bg-white text-indigo-700 shadow' : 'text-white hover:bg-indigo-500'}`}>
              <Printer className="w-4 h-4 mr-1.5" /> Preview
            </button>
            <div className="w-px h-6 bg-indigo-500 mx-1"></div>
            <Link href="/login" className="px-4 py-1.5 rounded-md transition-colors text-sm font-medium flex items-center text-white bg-indigo-800 hover:bg-indigo-900 shadow-sm">
              <LogIn className="w-4 h-4 mr-1.5" /> Login
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto p-4 md:p-6 print:p-0 print:m-0">
        
        {activeTab === 'edit' && (
          <div className="space-y-6 print:hidden">
            {hinglishEnabled && (
               <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-sm flex items-center shadow-sm">
                 <Keyboard className="w-5 h-5 mr-2 shrink-0 text-emerald-600" />
                 <p><strong>Hinglish Typing is Active:</strong> Type an English word (e.g., <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-100">khana</code>) in Descriptions or Party Name and press <strong>Space</strong> to convert it to Hindi (<code className="bg-white px-1.5 py-0.5 rounded border border-emerald-100">खाना</code>).</p>
               </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center space-x-2 mb-4 text-indigo-600 border-b pb-2">
                  <Building className="w-5 h-5" />
                  <h2 className="text-lg font-semibold text-slate-800">Billed By (Your Details)</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><label className="text-xs font-medium text-slate-500 mb-1 block">Company Name</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all" value={company.name} onChange={e => setCompany({...company, name: e.target.value})} /></div>
                  <div className="col-span-2"><label className="text-xs font-medium text-slate-500 mb-1 block">Address</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all" value={company.address} onChange={e => setCompany({...company, address: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">GSTIN</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all uppercase" value={company.gstin} onChange={e => setCompany({...company, gstin: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">PAN Number</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all uppercase" value={company.panNo} onChange={e => setCompany({...company, panNo: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Mobile</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all" value={company.mobile} onChange={e => setCompany({...company, mobile: e.target.value})} /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Tax Payer Type</label><input type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all" value={company.taxPayerType} onChange={e => setCompany({...company, taxPayerType: e.target.value})} /></div>
                  <div className="col-span-2 mt-1">
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Your State</label>
                    <select className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none bg-white" value={company.state} onChange={e => setCompany({...company, state: e.target.value})}>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center space-x-2 mb-4 text-indigo-600 border-b pb-2">
                    <Users className="w-5 h-5" />
                    <h2 className="text-lg font-semibold text-slate-800">Billed To (Customer)</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Party Name</label>
                      <HinglishInput enabled={hinglishEnabled} type="text" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all" value={customer.name} onChange={(e: any) => setCustomer({...customer, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Address / Description</label>
                      <HinglishInput as="textarea" enabled={hinglishEnabled} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none" rows={2} value={customer.address} onChange={(e: any) => setCustomer({...customer, address: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Place of Supply (State)</label>
                      <select className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 outline-none bg-white" value={customer.state} onChange={e => setCustomer({...customer, state: e.target.value})}>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center space-x-2 mb-4 text-indigo-600 border-b pb-2">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-lg font-semibold text-slate-800">Invoice Information</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-medium text-slate-500 mb-1 block">Invoice No.</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none font-medium" value={invoice.invoiceNo} onChange={e => setInvoice({...invoice, invoiceNo: e.target.value})} /></div>
                    <div><label className="text-xs font-medium text-slate-500 mb-1 block">Invoice Date</label><input type="date" className="w-full p-2 border border-slate-300 rounded outline-none" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} /></div>
                    <div><label className="text-xs font-medium text-slate-500 mb-1 block">Work Order No.</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={invoice.workOrderNo} onChange={e => setInvoice({...invoice, workOrderNo: e.target.value})} /></div>
                    <div><label className="text-xs font-medium text-slate-500 mb-1 block">Letter No</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={invoice.letterNo} onChange={e => setInvoice({...invoice, letterNo: e.target.value})} /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <div className="flex items-center space-x-2 mb-4 text-indigo-600 border-b pb-2">
                 <Settings className="w-5 h-5" />
                 <h2 className="text-lg font-semibold text-slate-800">Bank Account Details</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                 <div className="md:col-span-1"><label className="text-xs font-medium text-slate-500 mb-1 block">Pay ID</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={bank.payId} onChange={e => setBank({...bank, payId: e.target.value})} /></div>
                 <div className="md:col-span-1"><label className="text-xs font-medium text-slate-500 mb-1 block">A/C Name</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={bank.acName} onChange={e => setBank({...bank, acName: e.target.value})} /></div>
                 <div className="md:col-span-1"><label className="text-xs font-medium text-slate-500 mb-1 block">Bank Name</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={bank.bankName} onChange={e => setBank({...bank, bankName: e.target.value})} /></div>
                 <div className="md:col-span-1"><label className="text-xs font-medium text-slate-500 mb-1 block">A/C No.</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={bank.acNo} onChange={e => setBank({...bank, acNo: e.target.value})} /></div>
                 <div className="md:col-span-1"><label className="text-xs font-medium text-slate-500 mb-1 block">IFSC Code</label><input type="text" className="w-full p-2 border border-slate-300 rounded outline-none" value={bank.ifsc} onChange={e => setBank({...bank, ifsc: e.target.value})} /></div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                   <List className="w-5 h-5" />
                   <h2 className="text-lg font-semibold text-slate-800">Products & Services</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => addItem(true)} className="flex items-center space-x-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-200 transition-colors text-sm font-medium border border-slate-200">
                    <Plus className="w-4 h-4" /><span>Add Heading Row</span>
                  </button>
                  <button onClick={() => addItem(false)} className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium border border-indigo-100">
                    <Plus className="w-4 h-4" /><span>Add Item</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                      <th className="p-3 font-medium w-16 text-center">Type</th>
                      <th className="p-3 font-medium">Description / Heading</th>
                      <th className="p-3 font-medium w-24 text-center">Qnty.</th>
                      <th className="p-3 font-medium w-32 text-right">Rate (₹)</th>
                      <th className="p-3 font-medium w-24 text-center">Total GST %</th>
                      <th className="p-3 font-medium w-32 text-center bg-indigo-50/50">SGST</th>
                      <th className="p-3 font-medium w-32 text-center bg-indigo-50/50">CGST</th>
                      <th className="p-3 font-medium w-36 text-right">Total (₹)</th>
                      <th className="p-3 font-medium w-12 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${item.isHeading ? 'bg-indigo-50/40' : ''}`}>
                        <td className="p-2 text-center">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${item.isHeading ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                            {item.isHeading ? 'Head' : 'Item'}
                          </span>
                        </td>
                        <td className="p-2">
                          <HinglishInput enabled={hinglishEnabled} type="text" placeholder={item.isHeading ? "Enter Heading" : "Item description"} className={`w-full p-2 border border-transparent hover:border-slate-300 focus:border-indigo-400 rounded outline-none bg-transparent focus:bg-white transition-all ${item.isHeading ? 'font-bold text-indigo-900' : ''}`} value={item.description} onChange={(e: any) => handleItemChange(item.id, 'description', e.target.value)} />
                        </td>
                        <td className="p-2">
                          {!item.isHeading && <input type="number" min="1" className="w-full p-2 text-center border border-transparent hover:border-slate-300 focus:border-indigo-400 rounded outline-none bg-transparent focus:bg-white transition-all" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)} />}
                        </td>
                        <td className="p-2">
                          {!item.isHeading && <input type="number" min="0" className="w-full p-2 text-right border border-transparent hover:border-slate-300 focus:border-indigo-400 rounded outline-none bg-transparent focus:bg-white transition-all" value={item.rate} onChange={e => handleItemChange(item.id, 'rate', e.target.value)} />}
                        </td>
                        <td className="p-2">
                          {!item.isHeading && (
                            <select className="w-full p-2 border border-slate-200 rounded outline-none bg-white text-center transition-all cursor-pointer shadow-sm" value={item.gstRate} onChange={e => handleItemChange(item.id, 'gstRate', e.target.value)}>
                              {[0, 5, 12, 18, 28].map(rate => <option key={rate} value={rate}>{rate}%</option>)}
                            </select>
                          )}
                        </td>
                        <td className="p-2 text-center bg-indigo-50/20">
                          {!item.isHeading && (() => {
                            const unitR = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                            const gst = (unitR * (Number(item.gstRate)||0)) / 100;
                            return (
                              <div className="flex flex-col items-center justify-center p-1 bg-white border border-slate-200 rounded text-xs">
                                <span className="font-semibold text-slate-700">₹{(gst/2).toFixed(2)}</span>
                                <span className="text-[10px] text-slate-500 font-medium">({(Number(item.gstRate) || 0)/2}%)</span>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="p-2 text-center bg-indigo-50/20">
                          {!item.isHeading && (() => {
                            const unitR = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                            const gst = (unitR * (Number(item.gstRate)||0)) / 100;
                            return (
                              <div className="flex flex-col items-center justify-center p-1 bg-white border border-slate-200 rounded text-xs">
                                <span className="font-semibold text-slate-700">₹{(gst/2).toFixed(2)}</span>
                                <span className="text-[10px] text-slate-500 font-medium">({(Number(item.gstRate) || 0)/2}%)</span>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="p-2 text-right font-medium text-slate-700">
                          {!item.isHeading && (() => {
                            const unitR = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                            const gst = (unitR * (Number(item.gstRate)||0)) / 100;
                            return (unitR + gst).toFixed(2);
                          })()}
                        </td>
                        <td className="p-2 text-center">
                          <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-1.5 transition-colors bg-white rounded shadow-sm border border-slate-200" title="Remove">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white border-t border-slate-200">
                      <td colSpan={7}></td>
                      <td className="p-3 text-right text-sm font-medium text-slate-600">Additional Discount:</td>
                      <td className="p-2" colSpan={2}>
                        <div className="flex items-center justify-end">
                          <span className="text-slate-500 mr-1">₹</span>
                          <input type="number" min="0" className="p-1.5 border border-slate-300 rounded w-24 text-right outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-indigo-900 text-white p-4 rounded-xl shadow-xl flex justify-between items-center sticky bottom-6 z-10 print:hidden border border-indigo-800">
              <div className="text-indigo-200 text-sm hidden lg:flex items-center space-x-4">
                <span>Taxable: ₹{calculations.totalTaxable.toFixed(2)}</span>
                <span className="w-px h-4 bg-indigo-700"></span>
                <span>SGST: ₹{(calculations.totalGstAmount/2).toFixed(2)}</span>
                <span className="w-px h-4 bg-indigo-700"></span>
                <span>CGST: ₹{(calculations.totalGstAmount/2).toFixed(2)}</span>
                <span className="w-px h-4 bg-indigo-700"></span>
                <span>Discount: -₹{discount.toFixed(2)}</span>
                <span className="w-px h-4 bg-indigo-700"></span>
                <span>Round Off: ₹{calculations.roundOff.toFixed(2)}</span>
              </div>
              <div className="text-xl font-bold flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
                <span className="mr-3">Total: ₹{calculations.grandTotal.toFixed(2)}</span>
                
                <button 
                  onClick={handleGenerateInvoice} 
                  disabled={isGenerating} 
                  className="bg-white text-indigo-900 px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center shadow-md font-semibold disabled:opacity-80"
                >
                  {isGenerating ? (
                    <><span className="animate-spin mr-2">⏳</span> Saving & Generating...</>
                  ) : (
                    <><FileText className="w-4 h-4 mr-2" /> Generate Invoice</>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} print:block`}>
          <div className="mb-6 flex justify-between items-center print:hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 font-medium flex items-center"><Printer className="w-5 h-5 mr-2 text-indigo-400"/> Previewing standard format. Click print to generate PDF.</p>
            <button onClick={handlePrint} className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors shadow-md font-semibold">
              <Printer className="w-5 h-5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm max-w-[210mm] mx-auto min-h-[297mm] text-slate-800 print:shadow-none print:p-0 border border-slate-200 print:border-none relative box-border" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="flex justify-between items-start mb-6 border-b-2 border-slate-800 pb-4">
               <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">GSTIN</p>
                  <p className="font-semibold">{company.gstin || '-'}</p>
               </div>
               <div className="text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-800">{t.billOfSupply}</h1>
                  <p className="text-xs font-medium text-slate-500 mt-1">({company.taxPayerType || '-'})</p>
               </div>
               <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t.mob}</p>
                  <p className="font-semibold">{company.mobile || '-'}</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-slate-300 pb-6 mb-6 gap-6">
              <div className="flex-1">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Billed By</h3>
                <p className="font-bold text-lg mb-1">{company.name || '-'}</p>
                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{company.address || '-'}</p>
                <p className="text-sm mt-2"><span className="font-semibold text-slate-500">State:</span> {company.state}</p>
                <p className="text-sm"><span className="font-semibold text-slate-500">{t.panNumber}:</span> {company.panNo || '-'}</p>
              </div>
              <div className="flex-1 border-l-0 sm:border-l border-slate-200 sm:pl-6">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t.partyName}</h3>
                <p className="font-bold text-lg mb-1">{customer.name || '-'}</p>
                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{customer.address || '-'}</p>
                <p className="text-sm mt-2"><span className="font-semibold text-slate-500">Place of Supply:</span> {customer.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div><p className="text-xs text-slate-400 font-bold uppercase mb-1">{t.invoiceNo}</p><p className="font-semibold">{invoice.invoiceNo || '-'}</p></div>
              <div><p className="text-xs text-slate-400 font-bold uppercase mb-1">{t.invoiceDate}</p><p className="font-semibold">{invoice.date ? new Date(invoice.date).toLocaleDateString('en-GB').replace(/\//g, '-') : '-'}</p></div>
              <div><p className="text-xs text-slate-400 font-bold uppercase mb-1">{t.workOrderNo}</p><p className="font-semibold">{invoice.workOrderNo || '-'}</p></div>
              <div><p className="text-xs text-slate-400 font-bold uppercase mb-1">Letter No.</p><p className="font-semibold">{invoice.letterNo || '-'}</p></div>
            </div>

            <table className="w-full text-[12px] border-collapse mb-8">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-y-2 border-slate-300">
                  <th className="p-2 border-x border-slate-200 text-center w-10">{t.slNo}</th>
                  <th className="p-2 border-x border-slate-200 text-left">{t.descriptions}</th>
                  <th className="p-2 border-x border-slate-200 text-center w-12">{t.qnty}</th>
                  <th className="p-2 border-x border-slate-200 text-right w-16">{t.rate}</th>
                  <th className="p-2 border-x border-slate-200 text-right w-20">{t.unitRate}</th>
                  <th className="p-2 border-x border-slate-200 text-center w-16">SGST</th>
                  <th className="p-2 border-x border-slate-200 text-center w-16">CGST</th>
                  <th className="p-2 border-x border-slate-200 text-right w-24 font-bold">{t.amount}</th>
                </tr>
              </thead>
              <tbody className="border-b-2 border-slate-300">
                {calculations.items.map((item, idx) => {
                  let slNo = '';
                  if (!item.isHeading) {
                     const prevItems = calculations.items.slice(0, idx + 1);
                     const count = prevItems.filter(i => !i.isHeading).length;
                     slNo = count.toString();
                  }

                  if (item.isHeading) {
                    return (
                      <tr key={item.id} className="bg-slate-50/50 border-b border-slate-100">
                        <td className="p-2 border-x border-slate-200 text-center"></td>
                        <td className="p-2 border-x border-slate-200 font-bold text-slate-800 pt-4 pb-2"><span className="underline">{item.description}</span></td>
                        <td className="p-2 border-x border-slate-200"></td><td className="p-2 border-x border-slate-200"></td><td className="p-2 border-x border-slate-200"></td><td className="p-2 border-x border-slate-200"></td><td className="p-2 border-x border-slate-200"></td><td className="p-2 border-x border-slate-200"></td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={item.id} className="border-b border-slate-100 last:border-0">
                      <td className="p-2 border-x border-slate-200 text-center text-slate-500">{slNo}</td>
                      <td className="p-2 border-x border-slate-200">{item.description}</td>
                      <td className="p-2 border-x border-slate-200 text-center">{item.qty}</td>
                      <td className="p-2 border-x border-slate-200 text-right">{Number(item.rate).toFixed(2)}</td>
                      <td className="p-2 border-x border-slate-200 text-right">{item.unitRate.toFixed(2)}</td>
                      
                      <td className="p-2 border-x border-slate-200 text-center text-slate-600">
                        <div className="flex flex-col">
                          <span>{(item.gstAmt/2).toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400">({(item.gstRate/2)}%)</span>
                        </div>
                      </td>
                      <td className="p-2 border-x border-slate-200 text-center text-slate-600">
                        <div className="flex flex-col">
                          <span>{(item.gstAmt/2).toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400">({(item.gstRate/2)}%)</span>
                        </div>
                      </td>

                      <td className="p-2 border-x border-slate-200 text-right font-medium text-slate-800">{item.amount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
               <div className="w-full md:w-3/5 space-y-6 text-[13px]">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">{t.rupeesInWord}</p>
                    <p className="font-semibold text-slate-800 bg-slate-50 p-2 rounded border border-slate-200 inline-block w-full">{numberToWordsINR(calculations.grandTotal)}</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center"><Settings className="w-4 h-4 mr-1.5" /> Bank Details</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <p><span className="text-slate-500">{t.payId}</span> <br/><span className="font-semibold">{bank.payId || '-'}</span></p>
                      <p><span className="text-slate-500">{t.acName}</span> <br/><span className="font-semibold">{bank.acName || '-'}</span></p>
                      <p><span className="text-slate-500">Bank Name:</span> <br/><span className="font-semibold">{bank.bankName || '-'}</span></p>
                      <p><span className="text-slate-500">{t.acNo}</span> <br/><span className="font-semibold">{bank.acNo || '-'}</span></p>
                      <p className="col-span-2"><span className="text-slate-500">{t.ifscCode}</span> <span className="font-semibold">{bank.ifsc || '-'}</span></p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.terms}</h4>
                    <ol className="list-decimal pl-4 text-xs text-slate-600 space-y-1">
                      {customer.state.toLowerCase() === 'jharkhand' && (
                        <li>{t.jharkhandTerm}</li>
                      )}
                      <li>{t.jurisdiction}</li>
                    </ol>
                  </div>
               </div>

               <div className="w-full md:w-2/5 flex flex-col justify-between h-full min-h-75">
                  <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                    <div className="flex justify-between py-1.5 text-sm border-b border-slate-200">
                      <span className="text-slate-600 font-medium">{t.total}</span>
                      <span className="font-semibold">₹{calculations.totalTaxable.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-1.5 text-sm border-b border-slate-200 text-emerald-600">
                        <span className="font-medium">{t.discount}</span>
                        <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1.5 text-sm border-b border-slate-200">
                      <span className="text-slate-600 font-medium">SGST Amount</span>
                      <span className="font-semibold">₹{(calculations.totalGstAmount / 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm border-b border-slate-200">
                      <span className="text-slate-600 font-medium">CGST Amount</span>
                      <span className="font-semibold">₹{(calculations.totalGstAmount / 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm border-b border-slate-300">
                      <span className="text-slate-600 font-medium">{t.roundOff}</span>
                      <span className="font-semibold">₹{calculations.roundOff.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-bold mt-1">
                      <span className="uppercase tracking-wide">{t.grandTotal}</span>
                      <span className="text-indigo-700">₹{calculations.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-12 text-center pt-8">
                     <p className="font-bold text-sm mb-12 text-slate-700">for {company.name || 'COMPANY NAME'}</p>
                     <div className="h-px bg-slate-300 w-3/4 mx-auto mb-2"></div>
                     <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.signature}</p>
                  </div>
               </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}