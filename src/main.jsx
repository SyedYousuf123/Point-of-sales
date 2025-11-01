import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// Context providers
import { ProductsProvider } from "./context/ProductsContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import { SalesProvider } from "./context/SalesContext.jsx"
import { CustomersProvider } from "./context/CustomersContext.jsx" // ✅ import it

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <SalesProvider>
          <CustomersProvider> 
            <App />
          </CustomersProvider>
        </SalesProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
)
