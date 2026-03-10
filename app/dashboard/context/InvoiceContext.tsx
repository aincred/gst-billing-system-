"use client";
import React, { createContext, useContext, useState } from 'react';

const InvoiceContext = createContext<any>(null);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('edit');
  
  // Define the reset logic here
  const handleCreateNew = () => {
    // You can add logic here to clear local storage or global state
    console.log("Creating new invoice...");
    setActiveTab('edit');
    window.location.reload(); // Simple way to reset all states for now
  };

  return (
    <InvoiceContext.Provider value={{ activeTab, setActiveTab, handleCreateNew }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export const useInvoice = () => useContext(InvoiceContext);