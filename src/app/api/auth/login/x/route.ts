import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { hmacsign } from "oauth-sign";

function generateNonce() {
  return crypto.randomBytes(16).toString("hex");
}

function encodeForHttp(str: string) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

export async function GET() {
  const oauth_consumer_key = process.env.CONSUMER_KEY!;
  const oauth_consumer_secret = process.env.CONSUMER_SECRET!;
  const oauth_callback =
    "https://7e1a-110-235-233-173.ngrok-free.app/api/auth/callback/x"; // or your actual callback

  const oauth_nonce = generateNonce();
  const oauth_timestamp = Math.floor(Date.now() / 1000).toString();
  const oauth_signature_method = "HMAC-SHA1";
  const oauth_version = "1.0";

  const method = "POST";
  const url = "https://api.twitter.com/oauth/request_token"; // double-check domain

  const params = {
    oauth_callback,
    oauth_consumer_key,
    oauth_nonce,
    oauth_signature_method,
    oauth_timestamp,
    oauth_version,
  };

  const oauth_signature = hmacsign(
    method,
    url,
    params,
    oauth_consumer_secret, // consumer secret
    "" // token secret is blank at this stage
  );

  const authHeader =
    "OAuth " +
    Object.entries({ ...params, oauth_signature })
      .map(
        ([key, val]) =>
          `${encodeForHttp(key)}="${encodeForHttp(val.toString())}"`
      )
      .join(", ");

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: authHeader,
    },
  });

  const text = await response.text();
  const data = Object.fromEntries(new URLSearchParams(text));
  console.log("request_token response:", data);

  return NextResponse.redirect(
    `https://api.x.com/oauth/authorize?oauth_token=${data.oauth_token}`
  );
}
