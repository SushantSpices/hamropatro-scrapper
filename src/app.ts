import express from "express";
import calendarRoutes from "./routes/calendarRoutes";

const app = express();

app.use(express.json());

// Register routes
app.use("/calendar", calendarRoutes);

export default app;
