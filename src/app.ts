import express from "express";
import calendarRoutes from "./routes/calendarRoutes";
import conversionRoutes from "./routes/conversionRoutes";

const app = express();

app.use(express.json());

// Register routes
app.use("/calendar", calendarRoutes);
app.use("/conversions", conversionRoutes);

export default app;
