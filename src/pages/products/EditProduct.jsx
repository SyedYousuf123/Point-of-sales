import { useParams } from "react-router-dom"
import { useProducts } from "@/context/ProductsContext"
import ProductForm from "./ProductForm"

const EditProduct = () => {
  const { id } = useParams()              // get product id from URL
  const { products, updateProduct } = useProducts()

  // find the product by id
  const product = products.find((p) => p.id === parseInt(id))

  if (!product) return <p className="p-6">Product not found</p>

  return (
    <ProductForm 
      mode="edit" 
      initialData={product} 
      onSubmit={(updated) => updateProduct(product.id, updated)} 
    />
  )
}

export default EditProduct
