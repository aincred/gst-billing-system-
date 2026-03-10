import { db } from "@/lib/db";
import { customers, invoices } from "@/lib/schema"; 
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"; // Use NextRequest for compatibility

export async function GET(
  req: NextRequest, // Changed to NextRequest
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    // Await the params before accessing the id
    const resolvedParams = await params;
    const customerId = resolvedParams.id;

    const customerWithHistory = await db.query.customers.findFirst({
      where: eq(customers.id, customerId),
      with: {
        invoices: {
          with: {
            items: true,
            company: true,
            bankAccount: true,
          },
          orderBy: [desc(invoices.date)],
        },
      },
    });

    if (!customerWithHistory) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: customerWithHistory });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}