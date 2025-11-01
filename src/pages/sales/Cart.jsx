import React from 'react';
import { useCart } from "@/context/CartContext.jsx"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



const Cart = () => {
const { cartItems, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
     <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="flex justify-between font-semibold text-lg">
                <p>Total:</p>
                <p>${total}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Cart;
