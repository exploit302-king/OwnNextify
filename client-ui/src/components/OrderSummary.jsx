import React from "react";

const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 4.99;
  const total = subtotal + tax + shipping;

  return (
    <div>
      <div className="w-80 h-80 rounded-lg mx-10 p-6 bg-slate-300">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-t border-gray-200 mt-4 pt-4">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 mt-2 rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
