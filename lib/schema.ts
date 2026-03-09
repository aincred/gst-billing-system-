import { pgTable, uuid, varchar, timestamp, boolean, integer, doublePrecision } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  gstin: varchar("gstin", { length: 50 }).notNull(),
  mobile: varchar("mobile", { length: 20 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  taxPayerType: varchar("tax_payer_type", { length: 100 }).notNull(),
  panNo: varchar("pan_no", { length: 50 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
});

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
});

export const bankAccounts = pgTable("bank_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  payId: varchar("pay_id", { length: 100 }).notNull(),
  acName: varchar("ac_name", { length: 255 }).notNull(),
  bankName: varchar("bank_name", { length: 255 }).notNull(),
  acNo: varchar("ac_no", { length: 100 }).notNull(),
  ifsc: varchar("ifsc", { length: 50 }).notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceNo: varchar("invoice_no", { length: 100 }).notNull(),
  date: timestamp("date").notNull(),
  workOrderNo: varchar("work_order_no", { length: 100 }),
  letterNo: varchar("letter_no", { length: 100 }),
  discount: doublePrecision("discount").default(0),
  companyId: uuid("company_id").references(() => companies.id).notNull(),
  customerId: uuid("customer_id").references(() => customers.id).notNull(),
  bankId: uuid("bank_id").references(() => bankAccounts.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  isHeading: boolean("is_heading").default(false).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  qty: integer("qty"),
  rate: doublePrecision("rate"),
  gstRate: doublePrecision("gst_rate"),
  invoiceId: uuid("invoice_id").references(() => invoices.id, { onDelete: "cascade" }).notNull(),
});