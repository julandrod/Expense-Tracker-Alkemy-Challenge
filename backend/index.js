import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import routeNotFoundMiddleware from "./middlewares/routeNotFound.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

// API routes
import authRoutes from "./routes/auth.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js"

// API configuration
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Expense Tracker - Alkemy Challenge API");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionsRoutes);

// Error handler middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
