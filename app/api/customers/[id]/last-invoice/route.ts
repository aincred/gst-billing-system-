// app/api/customers/[id]/last-invoice/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { customers, invoices, invoiceItems } from '@/lib/schema';
import { eq, desc, InferSelectModel } from 'drizzle-orm';

type InvoiceItem = InferSelectModel<typeof invoiceItems>;

// FIX: params is now a Promise in Next.js 15
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // FIX: You MUST await params before accessing properties
    const { id } = await params; 
    const customerId = id;

    // 1. Get the customer
    const customerData = await db.select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);
    
    if (customerData.length === 0) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });
    }

    // 2. Get the latest invoice for this customer
    const lastInvoice = await db.select()
      .from(invoices)
      .where(eq(invoices.customerId, customerId))
      .orderBy(desc(invoices.createdAt))
      .limit(1);

    let items: InvoiceItem[] = []; 

    if (lastInvoice.length > 0) {
      items = await db.select()
        .from(invoiceItems)
        .where(eq(invoiceItems.invoiceId, lastInvoice[0].id));
    }

    return NextResponse.json({
      success: true,
      customer: customerData[0],
      items: items 
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}