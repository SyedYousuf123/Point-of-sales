import { useProducts } from "@/context/ProductsContext"
import ProductForm from "./ProductForm"

const AddProduct = () => {
  const { addProduct } = useProducts()

  const handleAdd = (product) => {
    if (typeof addProduct === "function") {
      addProduct(product)
    } else {
      console.error("addProduct is not a function:", addProduct)
    }
  }

  return (
    <ProductForm 
      mode="add"
      initialData={{ name: "", price: "", stock: "", description: "", image: null }}
      onSubmit={handleAdd}
    />
  )
}

export default AddProduct;
