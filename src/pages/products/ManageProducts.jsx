import { useProducts } from "@/context/ProductsContext"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ManageProducts = () => {
  const { products, deleteProduct } = useProducts()
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Manage Products</CardTitle>
          <Button onClick={() => navigate("/products/add")}>+ Add Product</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    {p.image ? <img src={p.image} alt="" className="h-12" /> : "—"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {/* Navigate to edit page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/products/edit/${p.id}`)}
                    >
                      Edit
                    </Button>
                    {/* Delete product */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProducts
