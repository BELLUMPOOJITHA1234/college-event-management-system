import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // --- BACKEND API ROUTES ---
  // Example API to fetch events (demonstrating backend logic)
  app.get("/api/events", (req, res) => {
    const events = [
      { id: 1, name: "Thunder Thursday", category: "Cultural", description: "Weekly talent showcase." },
      { id: 2, name: "Hackathon", category: "Technical", description: "24-hour coding challenge." },
      { id: 3, name: "Blood Camp", category: "Camp", description: "Annual campus drive." }
    ];
    res.json(events);
  });

  // Example API for registration submission
  app.post("/api/register", (req, res) => {
    const { name, rollNumber, eventName } = req.body;
    console.log(`New registration: ${name} (${rollNumber}) for ${eventName}`);
    res.status(201).json({ message: "Registration successful!", data: req.body });
  });

  // --- FRONTEND INTEGRATION ---
  if (process.env.NODE_ENV !== "production") {
    // Development: Use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from dist
    app.use(express.static(path.resolve(__dirname, "dist")));
    
    // Serve HTML files for specific routes in production
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
