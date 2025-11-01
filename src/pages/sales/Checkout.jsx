import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// contexts (using @ alias; include .jsx to avoid resolver issues)
import { useCart } from "@/context/CartContext.jsx"
import { useSales } from "@/context/SalesContext.jsx"
import { useCustomers } from "@/context/CustomersContext.jsx"

// shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

export default function Checkout() {
  const navigate = useNavigate()

  // read contexts (be resilient to different names)
  const cartCtx = useCart() || {}
  const rawCartItems = cartCtx.cartItems ?? cartCtx.cart ?? []
  const clearCart = cartCtx.clearCart ?? (() => {})

  const salesCtx = useSales() || {}
  const addSale = salesCtx.addSale ?? (() => {})

  const customersCtx = useCustomers() || {}
  const customers = customersCtx.customers ?? []

  // keep selected customer as string for Select component
  const [selectedCustomer, setSelectedCustomer] = useState(
    customers.length > 0 ? String(customers[0].id) : ""
  )

  // when customers change (e.g. loaded later / new customer added), sync selection
  useEffect(() => {
    if (customers.length > 0) {
      // set to first customer only if nothing selected yet
      setSelectedCustomer((prev) => (prev ? prev : String(customers[0].id)))
    } else {
      setSelectedCustomer("")
    }
  }, [customers])

  const cartItems = Array.isArray(rawCartItems) ? rawCartItems : []

  const total = cartItems.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0),
    0
  )

  const handleCheckout = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      // UX: toast or alert
      window.alert("Cart is empty!")
      return
    }

    if (!selectedCustomer) {
      window.alert("Please select a customer before confirming.")
      return
    }

    const salePayload = {
      // don't set id here — let SalesContext create the canonical id
      customerId: Number(selectedCustomer),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
    }

    addSale(salePayload) // SalesContext should attach its own id format
    clearCart()
    window.alert("Sale completed ✅")
    navigate("/sales") // go to sales list
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Customer selector */}
          <div>
            <label className="block mb-2 text-sm font-medium">Select Customer</label>

            <Select value={selectedCustomer} onValueChange={(v) => setSelectedCustomer(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a customer" />
              </SelectTrigger>

              <SelectContent>
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name} {c.phone ? `(${c.phone})` : ""}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">No customers</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Cart preview */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                      <TableCell>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No items in cart
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
              <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            </div>
          </div>

          {/* Confirm button */}
          <div className="flex justify-end">
            <Button onClick={handleCheckout} disabled={cartItems.length === 0}>
              Confirm Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
