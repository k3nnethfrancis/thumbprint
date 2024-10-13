import jwt from "jsonwebtoken";
import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export default function handler(req, res) {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(401).json({ message: "No cookies found" });
  }

  const authToken = cookies
    .split("; ")
    .find((c) => c.startsWith("auth_token="));
  if (!authToken) {
    return res.status(401).json({ message: "Auth token not found" });
  }

  const token = authToken.split("=")[1];

  try {
    // Step 1: Verify the JWT token
    const decoded = jwt.verify(token, SECRET);

    // Step 2: Re-hash the original token (use the same logic as when you generated the token)
    // Simulate getting the original token (e.g., from a database)
    const originalToken = "user-auth-token"; // Replace with the actual token logic
    const hash = crypto
      .createHash("sha256")
      .update(originalToken)
      .digest("hex");

    // Step 3: Compare the hash
    if (hash !== decoded.hash) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(200).json({ message: "Token is valid!" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
