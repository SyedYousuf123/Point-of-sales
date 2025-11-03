import { useProducts } from "@/context/ProductsContext"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const ManageProducts = () => {
  const { products, deleteProduct } = useProducts()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold">
            Manage Products
          </CardTitle>
          <Button
            onClick={() => navigate("/products/add")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            + Add Product
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="p-4 sm:p-6">
          {/* ✅ Desktop & Laptop View */}
          <div className="hidden md:block overflow-x-auto">
            {products.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No products available. Add one to get started!
              </div>
            ) : (
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Stock</TableHead>
                    <TableHead className="font-semibold">Image</TableHead>
                    <TableHead className="font-semibold text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((p) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-indigo-50 transition-colors"
                    >
                      <TableCell>{p.id}</TableCell>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>₨ {p.price}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            p.stock > 5
                              ? "bg-green-100 text-green-700"
                              : p.stock > 0
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-12 w-12 rounded object-cover border"
                          />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/products/edit/${p.id}`)
                            }
                            className="hover:border-indigo-500 hover:text-indigo-600 transition"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (window.confirm("Delete this product?"))
                                deleteProduct(p.id)
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* ✅ Mobile & Tablet View (Card Layout) */}
          <div className="block md:hidden space-y-4">
            {products.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No products available. Add one to get started!
              </div>
            ) : (
              products.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image || "https://via.placeholder.com/80"}
                      alt={p.name}
                      className="h-16 w-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {p.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Price: ₨ {p.price}
                      </div>
                      <div
                        className={`text-xs font-medium mt-1 inline-block px-2 py-1 rounded ${
                          p.stock > 5
                            ? "bg-green-100 text-green-700"
                            : p.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Stock: {p.stock}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/products/edit/${p.id}`)}
                      className="hover:border-indigo-500 hover:text-indigo-600 transition"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (window.confirm("Delete this product?"))
                          deleteProduct(p.id)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProducts
