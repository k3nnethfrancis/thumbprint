// Next.js API Route for generating persona cookie
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_data, urls } = req.body;

    // Validate input
    if (!user_data || !urls) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      // Call the Python backend
      const response = await fetch(
        "http://localhost:8000/generate_persona_cookie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_data, urls }),
        }
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: "Error generating persona cookie" });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
