import { students } from "../../../lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const code = cookieStore.get("student")?.value;

  const student = students.find((s) => s.code === code);

  if (!student) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(student);
}
