import { NextResponse } from "next/server";
import { validateWalkthrough } from "@/lib/walkthrough";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The request could not be read. Refresh the page and try again." }, { status: 400 });
  }

  const { data, errors } = validateWalkthrough((body ?? {}) as Record<string, unknown>);
  if (!data) return NextResponse.json({ errors }, { status: 422 });

  // TODO: deliver to the sales inbox or CRM. Until that is connected, requests are only written to the server log.
  console.info("[walkthrough-request]", JSON.stringify({ ...data, receivedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
