// app/api/invoices/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Ensure this points to where you export 'db' (e.g., '@/lib/index' or '@/lib/db')
import { companies, customers, bankAccounts, invoices, invoiceItems } from '@/lib/schema';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { company, customer, invoice, bank, items, discount } = formData;

    // 1. Insert Company (Using db.insert directly instead of tx.insert)
    const [insertedCompany] = await db.insert(companies).values({
      name: company.name,
      gstin: company.gstin,
      mobile: company.mobile,
      address: company.address,
      taxPayerType: company.taxPayerType,
      panNo: company.panNo,
      state: company.state,
    }).returning({ id: companies.id });

    // 2. Insert Customer
    const [insertedCustomer] = await db.insert(customers).values({
      name: customer.name,
      address: customer.address,
      state: customer.state,
    }).returning({ id: customers.id });

    // 3. Insert Bank
    const [insertedBank] = await db.insert(bankAccounts).values({
      payId: bank.payId,
      acName: bank.acName,
      bankName: bank.bankName,
      acNo: bank.acNo,
      ifsc: bank.ifsc,
    }).returning({ id: bankAccounts.id });

    // 4. Insert Invoice
    const [insertedInvoice] = await db.insert(invoices).values({
      invoiceNo: invoice.invoiceNo,
      date: new Date(invoice.date),
      workOrderNo: invoice.workOrderNo || null,
      letterNo: invoice.letterNo || null,
      discount: discount || 0,
      companyId: insertedCompany.id,
      customerId: insertedCustomer.id,
      bankId: insertedBank.id,
    }).returning({ id: invoices.id });

    // 5. Insert Items
    if (items && items.length > 0) {
      const itemsToInsert = items.map((item: any) => ({
        isHeading: item.isHeading,
        description: item.description,
        qty: Number(item.qty) || 0,
        rate: Number(item.rate) || 0,
        gstRate: Number(item.gstRate) || 0,
        invoiceId: insertedInvoice.id,
      }));
      await db.insert(invoiceItems).values(itemsToInsert);
    }

    return NextResponse.json({ success: true, id: insertedInvoice.id });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save invoice" }, { status: 500 });
  }
}