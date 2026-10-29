import "dotenv/config";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import artworkRoutes from "./src/routes/artworkRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import carouselRoutes from "./src/routes/carouselRoutes.js";
import cors from "cors";
import { seedAdmin } from "./src/seed-admin.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://cspaceart.com.br",
      "https://www.cspaceart.com.br",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/artworks", artworkRoutes);
app.use("/carousel", carouselRoutes);
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

const PORT = process.env.PORT || 8081;

try {
  const rootDir = path.dirname(fileURLToPath(import.meta.url));
  const prismaCli = path.join(rootDir, "node_modules", "prisma", "build", "index.js");
  execSync(`${JSON.stringify(process.execPath)} ${JSON.stringify(prismaCli)} migrate deploy`, {
    cwd: rootDir,
    encoding: "utf8",
    env: {
      ...process.env,
      DATABASE_URL: (process.env.DATABASE_URL ?? "").replace(
        /@localhost(?=[:/])/g,
        "@127.0.0.1"
      ),
    },
  });
} catch (error) {
  console.error(
    "Falha ao aplicar migrations:",
    error.stderr || error.stdout || error.message
  );
}

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  seedAdmin().catch((error) => {
    console.error("Falha ao criar admin:", error);
  });
});
