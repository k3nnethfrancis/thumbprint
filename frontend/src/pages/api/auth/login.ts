// pages/api/login.js
import { serialize } from "cookie";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Server-side secret (used to sign the hash)
const SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Simulate token generation (this would typically come from a login system or API)
    const token = "user-auth-token"; // In a real app, replace with an actual token from your system

    // Step 1: Hash the token (zero-knowledge-like)
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    // Step 2: Sign the hashed token using JWT or HMAC (adds an extra layer of security)
    const signedHash = jwt.sign({ hash }, SECRET, { expiresIn: "7d" });

    // Step 3: Set the signed hash as a cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", signedHash, {
        httpOnly: true, // Secure the cookie
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
    );

    return res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
