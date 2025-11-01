import React from "react"
import { useSales } from "@/context/SalesContext.jsx"
import { useCustomers } from "@/context/CustomersContext.jsx"

// shadcn components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function SalesList() {
  const { sales } = useSales()
  const { customers } = useCustomers()

  const getCustomerName = (id) => {
    if (!customers || customers.length === 0) return "Walk-in Customer"
    const customer = customers.find((c) => c.id === id)
    return customer ? customer.name : "Walk-in Customer"
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount)

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales List</CardTitle>
        </CardHeader>

        <CardContent>
          {sales.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sale ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <Badge variant="outline">{sale.id}</Badge>
                    </TableCell>
                    <TableCell>{getCustomerName(sale.customerId)}</TableCell>
                    <TableCell>{formatCurrency(sale.total)}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-sm">No sales recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
