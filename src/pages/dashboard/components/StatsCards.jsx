import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, Users, Package, AlertTriangle } from "lucide-react"
import { useSales } from "@/context/SalesContext"
import { useCustomers } from "@/context/CustomersContext"
import { useProducts } from "@/context/ProductsContext"

export default function StatsCards() {
  const { sales } = useSales()
  const { customers } = useCustomers()
  const { products } = useProducts()

  const today = new Date().toLocaleDateString()
  const todaysSales = sales
    .filter((s) => new Date(s.date).toLocaleDateString() === today)
    .reduce((sum, s) => sum + s.total, 0)

  const lowStock = products.filter((p) => p.stock < 5).length

  const stats = [
    {
      title: "Today’s Sales",
      value: `₨ ${todaysSales.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Customers",
      value: customers.length,
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Products",
      value: products.length,
      icon: <Package className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
