"use server";
import client from "./mongodb";

export async function sendToWaitlist(formdata: FormData) {
  try {
    const email = formdata.get("email");
    const source = "macbook";
    if (!email || typeof email !== "string") {
      throw new Error("Invalid or missing email");
    }

    const database = client.db("smartpostcentral");
    const collection = database.collection("waitlist");

    await collection.insertOne({ email, source });

    // ✅ Return a simple plain object
    return { success: true };
  } catch (e) {
    console.error("Error inserting email to waitlist:", e);
    return { success: false, error: e.message };
  }
}
