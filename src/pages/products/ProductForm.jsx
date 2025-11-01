import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ProductForm = ({ mode = "add", initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData)

  // Only update fields when switching to Add mode
  useEffect(() => {
    if (mode === "add") {
      setFormData(initialData)
    }
  }, [initialData, mode])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files && files[0] ? URL.createObjectURL(files[0]) : null,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof onSubmit === "function") {
      onSubmit(formData)
    }

    // ✅ Clear form after submit (both add & edit)
    setFormData({
      name: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    })
    e.target.reset()
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block mb-1">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1">Price</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1">Stock</label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1">Description</label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1">Image</label>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit">
              {mode === "add" ? "Add Product" : "Update Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductForm
