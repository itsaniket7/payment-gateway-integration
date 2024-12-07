const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "key_id", // Replace with your Razorpay Key ID
  key_secret: "key_secret", // Replace with your Razorpay Key Secret
});

// Route to create an order
app.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/", (req, res) => {
  console.log("Root route accessed"); // Debugging log
  res.send("Server is up and running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
