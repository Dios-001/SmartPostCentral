import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const oauth_token = searchParams.get("oauth_token");
  const oauth_verifier = searchParams.get("oauth_verifier");

  const response = await fetch("https://api.x.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      oauth_token: oauth_token!,
      oauth_verifier: oauth_verifier!,
    }),
  });

  const text = await response.text();
  const data = Object.fromEntries(new URLSearchParams(text));

  console.log("Access Token:", data);

  // You can now store data.oauth_token & data.oauth_token_secret in session/db

  return NextResponse.json({ message: "Login success!", data });
}
