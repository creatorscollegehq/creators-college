#!/usr/bin/env node
/**
 * Course access tools.
 *
 * Usage:
 *   node scripts/access.mjs list
 *   node scripts/access.mjs grant <orderId> <phone> <email> [name] [days]
 *   node scripts/access.mjs revoke <orderId>
 *   node scripts/access.mjs restore <orderId>
 *
 * Use grant for manual/UPI students. They sign in with Google at /learn/login:
 * the Gmail must match <email>, and access opens automatically.
 */
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match || line.trim().startsWith("#")) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (process.env[match[1]] === undefined) process.env[match[1]] = value;
    }
  }
}

loadEnv();

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const [command, ...args] = process.argv.slice(2);

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(-10);
}

async function list() {
  const { data, error } = await supabase
    .from("enrollments")
    .select("order_id, name, phone, email, user_id, status, provider, amount, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;
  if (!data?.length) {
    console.log("No enrollments yet.");
    return;
  }

  console.table(
    data.map((row) => ({
      order_id: row.order_id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      google_linked: row.user_id ? "yes" : "no",
      status: row.status,
      provider: row.provider,
      amount: row.amount,
    }))
  );
}

async function grant() {
  const [orderId, rawPhone, rawEmail, name = "Student", days] = args;
  const phone = normalizePhone(rawPhone);
  const email = String(rawEmail || "").trim().toLowerCase();

  if (!orderId || phone.length !== 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error(
      "Usage: node scripts/access.mjs grant <orderId> <10-digit phone> <student email> [name] [days]"
    );
    process.exit(1);
  }

  const expiresAt = days
    ? new Date(Date.now() + Number(days) * 86400000).toISOString()
    : null;

  const { data, error } = await supabase
    .from("enrollments")
    .upsert(
      {
        order_id: orderId.trim(),
        name: name.trim() || "Student",
        phone,
        email,
        course_slug: "content-creation",
        status: "active",
        provider: "manual",
        amount: 5000,
        currency: "INR",
        expires_at: expiresAt,
      },
      { onConflict: "order_id" }
    )
    .select("*")
    .single();

  if (error) throw error;
  console.log("Enrollment granted.");
  console.log(`Order ID : ${data.order_id}`);
  console.log(`Phone    : ${data.phone}`);
  console.log(`Email    : ${data.email}`);
  console.log(`Expires  : ${data.expires_at || "never"}`);
  console.log("");
  console.log("Student instructions:");
  console.log(`  1. Open /learn/login and continue with Google using ${data.email}.`);
  console.log("  2. Access opens automatically when the Gmail matches.");
  console.log("  3. If they use a different Gmail, update the enrollment email or contact support.");
}

async function setStatus(status) {
  const [orderId] = args;
  if (!orderId) {
    console.error(`Usage: node scripts/access.mjs ${command} <orderId>`);
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("enrollments")
    .update({ status })
    .eq("order_id", orderId.trim())
    .select("order_id, status")
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    console.error("No enrollment found for that order ID.");
    process.exit(1);
  }
  console.log(`${data.order_id} is now ${data.status}.`);
}

try {
  if (command === "list") {
    await list();
  } else if (command === "grant") {
    await grant();
  } else if (command === "revoke") {
    await setStatus("revoked");
  } else if (command === "restore") {
    await setStatus("active");
  } else {
    console.log(`Usage:
  node scripts/access.mjs list
  node scripts/access.mjs grant <orderId> <phone> <email> [name] [days]
  node scripts/access.mjs revoke <orderId>
  node scripts/access.mjs restore <orderId>`);
    process.exit(command ? 1 : 0);
  }
} catch (error) {
  console.error("Command failed:", error.message || error);
  process.exit(1);
}
