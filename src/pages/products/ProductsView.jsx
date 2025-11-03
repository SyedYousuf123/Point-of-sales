import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductsContext.jsx";
import { useCart } from "@/context/CartContext.jsx";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='140' viewBox='0 0 200 140'%3E%3Crect width='200' height='140' fill='%23f3f4f6' /%3E%3Ctext x='50%' y='50%' fill='%239ca3af' dy='.3em' font-family='Arial, Helvetica, sans-serif' font-size='14' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";

const formatCurrency = (v) =>
  typeof v === "number"
    ? `₨ ${v.toLocaleString()}`
    : `₨ ${Number(v || 0).toFixed(2)}`;

export default function ProductsView() {
  const { products } = useProducts();
  const { cartItems, addToCart, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [inputAmount, setInputAmount] = useState("");
  const [showLoyalty, setShowLoyalty] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (s, it) => s + (Number(it.price) || 0) * (it.quantity || 0),
        0
      ),
    [cartItems]
  );
  const taxRate = 0.13;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const loyaltyPoints = Math.floor(subtotal / 10);

  const handleKey = (key) => {
    if (key === "C") return setInputAmount("");
    if (key === "⌫") return setInputAmount((s) => s.slice(0, -1));
    setInputAmount((s) => (s === "0" ? String(key) : s + String(key)));
  };

  const handleAddProduct = (product) => addToCart(product);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      String(p.price).includes(searchTerm)
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty! Add some products first.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="p-3 sm:p-5 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        {/* 🛒 Left Side - Cart */}
        <div className="col-span-12 md:col-span-5 xl:col-span-4 space-y-4">
          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold">Cart</CardTitle>
              <div className="text-sm text-gray-500">
                {cartItems.length} items
              </div>
            </CardHeader>

            <CardContent>
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 border rounded-lg p-2 hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || placeholder}
                          alt={item.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-2"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          –
                        </Button>
                        <div className="text-sm font-semibold w-8 text-center">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-2"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="my-4" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({Math.round(taxRate * 100)}%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between mt-3 border-t pt-3">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-bold text-indigo-600">
                  {formatCurrency(total)}
                </div>
              </div>

              {/* 🎖️ Loyalty */}
              <div className="mt-4 p-3 border rounded bg-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Loyalty Points</div>
                    <div className="font-semibold text-lg">{loyaltyPoints}</div>
                  </div>
                  <Button size="sm" onClick={() => setShowLoyalty((s) => !s)}>
                    {showLoyalty ? "Hide" : "Show"}
                  </Button>
                </div>
                {showLoyalty && (
                  <div className="mt-2 text-sm text-gray-600">
                    Earned: <strong>{loyaltyPoints}</strong> points
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => clearCart()} variant="outline">
                  Clear Cart
                </Button>
                <Button
                  onClick={() => alert("Proceed to payment")}
                  variant="secondary"
                >
                  Payment
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
                >
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 💳 Payment Keypad */}
          <Card className="shadow-md border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Enter Amount
                </label>
                <Input value={inputAmount} readOnly />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "0",
                  ".",
                  "⌫",
                ].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    className="p-3 bg-gray-100 rounded text-lg font-medium hover:bg-gray-200 transition"
                  >
                    {k}
                  </button>
                ))}
                <button
                  onClick={() => handleKey("C")}
                  className="col-span-3 mt-2 bg-red-100 hover:bg-red-200 p-3 rounded text-red-600 font-semibold transition"
                >
                  Clear
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🛍️ Right Side - Products */}
        <div className="col-span-12 md:col-span-7 xl:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-xl font-semibold">Products</h2>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="relative border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-1 flex flex-col"
                  onClick={() => handleAddProduct(p)}
                >
                  <div className="flex-1">
                    <img
                      src={p.image || placeholder}
                      alt={p.name}
                      className="h-28 w-full object-cover rounded mb-3"
                    />
                    <div className="font-medium truncate">{p.name}</div>
                    <div className="text-sm text-gray-500">
                      {p.stock} in stock
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold text-indigo-600">
                      {formatCurrency(p.price)}
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddProduct(p);
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  {p.stock <= 2 && (
                    <Badge
                      className="absolute top-2 left-2"
                      variant="destructive"
                    >
                      Low
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
