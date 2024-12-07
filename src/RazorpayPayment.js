import React from "react";
import axios from "axios";
import loadRazorpayScript from "./loadRazorpayScript";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const orderResponse = await axios.post(
        "http://localhost:3000/create-order",
        {
          amount: 500,
          currency: "INR",
        }
      );

      const { id: order_id, currency, amount } = orderResponse.data;

      const options = {
        key: "key_id",
        amount: amount.toString(),
        currency: currency,
        name: "SAWANT Groups",
        description: "Test Transaction",
        order_id: order_id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment Successful:", response);
        },
        prefill: {
          name: "Aniket",
          email: "industry1@sawant.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Company Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed!");
    }
  };

  return (
    <div>
      <h1>Razorpay Integration</h1>
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#1E88E5", // Blue color
          color: "white", // White text
          border: "none", // Remove border
          borderRadius: "5px", // Rounded corners
          padding: "10px 20px", // Padding for size
          fontSize: "16px", // Font size
          cursor: "pointer", // Pointer cursor on hover
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
          transition: "background-color 0.3s ease", // Smooth color transition
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565C0")} // Hover effect
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1E88E5")}
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default RazorpayPayment;
