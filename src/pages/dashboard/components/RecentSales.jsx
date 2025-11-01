import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useSales } from "@/context/SalesContext"
import { useCustomers } from "@/context/CustomersContext"

export default function RecentSales() {
  const { sales } = useSales()
  const { customers } = useCustomers()

  const getCustomerName = (id) => {
    const customer = customers.find((c) => c.id === id)
    return customer ? customer.name : "Walk-in Customer"
  }

  const recentSales = [...sales].slice(-5).reverse()

  return (
    <Card>
      <CardHeader><CardTitle>Recent Sales</CardTitle></CardHeader>
      <CardContent>
        {recentSales.length > 0 ? (
          <ul className="space-y-2">
            {recentSales.map((sale) => (
              <li key={sale.id} className="flex justify-between border-b pb-2">
                <span>{getCustomerName(sale.customerId)}</span>
                <span className="font-semibold">₨ {sale.total.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No sales yet</p>
        )}
      </CardContent>
    </Card>
  )
}
