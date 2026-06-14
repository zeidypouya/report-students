import { students } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { code, password } = await req.json();

  const student = students.find(
    (s) => s.code === code && s.password === password
  );

  if (!student) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("student", student.code, { httpOnly: true });

  return response;
}
