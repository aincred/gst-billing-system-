"use client";

import React, { useState } from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';
import Header from '@/app/dashboard/components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* VIEWPORT */}
      <div className="flex flex-col flex-1 overflow-hidden w-full relative">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>

        {/* PRINT OVERLAY (Optional but helpful for billing) */}
        <style jsx global>{`
          @media print {
            aside, header { display: none !important; }
            main { padding: 0 !important; overflow: visible !important; }
          }
        `}</style>
      </div>
    </div>
  );
}