import { createContext, useContext, useState } from "react";
import laptop from "@/assets/img/laptop.avif"
import keyboard from "@/assets/img/keyboard.avif"
import monitor from "@/assets/img/monitor.avif"
import mouse from "@/assets/img/mouse.avif"
import headphone from "@/assets/img/headphone.avif"
import smartphone from "@/assets/img/smartphone.avif"
import tablet from "@/assets/img/tablet.avif"
import smartwatch from "@/assets/img/smartwatch.avif"
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
  { 
    id: 1, 
    name: "Laptop", 
    price: 1200, 
    stock: 10, 
    image: laptop, 
    description: "High-performance laptop with fast SSD and powerful processor." 
  },
  { 
    id: 2, 
    name: "Keyboard", 
    price: 40, 
    stock: 25, 
    image: keyboard, 
    description: "Mechanical keyboard with customizable RGB lighting." 
  },
  { 
    id: 3, 
    name: "Mouse", 
    price: 25, 
    stock: 30, 
    image: mouse, 
    description: "Wireless optical mouse with ergonomic design." 
  },
  { 
    id: 4, 
    name: "Monitor", 
    price: 300, 
    stock: 15, 
    image: monitor, 
    description: "27-inch 4K UHD monitor with thin bezels." 
  },
  { 
    id: 5, 
    name: "Headphones", 
    price: 80, 
    stock: 20, 
    image: headphone, 
    description: "Noise-cancelling over-ear headphones with clear audio." 
  },
  { 
    id: 6, 
    name: "Smartphone", 
    price: 999, 
    stock: 12, 
    image: smartphone, 
    description: "Latest model smartphone with OLED display and triple camera." 
  },
  { 
    id: 7, 
    name: "Tablet", 
    price: 650, 
    stock: 8, 
    image: tablet, 
    description: "10.5-inch tablet with stylus support and fast charging." 
  },
  { 
    id: 8, 
    name: "Smartwatch", 
    price: 250, 
    stock: 18, 
    image: smartwatch, 
    description: "Fitness tracking smartwatch with heart rate monitor." 
  }
]);


  const addProduct = (product) => {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct = {
      ...product,
      id: newId,
      // ✅ Only createObjectURL if it's a File
      image:
        product.image instanceof File
          ? URL.createObjectURL(product.image)
          : product.image || null,
    };

    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedProduct,
              image:
                updatedProduct.image instanceof File
                  ? URL.createObjectURL(updatedProduct.image)
                  : updatedProduct.image || p.image,
            }
          : p
      )
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
