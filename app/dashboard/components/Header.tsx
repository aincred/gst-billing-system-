"use client";

import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden lg:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="bg-transparent border-none text-sm outline-none w-48 text-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-5">
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin</p>
            <p className="text-[10px] text-indigo-600 font-bold uppercase">AARADHYA ENT.</p>
          </div>
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md font-bold text-sm">
            HB
          </div>
        </div>
      </div>
    </header>
  );
}