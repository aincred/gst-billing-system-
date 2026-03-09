import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { invoices, customers, companies, invoiceItems } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    // 1. Fetch all invoices with their related company and customer
    const allInvoices = await db
      .select({
        id: invoices.id,
        invoiceNo: invoices.invoiceNo,
        date: invoices.date,
        workOrder: invoices.workOrderNo,
        customerName: customers.name,
        customerAddress: customers.address,
        companyName: companies.name,
      })
      .from(invoices)
      .leftJoin(customers, eq(invoices.customerId, customers.id))
      .leftJoin(companies, eq(invoices.companyId, companies.id))
      .orderBy(desc(invoices.date));

    // 2. Fetch items for each invoice and calculate the total amount
    const formattedInvoices = await Promise.all(
      allInvoices.map(async (inv) => {
        const items = await db
          .select()
          .from(invoiceItems)
          .where(eq(invoiceItems.invoiceId, inv.id));

        // Calculate total amount dynamically
        const totalAmount = items.reduce((acc, item) => {
          if (item.isHeading) return acc;
          const unitRate = (item.qty || 0) * (item.rate || 0);
          const gstAmt = (unitRate * (item.gstRate || 0)) / 100;
          return acc + unitRate + gstAmt;
        }, 0);

        return {
          ...inv,
          totalAmount,
          items,
        };
      })
    );

    return NextResponse.json({ success: true, invoices: formattedInvoices });
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}