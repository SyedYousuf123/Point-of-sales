import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Dashboard
import Dashboard from "@/pages/dashboard/Dashboard";

// Products
import ManageProducts from "@/pages/products/ManageProducts";
import AddProduct from "@/pages/products/AddProduct";
import ProductsView from "@/pages/products/ProductsView";

// Sales
import Cart from "@/pages/sales/Cart";
import Checkout from "@/pages/sales/Checkout";
import SalesList from "@/pages/sales/SalesList";

// Customers
import CustomersList from "@/pages/customers/CustomersList";
import AddCustomer from "@/pages/customers/AddCustomer";
import EditCustomer from "@/pages/customers/EditCustomer";

// Reports
import Reports from "@/pages/reports/Reports";
import EditProduct from "@/pages/products/EditProduct";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Products */}
          <Route path="products/view" element={<ProductsView />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/manage" element={<ManageProducts />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          {/* Sales */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="sales" element={<SalesList />} />

          {/* Customers */}
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/add" element={<AddCustomer />} />
          <Route path="customers/edit/:id" element={<EditCustomer />} />
          
          {/* Reports */}
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
