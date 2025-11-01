import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useSales } from "@/context/SalesContext"
import { useProducts } from "@/context/ProductsContext"

export default function TopProducts() {
  const { sales } = useSales()
  const { products } = useProducts()

  const productSales = {}
  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      productSales[item.id] = (productSales[item.id] || 0) + item.quantity
    })
  })

  const topProducts = Object.entries(productSales)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id))
      return { name: product?.name || "Unknown", sales: qty }
    })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
      <CardContent>
        {topProducts.length > 0 ? (
          <ul className="space-y-2">
            {topProducts.map((p, i) => (
              <li key={i} className="flex justify-between">
                <span>{p.name}</span>
                <span className="font-semibold">{p.sales}</span>
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
