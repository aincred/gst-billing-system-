"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Trash2, Printer, FileText, Settings, Users, Building, List, Languages, Keyboard } from 'lucide-react';

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
    billOfSupply: "Bill Of Supply",
    mob: "Mob.",
    workOrderNo: "Work Order No.",
    panNumber: "Pan Number",
    invoiceNo: "Invoice No.",
    invoiceDate: "Invoice Date",
    partyName: "Party Name:-",
    slNo: "SLNo",
    descriptions: "Descriptions",
    qnty: "Qnty.",
    rate: "Rate",
    unitRate: "Unit Rate",
    gst: "GST",
    amount: "Amount",
    rupeesInWord: "Rupees In Word:",
    payId: "PAYID:-",
    acName: "A/C Name:",
    acNo: "A/C No:-",
    ifscCode: "IFSC Code:-",
    terms: "Term & Conditions",
    jharkhandTerm: "Payment Within 30 days from Date of Invoice",
    jurisdiction: "All Subject to Chaibasa Jurisdictions only",
    total: "Total",
    discount: "Discount",
    roundOff: "Round off",
    grandTotal: "Grand total",
    signature: "Signature"
  },
  hi: {
    billOfSupply: "आपूर्ति बिल (Bill Of Supply)",
    mob: "मोबा. (Mob.):",
    workOrderNo: "कार्य आदेश सं. (Work Order No.)",
    panNumber: "पैन नंबर (Pan Number)",
    invoiceNo: "बीजक सं. (Invoice No.):",
    invoiceDate: "बीजक दिनांक (Invoice Date):",
    partyName: "पार्टी का नाम (Party Name):-",
    slNo: "क्र.सं.",
    descriptions: "विवरण (Descriptions)",
    qnty: "मात्रा",
    rate: "दर",
    unitRate: "इकाई दर",
    gst: "जीएसटी",
    amount: "राशि (Amount)",
    rupeesInWord: "शब्दों में रुपये (Rupees In Word):",
    payId: "पे आईडी (PAYID):-",
    acName: "खाता नाम (A/C Name):",
    acNo: "खाता सं. (A/C No):-",
    ifscCode: "आईएफएससी कोड (IFSC Code):-",
    terms: "नियम व शर्तें (Term & Conditions)",
    jharkhandTerm: "चालान की तारीख से 30 दिनों के भीतर भुगतान (Payment Within 30 days)",
    jurisdiction: "सभी चाईबासा क्षेत्राधिकार के अधीन (Subject to Chaibasa Jurisdictions)",
    total: "कुल (Total)",
    discount: "छूट (Discount)",
    roundOff: "पूर्णांक (Round off)",
    grandTotal: "कुल योग (Grand total)",
    signature: "हस्ताक्षर (Signature)"
  }
};

interface InvoiceItem {
  id: number;
  isHeading: boolean;
  description: string;
  qty: number | string;
  rate: number | string;
  gstRate: number | string;
  [key: string]: string | number | boolean;
}

// Special Input Component that converts English letters to Hindi when Space is pressed
const HinglishInput = ({ value, onChange, enabled, as: Component = 'input', ...props }: any) => {
  const inputRef = useRef<any>(null);
  const [internalVal, setInternalVal] = useState(value);

  useEffect(() => {
    setInternalVal(value);
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

    // Check if the last typed word is entirely English alphabets
    if (lastWord && /^[a-zA-Z]+$/.test(lastWord)) {
      e.preventDefault(); // Prevent immediate space
      try {
        const res = await fetch(`https://inputtools.google.com/request?text=${lastWord}&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`);
        const data = await res.json();
        
        if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1]) {
          const hindiWord = data[1][0][1][0];
          const newTextBefore = textBefore.substring(0, textBefore.length - lastWord.length) + hindiWord + ' ';
          const newVal = newTextBefore + textAfter;
          
          setInternalVal(newVal);
          onChange({ target: { value: newVal } });

          // Keep the cursor right after the newly inserted Hindi word + space
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = newTextBefore.length;
              inputRef.current.selectionEnd = newTextBefore.length;
            }
          }, 10);
        } else {
          // Fallback if API returns empty
          const newVal = textBefore + ' ' + textAfter;
          setInternalVal(newVal);
          onChange({ target: { value: newVal } });
        }
      } catch (err) {
        console.error("Transliteration Error:", err);
        // Fallback on error
        const newVal = textBefore + ' ' + textAfter;
        setInternalVal(newVal);
        onChange({ target: { value: newVal } });
      }
    }
  };

  return (
    <Component 
      ref={inputRef}
      value={internalVal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('edit');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [hinglishEnabled, setHinglishEnabled] = useState(true); // Default ON
  const t = TRANSLATIONS[lang];

  // Company Details (Seller)
  const [company, setCompany] = useState({
    name: 'AARADHYA ENTERPRISES',
    gstin: '20BWSPG7500C1Z0',
    mobile: '9525561056',
    address: 'BARI BAZAR, CHAIBASA, Jharkhand',
    taxPayerType: 'Composition Tax payer',
    panNo: 'BWSPG7500C',
    state: 'Jharkhand'
  });

  // Invoice Details
  const [invoice, setInvoice] = useState({
    invoiceNo: '03',
    date: '2025-11-29',
    workOrderNo: '513/17.11.2025',
    letterNo: ''
  });

  // Customer Details (Buyer)
  const [customer, setCustomer] = useState({
    name: 'District Ayush Medical Officer',
    address: 'West Singhbhum, Chaibasa',
    state: 'Jharkhand'
  });

  // Bank Details
  const [bank, setBank] = useState({
    payId: 'SGH/PAYEE/68017',
    acName: 'SANDIP LAL GUPTA',
    bankName: 'BANK OF BARODA',
    acNo: '12390100019101',
    ifsc: 'BARB0CHAIBA'
  });

  // Line Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, isHeading: true, description: 'मंझारी (मंझारी:)- 19.11.2025', qty: 0, rate: 0, gstRate: 0 },
    { id: 2, isHeading: false, description: "टेंट 15'x15'", qty: 1, rate: 2200, gstRate: 18 },
    { id: 3, isHeading: false, description: 'पलास्टिक कुर्सी (कवर के साथ)', qty: 10, rate: 7, gstRate: 18 },
    { id: 4, isHeading: false, description: 'टेबल लकड़ी का (2x6)', qty: 2, rate: 40, gstRate: 18 },
    { id: 5, isHeading: false, description: 'खाना', qty: 6, rate: 130, gstRate: 5 },
    { id: 6, isHeading: false, description: 'नास्ता', qty: 6, rate: 40, gstRate: 5 },
    { id: 7, isHeading: false, description: 'चाय', qty: 12, rate: 8, gstRate: 5 },
    { id: 8, isHeading: false, description: 'पानी (किनले)', qty: 8, rate: 18, gstRate: 5 },
    { id: 9, isHeading: false, description: 'Box Set Chonga & Mike (ऑपरेटर सहित)', qty: 1, rate: 2000, gstRate: 5 },
  ]);

  const [discount, setDiscount] = useState<number>(0);

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = (isHeading: boolean = false) => {
    setItems([...items, { id: Date.now(), isHeading, description: '', qty: 1, rate: 0, gstRate: 18 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculations
  const calculations = useMemo(() => {
    let rawTotalTaxable = 0;
    let totalTaxAmount = 0;
    
    const processedItems = items.map((item) => {
      if (item.isHeading) return { ...item, unitRate: 0, gstAmt: 0, amount: 0 };
      
      const unitRate = (Number(item.qty) || 0) * (Number(item.rate) || 0); 
      const gstAmt = (unitRate * (Number(item.gstRate) || 0)) / 100;
      const amount = unitRate + gstAmt;

      rawTotalTaxable += unitRate;
      totalTaxAmount += gstAmt;

      return {
        ...item,
        unitRate,
        gstAmt,
        amount
      };
    });

    const isIntraState = company.state === customer.state;
    const cgst = isIntraState ? totalTaxAmount / 2 : 0;
    const sgst = isIntraState ? totalTaxAmount / 2 : 0;
    const igst = !isIntraState ? totalTaxAmount : 0;

    const rawGrandTotal = rawTotalTaxable - discount + totalTaxAmount;
    const roundedGrandTotal = Math.round(rawGrandTotal);
    const roundOff = roundedGrandTotal - rawGrandTotal;

    return {
      items: processedItems,
      totalTaxable: rawTotalTaxable,
      totalGstAmount: totalTaxAmount,
      rawTotalAmount: rawTotalTaxable + totalTaxAmount,
      cgst,
      sgst,
      igst,
      roundOff,
      grandTotal: roundedGrandTotal
    };
  }, [items, discount, company.state, customer.state]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
      
      {/* App Header (Hidden in Print) */}
      <header className="bg-slate-800 text-white p-4 shadow-md print:hidden sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-bold tracking-wide">Aaradhya Billing Format</h1>
          </div>
          <div className="flex bg-slate-700 p-1 rounded-lg items-center flex-wrap gap-2">
            
            {/* HINGLISH TOGGLE BUTTON */}
            <button 
              onClick={() => setHinglishEnabled(!hinglishEnabled)}
              className={`px-4 py-2 flex items-center rounded-md transition-colors text-sm font-medium border ${
                hinglishEnabled 
                  ? 'bg-green-600 border-green-500 text-white shadow-inner' 
                  : 'border-slate-500 text-slate-300 hover:bg-slate-600'
              }`}
              title="Type in English, press Space to convert to Hindi automatically"
            >
              <Keyboard className="w-4 h-4 mr-2" />
              {hinglishEnabled ? 'Hinglish: ON' : 'Hinglish: OFF'}
            </button>

            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 flex items-center rounded-md transition-colors text-sm font-medium border border-slate-500 hover:bg-slate-600"
            >
              <Languages className="w-4 h-4 mr-2" />
              {lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            </button>
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${activeTab === 'edit' ? 'bg-amber-500 text-slate-900 shadow' : 'text-slate-200 hover:text-white'}`}
            >
              Edit Details
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md transition-colors text-sm font-medium flex items-center ${activeTab === 'preview' ? 'bg-amber-500 text-slate-900 shadow' : 'text-slate-200 hover:text-white'}`}
            >
              <Printer className="w-4 h-4 mr-2" /> Preview & Print
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto p-4 md:p-6 print:p-0 print:m-0">
        
        {/* ==================== EDIT MODE ==================== */}
        {activeTab === 'edit' && (
          <div className="space-y-6 print:hidden">
            
            {hinglishEnabled && (
               <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg text-sm flex items-center">
                 <Keyboard className="w-5 h-5 mr-2 flex-shrink-0" />
                 <p><strong>Hinglish Typing is Active:</strong> Click on Party Name, Address, or Item Descriptions. Type an English word (e.g., <code className="bg-white px-1 rounded">khana</code>) and press <strong>Space</strong> to convert it to Hindi (<code className="bg-white px-1 rounded">खाना</code>).</p>
               </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company & Invoice Meta */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <h2 className="text-lg font-bold flex items-center mb-4 border-b pb-2"><Building className="w-5 h-5 mr-2" /> Seller & Invoice Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><label className="text-xs text-neutral-500">Company Name</label><input type="text" className="w-full p-2 border rounded" value={company.name} onChange={e => setCompany({...company, name: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">GSTIN</label><input type="text" className="w-full p-2 border rounded uppercase" value={company.gstin} onChange={e => setCompany({...company, gstin: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">PAN Number</label><input type="text" className="w-full p-2 border rounded uppercase" value={company.panNo} onChange={e => setCompany({...company, panNo: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">Mobile</label><input type="text" className="w-full p-2 border rounded" value={company.mobile} onChange={e => setCompany({...company, mobile: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">Tax Payer Type</label><input type="text" className="w-full p-2 border rounded" value={company.taxPayerType} onChange={e => setCompany({...company, taxPayerType: e.target.value})} /></div>
                  <div className="col-span-2"><label className="text-xs text-neutral-500">Address</label><input type="text" className="w-full p-2 border rounded" value={company.address} onChange={e => setCompany({...company, address: e.target.value})} /></div>
                  
                  <div className="col-span-2 border-t mt-2 pt-4"></div>
                  
                  <div><label className="text-xs text-neutral-500">Invoice No.</label><input type="text" className="w-full p-2 border rounded" value={invoice.invoiceNo} onChange={e => setInvoice({...invoice, invoiceNo: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">Invoice Date</label><input type="date" className="w-full p-2 border rounded" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">Work Order No. (with Date)</label><input type="text" className="w-full p-2 border rounded" value={invoice.workOrderNo} onChange={e => setInvoice({...invoice, workOrderNo: e.target.value})} /></div>
                  <div><label className="text-xs text-neutral-500">Letter No (Optional)</label><input type="text" className="w-full p-2 border rounded" value={invoice.letterNo} onChange={e => setInvoice({...invoice, letterNo: e.target.value})} /></div>
                </div>
              </div>

              {/* Customer & Bank Details */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                  <h2 className="text-lg font-bold flex items-center mb-4 border-b pb-2"><Users className="w-5 h-5 mr-2" /> Billed To (Party Details)</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-neutral-500">Party Name</label>
                      {/* Uses Hinglish Input */}
                      <HinglishInput enabled={hinglishEnabled} type="text" className="w-full p-2 border rounded" value={customer.name} onChange={(e: any) => setCustomer({...customer, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500">Address / Description</label>
                      {/* Uses Hinglish Input Textarea */}
                      <HinglishInput as="textarea" enabled={hinglishEnabled} className="w-full p-2 border rounded resize-none" rows={2} value={customer.address} onChange={(e: any) => setCustomer({...customer, address: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500">State (Used for IGST/CGST Logic)</label>
                      <select className="w-full p-2 border rounded" value={customer.state} onChange={e => setCustomer({...customer, state: e.target.value})}>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                  <h2 className="text-lg font-bold flex items-center mb-4 border-b pb-2"><Settings className="w-5 h-5 mr-2" /> Bank Account Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs text-neutral-500">A/C Name</label><input type="text" className="w-full p-2 border rounded" value={bank.acName} onChange={e => setBank({...bank, acName: e.target.value})} /></div>
                    <div><label className="text-xs text-neutral-500">Bank Name</label><input type="text" className="w-full p-2 border rounded" value={bank.bankName} onChange={e => setBank({...bank, bankName: e.target.value})} /></div>
                    <div><label className="text-xs text-neutral-500">A/C No.</label><input type="text" className="w-full p-2 border rounded" value={bank.acNo} onChange={e => setBank({...bank, acNo: e.target.value})} /></div>
                    <div><label className="text-xs text-neutral-500">IFSC Code</label><input type="text" className="w-full p-2 border rounded" value={bank.ifsc} onChange={e => setBank({...bank, ifsc: e.target.value})} /></div>
                    <div className="col-span-2"><label className="text-xs text-neutral-500">Pay ID</label><input type="text" className="w-full p-2 border rounded" value={bank.payId} onChange={e => setBank({...bank, payId: e.target.value})} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-lg font-bold flex items-center"><List className="w-5 h-5 mr-2" /> Line Items (Supports Hindi/English)</h2>
                <div className="flex gap-2">
                  <button onClick={() => addItem(true)} className="flex items-center space-x-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-200 text-sm font-medium border">
                    <Plus className="w-4 h-4" /><span>Add Heading Row</span>
                  </button>
                  <button onClick={() => addItem(false)} className="flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md hover:bg-amber-200 text-sm font-medium border border-amber-300">
                    <Plus className="w-4 h-4" /><span>Add Item</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-200 text-sm text-slate-600">
                      <th className="p-2 w-12 text-center">Type</th>
                      <th className="p-2">Description / Heading</th>
                      <th className="p-2 w-20 text-center">Qnty.</th>
                      <th className="p-2 w-24 text-right">Rate</th>
                      <th className="p-2 w-20 text-center">GST %</th>
                      <th className="p-2 w-32 text-right">Total (Inc. Tax)</th>
                      <th className="p-2 w-12 text-center">Act</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50 ${item.isHeading ? 'bg-indigo-50/30' : ''}`}>
                        <td className="p-2 text-center">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${item.isHeading ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                            {item.isHeading ? 'Head' : 'Item'}
                          </span>
                        </td>
                        <td className="p-2">
                          {/* Uses Hinglish Input Here */}
                          <HinglishInput 
                            enabled={hinglishEnabled}
                            type="text" 
                            placeholder={item.isHeading ? "Enter Heading (e.g. Location - Date)" : "Item description"} 
                            className={`w-full p-2 border border-transparent hover:border-slate-300 focus:border-amber-400 rounded outline-none bg-transparent focus:bg-white ${item.isHeading ? 'font-bold text-indigo-900' : ''}`} 
                            value={item.description} 
                            onChange={(e: any) => handleItemChange(item.id, 'description', e.target.value)} 
                          />
                        </td>
                        <td className="p-2">
                          {!item.isHeading && <input type="number" min="1" className="w-full p-2 text-center border border-transparent hover:border-slate-300 focus:border-amber-400 rounded outline-none bg-transparent focus:bg-white" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)} />}
                        </td>
                        <td className="p-2">
                          {!item.isHeading && <input type="number" min="0" className="w-full p-2 text-right border border-transparent hover:border-slate-300 focus:border-amber-400 rounded outline-none bg-transparent focus:bg-white" value={item.rate} onChange={e => handleItemChange(item.id, 'rate', e.target.value)} />}
                        </td>
                        <td className="p-2">
                          {!item.isHeading && (
                            <select className="w-full p-2 border border-transparent hover:border-slate-300 focus:border-amber-400 rounded outline-none bg-transparent focus:bg-white text-center" value={item.gstRate} onChange={e => handleItemChange(item.id, 'gstRate', e.target.value)}>
                              {[0, 5, 12, 18, 28].map(rate => <option key={rate} value={rate}>{rate}%</option>)}
                            </select>
                          )}
                        </td>
                        <td className="p-2 text-right font-medium text-slate-700">
                          {!item.isHeading && (() => {
                            const unitR = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                            const gst = (unitR * (Number(item.gstRate)||0)) / 100;
                            return (unitR + gst).toFixed(2);
                          })()}
                        </td>
                        <td className="p-2 text-center">
                          <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-1 transition-colors bg-white rounded shadow-sm border" title="Remove">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Calculated Totals Row */}
                    <tr className="bg-slate-100 border-t border-slate-300 font-bold text-slate-700">
                      <td colSpan={5} className="p-2 text-right">Table Total</td>
                      <td className="p-2 text-right">{calculations.rawTotalAmount.toFixed(2)}</td>
                      <td className="p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                 <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded border">
                    <label className="text-sm font-medium text-slate-600">Additional Discount: ₹</label>
                    <input type="number" min="0" className="p-1 border rounded w-24 text-right outline-none focus:border-amber-400" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                 </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== PREVIEW / PRINT MODE ==================== */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} print:block pb-10`}>
          
          <div className="flex justify-center mb-6 print:hidden">
            <button onClick={handlePrint} className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-lg flex items-center space-x-3 hover:bg-amber-400 transition-colors shadow-lg transform hover:scale-105">
              <Printer className="w-5 h-5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* EXACT REPLICA OF PDF */}
          <div className="bg-white mx-auto print:mx-0 print:w-full max-w-[210mm] text-black font-sans leading-snug border border-gray-300 print:border-none shadow-2xl print:shadow-none min-h-[297mm] p-8 box-border text-[13px] relative" style={{ fontFamily: 'Arial, sans-serif' }}>
            
            {/* Header Section */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p><strong>GSTIN:</strong> {company.gstin}</p>
              </div>
              <div className="text-center translate-y-2">
                 <span className="border-2 border-black px-4 py-1 inline-block font-bold text-lg rounded-sm tracking-wide">
                   {t.billOfSupply}
                 </span>
              </div>
              <div className="text-right">
                <p><strong>{t.mob}</strong> {company.mobile}</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-[28px] font-extrabold uppercase tracking-widest mt-2 mb-1 text-black" style={{ transform: 'scaleY(1.1)'}}>
                {company.name}
              </h1>
              <p className="font-semibold text-base uppercase">{company.address}</p>
              <p className="mt-1 font-semibold italic">({company.taxPayerType})</p>
            </div>

            <div className="flex justify-between items-start mb-4 text-[13px]">
              <div className="space-y-1">
                 {invoice.letterNo && <p><strong>Letter No.:</strong> {invoice.letterNo}</p>}
                 <p className="flex"><span className="w-24"><strong>{t.partyName}</strong></span> <span className="font-bold whitespace-pre-line ml-1">{customer.name},<br/>{customer.address}</span></p>
              </div>
              <div className="space-y-1 text-right">
                <p><strong>{t.workOrderNo}</strong> {invoice.workOrderNo}</p>
                <p><strong>{t.panNumber}-</strong> {company.panNo}</p>
                <p><strong>{t.invoiceNo}</strong> {invoice.invoiceNo}</p>
                <p><strong>{t.invoiceDate}</strong> {new Date(invoice.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
              </div>
            </div>

            {/* Main Table */}
            <table className="w-full border-collapse border-2 border-black mb-4">
              <thead>
                <tr className="border-b-2 border-black bg-white">
                  <th className="border-r-2 border-black p-1 text-center font-bold w-12">{t.slNo}</th>
                  <th className="border-r-2 border-black p-1 text-left font-bold">{t.descriptions}</th>
                  <th className="border-r-2 border-black p-1 text-center font-bold w-14">{t.qnty}</th>
                  <th className="border-r-2 border-black p-1 text-center font-bold w-20">{t.rate}</th>
                  <th className="border-r-2 border-black p-1 text-center font-bold w-24">{t.unitRate}</th>
                  <th className="border-r-2 border-black p-1 text-center font-bold w-20">{t.gst}</th>
                  <th className="border-r-2 border-black p-1 text-center font-bold w-10">%</th>
                  <th className="p-1 text-center font-bold w-28">{t.amount}</th>
                </tr>
              </thead>
              <tbody className="align-top border-b-2 border-black">
                {calculations.items.map((item, idx) => {
                  
                  // Calculate actual serial number skipping headings
                  let slNo = '';
                  if (!item.isHeading) {
                     const prevItems = calculations.items.slice(0, idx + 1);
                     const count = prevItems.filter(i => !i.isHeading).length;
                     slNo = count.toString();
                  }

                  if (item.isHeading) {
                    return (
                      <tr key={item.id} className="">
                        <td className="border-r-2 border-black p-1 text-center"></td>
                        <td className="border-r-2 border-black p-1 font-bold pt-3 pb-1" colSpan={7}>{item.description}</td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={item.id} className="">
                      <td className="border-r-2 border-black p-1 text-center">{slNo}</td>
                      <td className="border-r-2 border-black p-1">{item.description}</td>
                      <td className="border-r-2 border-black p-1 text-center">{item.qty}</td>
                      <td className="border-r-2 border-black p-1 text-right">{Number(item.rate).toFixed(2)}</td>
                      <td className="border-r-2 border-black p-1 text-right">{item.unitRate!.toFixed(2)}</td>
                      <td className="border-r-2 border-black p-1 text-right">{item.gstAmt!.toFixed(2)}</td>
                      <td className="border-r-2 border-black p-1 text-center">{item.gstRate}</td>
                      <td className="p-1 text-right font-medium">{item.amount!.toFixed(2)}</td>
                    </tr>
                  );
                })}
                {/* Min Height Filler Row to stretch table if items are few */}
                <tr className="h-10">
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="border-r-2 border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>
                {/* Calculated Totals Row */}
                <tr className="border-t-2 border-black font-bold">
                  <td colSpan={4} className="border-r-2 border-black p-1 text-right uppercase pr-4">{t.total}</td>
                  <td className="border-r-2 border-black p-1 text-right">{calculations.totalTaxable.toFixed(2)}</td>
                  <td className="border-r-2 border-black p-1 text-right">{calculations.totalGstAmount.toFixed(2)}</td>
                  <td className="border-r-2 border-black p-1 text-center"></td>
                  <td className="p-1 text-right">{calculations.rawTotalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Footer Section */}
            <div className="flex justify-between border-2 border-black">
              {/* Left Side: Words, Bank Details, T&C */}
              <div className="w-[65%] p-2 border-r-2 border-black flex flex-col justify-between">
                <div>
                  <p className="mb-2"><strong>{t.rupeesInWord}</strong><br/><span className="italic">{numberToWordsINR(calculations.grandTotal)}</span></p>
                  
                  <div className="mt-4 leading-tight">
                    <p><strong>{t.payId}</strong> {bank.payId}</p>
                    <p><strong>{t.acName}</strong> {bank.acName}, {bank.bankName}.</p>
                    <p><strong>{t.acNo}</strong> {bank.acNo}</p>
                    <p><strong>{t.ifscCode}</strong> {bank.ifsc}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-bold underline mb-1">{t.terms}</p>
                  <ol className="list-decimal pl-4 text-[11px] space-y-0.5">
                    {/* Dynamic Condition for Jharkhand based on notes */}
                    {customer.state.toLowerCase() === 'jharkhand' && (
                      <li>{t.jharkhandTerm}</li>
                    )}
                    <li>{t.jurisdiction}</li>
                  </ol>
                </div>
              </div>

              {/* Right Side: Totals & Signatures */}
              <div className="w-[35%] flex flex-col bg-white">
                <div className="p-2 space-y-1">
                  <div className="flex justify-between"><span className="font-semibold">{t.total}</span><span>{calculations.totalTaxable.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">{t.discount}</span><span>{discount.toFixed(2)}</span></div>
                  {company.state === customer.state ? (
                    <>
                      <div className="flex justify-between"><span className="font-semibold">SGST @</span><span>{calculations.sgst.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="font-semibold">CGST @</span><span>{calculations.cgst.toFixed(2)}</span></div>
                    </>
                  ) : (
                    <div className="flex justify-between"><span className="font-semibold">IGST @</span><span>{calculations.igst.toFixed(2)}</span></div>
                  )}
                  <div className="flex justify-between"><span className="font-semibold">{t.roundOff}</span><span>{calculations.roundOff.toFixed(2)}</span></div>
                </div>
                
                <div className="flex justify-between p-2 border-t-2 border-black border-b-2 font-bold bg-gray-50">
                  <span>{t.grandTotal}</span><span>{calculations.grandTotal.toFixed(2)}</span>
                </div>

                <div className="flex-1 p-2 flex flex-col justify-between mt-6 text-center">
                  <p className="font-bold text-[12px]">for {company.name}</p>
                  <div className="mt-12 text-sm">
                    {t.signature}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}