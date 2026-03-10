"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut // Added LogOut icon
} from 'lucide-react';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Monthly Reports', href: '/dashboard/monthly', icon: FileText },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing cookies/tokens)
    console.log("Logging out...");
    router.push('/');
  };

  return (
    <aside 
      className={`${isOpen ? 'w-72' : 'w-0 md:w-20'} 
      bg-[#2D2B83] text-white flex flex-col transition-all duration-300 
      ease-in-out shrink-0 overflow-hidden shadow-2xl h-screen sticky top-0`}
    >
      {/* Brand Logo Section */}
      <div className="h-20 flex items-center px-8 border-b border-white/10 shrink-0">
        <FileText className="w-8 h-8 text-[#A5A4FF] shrink-0" />
        {isOpen && (
          <span className="ml-4 font-bold text-2xl tracking-tight whitespace-nowrap">
            GST Pro
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 px-4 space-y-3 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center px-4 py-4 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-[#3E3BB3] text-white shadow-lg' 
                  : 'text-[#CAC9FF] hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon className={`w-6 h-6 shrink-0 ${
                isActive ? 'text-white' : 'text-[#A5A4FF] group-hover:text-white'
              }`} />
              {isOpen && (
                <span className="ml-4 font-semibold text-base">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button Section */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-4 rounded-xl transition-all group text-[#CAC9FF] hover:bg-red-500/10 hover:text-red-400`}
        >
          <LogOut className="w-6 h-6 shrink-0 text-[#A5A4FF] group-hover:text-red-400" />
          {isOpen && (
            <span className="ml-4 font-semibold text-base">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}