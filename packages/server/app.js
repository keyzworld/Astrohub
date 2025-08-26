import express from "express";
import dotenv from "dotenv";
import connectDB from "./confiq/db.js";
import gameCategoryRoutes from "./routes/gameCategoryRoutes.js";
import usersRoutes from "./routes/usersRoutes.js"
import gameRoutes from "./routes/gameRoutes.js"


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.use("/api", usersRoutes); // Use users.js router for /api
app.use("/api/gamecategories", gameCategoryRoutes);
app.use('/api/game', gameRoutes)