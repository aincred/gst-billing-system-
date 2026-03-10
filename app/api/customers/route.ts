// app\api\customers\route.ts
import { db } from "@/lib/db"; // Adjust path to your Drizzle db instance
import { customers } from "@/lib/schema"; // Adjust path to your schema
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetching all columns from your customer schema
    const allCustomers = await db.select().from(customers);

    return NextResponse.json({ 
      success: true, 
      customers: allCustomers 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}