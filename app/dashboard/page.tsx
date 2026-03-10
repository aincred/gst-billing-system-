// // // app\dashboard

// // "use client";

// // import React, { useState, useRef, useEffect } from 'react';
// // import Link from 'next/link';
// // import { signOut } from 'next-auth/react'; // Added NextAuth import
// // import { 
// //   FileText, Download, List as ListIcon, X, Search,
// //   MapPin, Printer, LayoutDashboard, Users, Settings,
// //   LogOut, Menu, Bell, User, Loader2
// // } from 'lucide-react';

// // export default function DashboardLayout() {
// //   const [invoices, setInvoices] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [isGenerating, setIsGenerating] = useState(false);
  
// //   const invoiceRef = useRef<HTMLDivElement>(null);

// //   // Fetch data from your Neon DB via API
// //   useEffect(() => {
// //     const fetchInvoices = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await fetch('/api/invoices');
// //         const data = await response.json();
        
// //         if (data.success) {
// //           setInvoices(data.invoices);
// //         } else {
// //           console.error("Failed to fetch invoices:", data.error);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching invoices:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchInvoices();
// //   }, []);

// //   const filteredInvoices = invoices.filter(inv => 
// //     (inv.customerName?.toLowerCase().includes(searchTerm.toLowerCase())) || 
// //     (inv.invoiceNo?.toString().includes(searchTerm))
// //   );

// //   const handleDownloadPDF = async () => {
// //     if (!invoiceRef.current || !selectedInvoice) return;
// //     try {
// //       setIsGenerating(true);
// //       const htmlToImage = await import('html-to-image');
// //       const jsPDF = (await import('jspdf')).default;
      
// //       const imgData = await htmlToImage.toPng(invoiceRef.current, {
// //         pixelRatio: 2, 
// //         backgroundColor: '#ffffff',
// //         filter: (node) => {
// //           if (node instanceof HTMLElement) {
// //             return node.getAttribute('data-hide-on-print') !== 'true';
// //           }
// //           return true;
// //         }
// //       });

// //       const pdf = new jsPDF('p', 'mm', 'a4');
// //       const pdfWidth = pdf.internal.pageSize.getWidth();
// //       const nodeWidth = invoiceRef.current.offsetWidth;
// //       const nodeHeight = invoiceRef.current.offsetHeight;
// //       const pdfHeight = (nodeHeight * pdfWidth) / nodeWidth;

// //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //       pdf.save(`Invoice_${selectedInvoice.invoiceNo}.pdf`);
      
// //     } catch (error) {
// //       console.error("Failed to generate PDF:", error);
// //       alert("There was an error generating the PDF.");
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   // Securely log out and redirect to "/"
// //   const handleLogout = async () => {
// //     await signOut({ callbackUrl: '/' });
// //   };

// //   return (
// //     <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
// //       {/* ==================== SIDEBAR ==================== */}
// //       <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} bg-indigo-900 text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 overflow-hidden shadow-xl z-20`}>
// //         {/* Sidebar content */}
// //         <div className="h-16 flex items-center justify-center border-b border-indigo-800 px-4">
// //           <FileText className="w-6 h-6 text-indigo-400 shrink-0" />
// //           {isSidebarOpen && <span className="ml-3 font-bold text-lg tracking-wide whitespace-nowrap">GST Pro</span>}
// //         </div>
// //         <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
// //           <Link href="/dashboard" className="flex items-center px-3 py-2.5 bg-indigo-800 rounded-lg text-white group transition-colors">
// //             <LayoutDashboard className="w-5 h-5 shrink-0 text-indigo-300" />
// //             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Dashboard</span>}
// //           </Link>
// //           <Link href="/billing" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
// //             <FileText className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
// //             {isSidebarOpen && <span className="ml-3 font-medium text-sm">New Invoice</span>}
// //           </Link>
// //           <Link href="/customers" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
// //             <Users className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
// //             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Customers</span>}
// //           </Link>
// //           <Link href="/settings" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
// //             <Settings className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
// //             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Settings</span>}
// //           </Link>
// //         </nav>
// //         <div className="p-4 border-t border-indigo-800">
// //           <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 hover:bg-red-500/20 rounded-lg text-indigo-100 hover:text-red-100 transition-colors group">
// //             <LogOut className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-red-400" />
// //             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Logout</span>}
// //           </button>
// //         </div>
// //       </aside>

// //       {/* ==================== MAIN CONTENT WRAPPER ==================== */}
// //       <div className="flex flex-col flex-1 overflow-hidden w-full">
// //         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 shrink-0">
// //           <div className="flex items-center">
// //             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
// //               <Menu className="w-5 h-5" />
// //             </button>
// //             <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">Invoices</h2>
// //           </div>
// //           <div className="flex items-center space-x-3 sm:space-x-5">
// //             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
// //               <Bell className="w-5 h-5" />
// //               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
// //             </button>
// //             <div className="h-8 w-px bg-slate-200 mx-2"></div>
// //             <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
// //               <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
// //                 <User className="w-4 h-4" />
// //               </div>
// //               <div className="hidden md:block text-left">
// //                 <p className="text-sm font-medium text-slate-700 leading-tight">Admin User</p>
// //                 <p className="text-[10px] text-slate-500 font-medium">AARADHYA ENT.</p>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
// //           <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //             <div>
// //               <h1 className="text-2xl font-bold text-indigo-900">Invoice History</h1>
// //               <p className="text-slate-500 text-sm mt-1">Manage and view your generated bills and line items.</p>
// //             </div>
// //           </div>

// //           <div className="max-w-7xl mx-auto">
// //             <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
// //               <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
// //                 <div className="relative w-full sm:w-72">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <Search className="h-4 w-4 text-slate-400" />
// //                   </div>
// //                   <input
// //                     type="text"
// //                     className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
// //                     placeholder="Search by client or invoice no..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="overflow-x-auto">
// //                 <table className="w-full text-left border-collapse">
// //                   <thead>
// //                     <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
// //                       <th className="p-4 font-semibold border-b border-slate-200">Inv No.</th>
// //                       <th className="p-4 font-semibold border-b border-slate-200">Date</th>
// //                       <th className="p-4 font-semibold border-b border-slate-200">Client Details</th>
// //                       <th className="p-4 font-semibold border-b border-slate-200">Amount</th>
// //                       <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-100 text-sm">
// //                     {/* LOADING STATE */}
// //                     {isLoading && (
// //                       <tr>
// //                         <td colSpan={5} className="p-8 text-center text-slate-500">
// //                           <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
// //                           Loading invoices from database...
// //                         </td>
// //                       </tr>
// //                     )}

// //                     {/* EMPTY STATE */}
// //                     {!isLoading && filteredInvoices.length === 0 && (
// //                       <tr>
// //                         <td colSpan={5} className="p-8 text-center text-slate-500">
// //                           No invoices found.
// //                         </td>
// //                       </tr>
// //                     )}

// //                     {/* DATA ROWS */}
// //                     {!isLoading && filteredInvoices.map((inv) => (
// //                       <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
// //                         <td className="p-4 font-bold text-indigo-900">#{inv.invoiceNo}</td>
// //                         <td className="p-4 text-slate-500">{new Date(inv.date).toLocaleDateString('en-GB')}</td>
// //                         <td className="p-4">
// //                           <p className="font-semibold text-slate-800">{inv.customerName}</p>
// //                           <p className="text-xs text-slate-500 flex items-center mt-0.5">
// //                             <MapPin className="w-3 h-3 mr-1 shrink-0" /> <span className="truncate max-w-50">{inv.customerAddress}</span>
// //                           </p>
// //                         </td>
// //                         <td className="p-4 font-bold text-slate-800">₹{inv.totalAmount?.toLocaleString('en-IN') || '0'}</td>
// //                         <td className="p-4 flex justify-end space-x-2">
// //                           <button 
// //                             onClick={() => setSelectedInvoice(inv)}
// //                             className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors text-xs font-medium border border-indigo-100"
// //                           >
// //                             <ListIcon className="w-3.5 h-3.5 mr-1.5" /> Items
// //                           </button>
// //                           <button 
// //                             onClick={() => {
// //                               setSelectedInvoice(inv);
// //                               setTimeout(handleDownloadPDF, 200);
// //                             }}
// //                             className="flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors text-xs font-medium border border-slate-200"
// //                           >
// //                             <Printer className="w-3.5 h-3.5 mr-1.5" /> PDF
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </div>

// //       {/* ==================== INVOICE ITEMS MODAL ==================== */}
// //       {selectedInvoice && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
// //           <div ref={invoiceRef} className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
// //             {/* Modal Header */}
// //             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
// //               <div>
// //                 <h2 className="text-lg font-bold text-slate-800">Invoice #{selectedInvoice.invoiceNo} Items</h2>
// //                 <p className="text-sm text-slate-500">{selectedInvoice.customerName}</p>
// //               </div>
// //               <button 
// //                 data-hide-on-print="true"
// //                 onClick={() => setSelectedInvoice(null)}
// //                 className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>

// //             {/* Modal Body (Items Table) */}
// //             <div className="p-6 overflow-y-auto">
// //               <div className="mb-6 pb-6 border-b border-slate-200">
// //                  <h1 className="text-2xl font-bold text-indigo-900">{selectedInvoice.companyName}</h1>
// //                  <p className="text-sm text-slate-600 mt-1">Work Order: {selectedInvoice.workOrder}</p>
// //                  <p className="text-sm text-slate-600">Date: {new Date(selectedInvoice.date).toLocaleDateString('en-GB')}</p>
// //               </div>

// //               <div className="border border-slate-200 rounded-lg overflow-hidden">
// //                 <table className="w-full text-left border-collapse text-sm">
// //                   <thead>
// //                     <tr className="bg-indigo-50 text-indigo-900 border-b border-slate-200">
// //                       <th className="p-3 font-semibold">Description</th>
// //                       <th className="p-3 font-semibold text-center w-20">Qty</th>
// //                       <th className="p-3 font-semibold text-right w-24">Rate (₹)</th>
// //                       <th className="p-3 font-semibold text-center w-20">GST</th>
// //                       <th className="p-3 font-semibold text-right w-28">Total (₹)</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-100">
// //                     {selectedInvoice.items?.map((item: any) => {
// //                       if (item.isHeading) {
// //                         return (
// //                           <tr key={item.id} className="bg-slate-50">
// //                             <td colSpan={5} className="p-3 font-bold text-slate-800 border-l-4 border-indigo-500">
// //                               {item.description}
// //                             </td>
// //                           </tr>
// //                         );
// //                       }
                      
// //                       const unitRate = item.qty * item.rate;
// //                       const gstAmt = (unitRate * item.gstRate) / 100;
// //                       const total = unitRate + gstAmt;

// //                       return (
// //                         <tr key={item.id} className="hover:bg-slate-50/50">
// //                           <td className="p-3 text-slate-700">{item.description}</td>
// //                           <td className="p-3 text-center text-slate-600">{item.qty}</td>
// //                           <td className="p-3 text-right text-slate-600">{item.rate.toFixed(2)}</td>
// //                           <td className="p-3 text-center text-slate-500 text-xs">{item.gstRate}%</td>
// //                           <td className="p-3 text-right font-medium text-slate-800">{total.toFixed(2)}</td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
              
// //               <div className="mt-4 flex justify-end">
// //                 <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 min-w-50">
// //                   <p className="flex justify-between text-sm text-slate-600 mb-1">
// //                     <span>Subtotal:</span>
// //                     <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
// //                   </p>
// //                   <p className="flex justify-between font-bold text-indigo-900 border-t border-indigo-200 pt-2 mt-2">
// //                     <span>Grand Total:</span>
// //                     <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Modal Footer */}
// //             <div data-hide-on-print="true" className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
// //               <span className="text-slate-500 text-sm">Review details before downloading.</span>
// //               <button 
// //                 onClick={handleDownloadPDF}
// //                 disabled={isGenerating}
// //                 className="flex items-center px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition-colors font-medium shadow-sm"
// //               >
// //                 {isGenerating ? (
// //                   <span className="animate-pulse">Generating...</span>
// //                 ) : (
// //                   <>
// //                     <Download className="w-4 h-4 mr-2" /> Download Full PDF
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// // app/dashboard/page.tsx (or layout)

// "use client";

// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { signOut } from 'next-auth/react'; 
// import { 
//   FileText, Download, List as ListIcon, X, Search,
//   MapPin, Printer, LayoutDashboard, Users, Settings,
//   LogOut, Menu, Bell, User, Loader2
// } from 'lucide-react';

// export default function DashboardLayout() {
//   const [invoices, setInvoices] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);
  
//   const invoiceRef = useRef<HTMLDivElement>(null);

//   // Fetch data from your Neon DB via API
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('/api/invoices');
//         const data = await response.json();
        
//         if (data.success) {
//           setInvoices(data.invoices);
//         } else {
//           console.error("Failed to fetch invoices:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching invoices:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   const filteredInvoices = invoices.filter(inv => 
//     (inv.customerName?.toLowerCase().includes(searchTerm.toLowerCase())) || 
//     (inv.invoiceNo?.toString().includes(searchTerm))
//   );

//   const handleDownloadPDF = async () => {
//     if (!invoiceRef.current || !selectedInvoice) return;
//     try {
//       setIsGenerating(true);
//       const htmlToImage = await import('html-to-image');
//       const jsPDF = (await import('jspdf')).default;
      
//       const imgData = await htmlToImage.toPng(invoiceRef.current, {
//         pixelRatio: 2, 
//         backgroundColor: '#ffffff',
//         filter: (node) => {
//           if (node instanceof HTMLElement) {
//             return node.getAttribute('data-hide-on-print') !== 'true';
//           }
//           return true;
//         }
//       });

//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const nodeWidth = invoiceRef.current.offsetWidth;
//       const nodeHeight = invoiceRef.current.offsetHeight;
//       const pdfHeight = (nodeHeight * pdfWidth) / nodeWidth;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`Invoice_${selectedInvoice.invoiceNo}.pdf`);
      
//     } catch (error) {
//       console.error("Failed to generate PDF:", error);
//       alert("There was an error generating the PDF.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Securely log out and redirect to "/"
//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/' });
//   };

//   return (
//     <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
//       {/* ==================== SIDEBAR ==================== */}
//       <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} bg-indigo-900 text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 overflow-hidden shadow-xl z-20`}>
//         {/* Sidebar content */}
//         <div className="h-16 flex items-center justify-center border-b border-indigo-800 px-4">
//           <FileText className="w-6 h-6 text-indigo-400 shrink-0" />
//           {isSidebarOpen && <span className="ml-3 font-bold text-lg tracking-wide whitespace-nowrap">GST Pro</span>}
//         </div>
//         <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
//           <Link href="/dashboard" className="flex items-center px-3 py-2.5 bg-indigo-800 rounded-lg text-white group transition-colors">
//             <LayoutDashboard className="w-5 h-5 shrink-0 text-indigo-300" />
//             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Dashboard</span>}
//           </Link>
//           <Link href="/dashboard/monthly" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
//             <FileText className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
//             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Monthly Reports</span>}
//           </Link>
//           <Link href="/customers" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
//             <Users className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
//             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Customers</span>}
//           </Link>
//           <Link href="/settings" className="flex items-center px-3 py-2.5 hover:bg-indigo-800/50 rounded-lg text-indigo-100 group transition-colors">
//             <Settings className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-indigo-300" />
//             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Settings</span>}
//           </Link>
//         </nav>
//         <div className="p-4 border-t border-indigo-800">
//           <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 hover:bg-red-500/20 rounded-lg text-indigo-100 hover:text-red-100 transition-colors group">
//             <LogOut className="w-5 h-5 shrink-0 text-indigo-400 group-hover:text-red-400" />
//             {isSidebarOpen && <span className="ml-3 font-medium text-sm">Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* ==================== MAIN CONTENT WRAPPER ==================== */}
//       <div className="flex flex-col flex-1 overflow-hidden w-full">
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 shrink-0">
//           <div className="flex items-center">
//             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-4 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
//               <Menu className="w-5 h-5" />
//             </button>
//             <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">Invoices</h2>
//           </div>
//           <div className="flex items-center space-x-3 sm:space-x-5">
//             <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
//             </button>
//             <div className="h-8 w-px bg-slate-200 mx-2"></div>
//             <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
//               <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4" />
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className="text-sm font-medium text-slate-700 leading-tight">Admin User</p>
//                 <p className="text-[10px] text-slate-500 font-medium">AARADHYA ENT.</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
//           <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-indigo-900">Invoice History</h1>
//               <p className="text-slate-500 text-sm mt-1">Manage and view your generated bills and line items.</p>
//             </div>
//           </div>

//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//               <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
//                 <div className="relative w-full sm:w-72">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-4 w-4 text-slate-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
//                     placeholder="Search by client or invoice no..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
//                       <th className="p-4 font-semibold border-b border-slate-200">Inv No.</th>
//                       <th className="p-4 font-semibold border-b border-slate-200">Date</th>
//                       <th className="p-4 font-semibold border-b border-slate-200">Client Details</th>
//                       <th className="p-4 font-semibold border-b border-slate-200">Amount</th>
//                       <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100 text-sm">
//                     {/* LOADING STATE */}
//                     {isLoading && (
//                       <tr>
//                         <td colSpan={5} className="p-8 text-center text-slate-500">
//                           <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
//                           Loading invoices from database...
//                         </td>
//                       </tr>
//                     )}

//                     {/* EMPTY STATE */}
//                     {!isLoading && filteredInvoices.length === 0 && (
//                       <tr>
//                         <td colSpan={5} className="p-8 text-center text-slate-500">
//                           No invoices found.
//                         </td>
//                       </tr>
//                     )}

//                     {/* DATA ROWS */}
//                     {!isLoading && filteredInvoices.map((inv) => (
//                       <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
//                         <td className="p-4 font-bold text-indigo-900">#{inv.invoiceNo}</td>
//                         <td className="p-4 text-slate-500">{new Date(inv.date).toLocaleDateString('en-GB')}</td>
//                         <td className="p-4">
//                           <p className="font-semibold text-slate-800">{inv.customerName}</p>
//                           <p className="text-xs text-slate-500 flex items-center mt-0.5">
//                             <MapPin className="w-3 h-3 mr-1 shrink-0" /> <span className="truncate max-w-50">{inv.customerAddress}</span>
//                           </p>
//                         </td>
//                         <td className="p-4 font-bold text-slate-800">₹{inv.totalAmount?.toLocaleString('en-IN') || '0'}</td>
//                         <td className="p-4 flex justify-end space-x-2">
//                           <button 
//                             onClick={() => setSelectedInvoice(inv)}
//                             className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors text-xs font-medium border border-indigo-100"
//                           >
//                             <ListIcon className="w-3.5 h-3.5 mr-1.5" /> Items
//                           </button>
//                           <button 
//                             onClick={() => {
//                               setSelectedInvoice(inv);
//                               setTimeout(handleDownloadPDF, 200);
//                             }}
//                             className="flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors text-xs font-medium border border-slate-200"
//                           >
//                             <Printer className="w-3.5 h-3.5 mr-1.5" /> PDF
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* ==================== INVOICE ITEMS MODAL ==================== */}
//       {selectedInvoice && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
//           <div ref={invoiceRef} className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
//             {/* Modal Header */}
//             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-800">Invoice #{selectedInvoice.invoiceNo} Items</h2>
//                 <p className="text-sm text-slate-500">{selectedInvoice.customerName}</p>
//               </div>
//               <button 
//                 data-hide-on-print="true"
//                 onClick={() => setSelectedInvoice(null)}
//                 className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body (Items Table) */}
//             <div className="p-6 overflow-y-auto">
//               <div className="mb-6 pb-6 border-b border-slate-200">
//                  <h1 className="text-2xl font-bold text-indigo-900">{selectedInvoice.companyName}</h1>
//                  <p className="text-sm text-slate-600 mt-1">Work Order: {selectedInvoice.workOrder}</p>
//                  <p className="text-sm text-slate-600">Date: {new Date(selectedInvoice.date).toLocaleDateString('en-GB')}</p>
//               </div>

//               <div className="border border-slate-200 rounded-lg overflow-hidden">
//                 <table className="w-full text-left border-collapse text-sm">
//                   <thead>
//                     <tr className="bg-indigo-50 text-indigo-900 border-b border-slate-200">
//                       <th className="p-3 font-semibold">Description</th>
//                       <th className="p-3 font-semibold text-center w-16">Qty</th>
//                       <th className="p-3 font-semibold text-right w-24">Rate (₹)</th>
//                       <th className="p-3 font-semibold text-center w-24">SGST</th>
//                       <th className="p-3 font-semibold text-center w-24">CGST</th>
//                       <th className="p-3 font-semibold text-right w-28">Total (₹)</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {selectedInvoice.items?.map((item: any) => {
//                       if (item.isHeading) {
//                         return (
//                           <tr key={item.id} className="bg-slate-50">
//                             {/* Updated colSpan from 5 to 6 to account for the new column */}
//                             <td colSpan={6} className="p-3 font-bold text-slate-800 border-l-4 border-indigo-500">
//                               {item.description}
//                             </td>
//                           </tr>
//                         );
//                       }
                      
//                       const unitRate = item.qty * item.rate;
//                       const gstAmt = (unitRate * item.gstRate) / 100;
//                       const total = unitRate + gstAmt;
//                       const halfGstAmt = gstAmt / 2;
//                       const halfGstRate = item.gstRate / 2;

//                       return (
//                         <tr key={item.id} className="hover:bg-slate-50/50">
//                           <td className="p-3 text-slate-700">{item.description}</td>
//                           <td className="p-3 text-center text-slate-600">{item.qty}</td>
//                           <td className="p-3 text-right text-slate-600">{Number(item.rate).toFixed(2)}</td>
//                           <td className="p-3 text-center text-slate-600">
//                             <div className="flex flex-col items-center justify-center">
//                               <span>₹{halfGstAmt.toFixed(2)}</span>
//                               <span className="text-[10px] text-slate-400">({halfGstRate}%)</span>
//                             </div>
//                           </td>
//                           <td className="p-3 text-center text-slate-600">
//                             <div className="flex flex-col items-center justify-center">
//                               <span>₹{halfGstAmt.toFixed(2)}</span>
//                               <span className="text-[10px] text-slate-400">({halfGstRate}%)</span>
//                             </div>
//                           </td>
//                           <td className="p-3 text-right font-medium text-slate-800">{total.toFixed(2)}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="mt-4 flex justify-end">
//                 <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 min-w-50">
//                   <p className="flex justify-between text-sm text-slate-600 mb-1">
//                     <span>Subtotal:</span>
//                     <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
//                   </p>
//                   <p className="flex justify-between font-bold text-indigo-900 border-t border-indigo-200 pt-2 mt-2">
//                     <span>Grand Total:</span>
//                     <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div data-hide-on-print="true" className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
//               <span className="text-slate-500 text-sm">Review details before downloading.</span>
//               <button 
//                 onClick={handleDownloadPDF}
//                 disabled={isGenerating}
//                 className="flex items-center px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition-colors font-medium shadow-sm"
//               >
//                 {isGenerating ? (
//                   <span className="animate-pulse">Generating...</span>
//                 ) : (
//                   <>
//                     <Download className="w-4 h-4 mr-2" /> Download Full PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, List as ListIcon, X, Search,
  MapPin, Printer, Loader2
} from 'lucide-react';

export default function DashboardLayout() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Fetch data from your Neon DB via API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/invoices');
        const data = await response.json();
        
        if (data.success) {
          setInvoices(data.invoices);
        } else {
          console.error("Failed to fetch invoices:", data.error);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const filteredInvoices = invoices.filter(inv => 
    (inv.customerName?.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (inv.invoiceNo?.toString().includes(searchTerm))
  );

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current || !selectedInvoice) return;
    try {
      setIsGenerating(true);
      const htmlToImage = await import('html-to-image');
      const jsPDF = (await import('jspdf')).default;
      
      const imgData = await htmlToImage.toPng(invoiceRef.current, {
        pixelRatio: 2, 
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node instanceof HTMLElement) {
            return node.getAttribute('data-hide-on-print') !== 'true';
          }
          return true;
        }
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const nodeWidth = invoiceRef.current.offsetWidth;
      const nodeHeight = invoiceRef.current.offsetHeight;
      const pdfHeight = (nodeHeight * pdfWidth) / nodeWidth;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${selectedInvoice.invoiceNo}.pdf`);
      
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("There was an error generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ==================== MAIN CONTENT ==================== */}
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-indigo-900">Invoice History</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and view your generated bills and line items.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
              <div className="relative w-full sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                  placeholder="Search by client or invoice no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold border-b border-slate-200">Inv No.</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Client Details</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Amount</th>
                    <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {isLoading && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
                        Loading invoices from database...
                      </td>
                    </tr>
                  )}

                  {!isLoading && filteredInvoices.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        No invoices found.
                      </td>
                    </tr>
                  )}

                  {!isLoading && filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-indigo-900">#{inv.invoiceNo}</td>
                      <td className="p-4 text-slate-500">{new Date(inv.date).toLocaleDateString('en-GB')}</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{inv.customerName}</p>
                        <p className="text-xs text-slate-500 flex items-center mt-0.5">
                          <MapPin className="w-3 h-3 mr-1 shrink-0" /> <span className="truncate max-w-50">{inv.customerAddress}</span>
                        </p>
                      </td>
                      <td className="p-4 font-bold text-slate-800">₹{inv.totalAmount?.toLocaleString('en-IN') || '0'}</td>
                      <td className="p-4 flex justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedInvoice(inv)}
                          className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors text-xs font-medium border border-indigo-100"
                        >
                          <ListIcon className="w-3.5 h-3.5 mr-1.5" /> Items
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setTimeout(handleDownloadPDF, 200);
                          }}
                          className="flex items-center px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors text-xs font-medium border border-slate-200"
                        >
                          <Printer className="w-3.5 h-3.5 mr-1.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ==================== INVOICE ITEMS MODAL ==================== */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div ref={invoiceRef} className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Invoice #{selectedInvoice.invoiceNo} Items</h2>
                <p className="text-sm text-slate-500">{selectedInvoice.customerName}</p>
              </div>
              <button 
                data-hide-on-print="true"
                onClick={() => setSelectedInvoice(null)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="mb-6 pb-6 border-b border-slate-200">
                 <h1 className="text-2xl font-bold text-indigo-900">{selectedInvoice.companyName}</h1>
                 <p className="text-sm text-slate-600 mt-1">Work Order: {selectedInvoice.workOrder}</p>
                 <p className="text-sm text-slate-600">Date: {new Date(selectedInvoice.date).toLocaleDateString('en-GB')}</p>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-indigo-50 text-indigo-900 border-b border-slate-200">
                      <th className="p-3 font-semibold">Description</th>
                      <th className="p-3 font-semibold text-center w-16">Qty</th>
                      <th className="p-3 font-semibold text-right w-24">Rate (₹)</th>
                      <th className="p-3 font-semibold text-center w-24">SGST</th>
                      <th className="p-3 font-semibold text-center w-24">CGST</th>
                      <th className="p-3 font-semibold text-right w-28">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoice.items?.map((item: any) => {
                      if (item.isHeading) {
                        return (
                          <tr key={item.id} className="bg-slate-50">
                            <td colSpan={6} className="p-3 font-bold text-slate-800 border-l-4 border-indigo-500">
                              {item.description}
                            </td>
                          </tr>
                        );
                      }
                      
                      const unitRate = item.qty * item.rate;
                      const gstAmt = (unitRate * item.gstRate) / 100;
                      const total = unitRate + gstAmt;
                      const halfGstAmt = gstAmt / 2;
                      const halfGstRate = item.gstRate / 2;

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="p-3 text-slate-700">{item.description}</td>
                          <td className="p-3 text-center text-slate-600">{item.qty}</td>
                          <td className="p-3 text-right text-slate-600">{Number(item.rate).toFixed(2)}</td>
                          <td className="p-3 text-center text-slate-600">
                            <div className="flex flex-col items-center justify-center">
                              <span>₹{halfGstAmt.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400">({halfGstRate}%)</span>
                            </div>
                          </td>
                          <td className="p-3 text-center text-slate-600">
                            <div className="flex flex-col items-center justify-center">
                              <span>₹{halfGstAmt.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-400">({halfGstRate}%)</span>
                            </div>
                          </td>
                          <td className="p-3 text-right font-medium text-slate-800">{total.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 min-w-50">
                  <p className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
                  </p>
                  <p className="flex justify-between font-bold text-indigo-900 border-t border-indigo-200 pt-2 mt-2">
                    <span>Grand Total:</span>
                    <span>₹{selectedInvoice.totalAmount?.toLocaleString('en-IN') || '0'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div data-hide-on-print="true" className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
              <span className="text-slate-500 text-sm">Review details before downloading.</span>
              <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="flex items-center px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition-colors font-medium shadow-sm"
              >
                {isGenerating ? (
                  <span className="animate-pulse">Generating...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" /> Download Full PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}