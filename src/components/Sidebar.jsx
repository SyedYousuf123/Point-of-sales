import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Eye,
  PlusCircle,
  Settings2,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
// import logo from "/logo.png"; // 👈 Place your logo in /public

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 w-full text-left rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold border-l-4 border-indigo-500"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  const subLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 text-sm rounded-md transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold border-l-4 border-indigo-500"
        : "hover:bg-gray-100 text-gray-600"
    }`;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-full p-2 border hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r shadow-md flex flex-col transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header with Logo */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
          {/* <img
            src={logo}
            alt="POS Logo"
            className="w-10 h-10 rounded-lg object-cover shadow-sm"
          /> */}
          <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">
            POS System
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-gray-700">
          <NavLink to="/" className={linkClasses}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Products Dropdown */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <Package size={18} />
                <span>Products</span>
              </div>
              <ChevronDown size={18} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-3 mt-1 space-y-1">
              <NavLink to="/products/view" className={subLinkClasses}>
                <Eye size={16} />
                Products View
              </NavLink>
              <NavLink to="/products/add" className={subLinkClasses}>
                <PlusCircle size={16} />
                Add Product
              </NavLink>
              <NavLink to="/products/manage" className={subLinkClasses}>
                <Settings2 size={16} />
                Manage Products
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Sales Dropdown */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} />
                <span>Sales</span>
              </div>
              <ChevronDown size={18} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-3 mt-1 space-y-1">
              <NavLink to="/sales" className={subLinkClasses}>
                <Eye size={16} />
                Sales List
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Customers Dropdown */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <Users size={18} />
                <span>Customers</span>
              </div>
              <ChevronDown size={18} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-3 mt-1 space-y-1">
              <NavLink to="/customers" end className={subLinkClasses}>
                <Eye size={16} />
                Customers List
              </NavLink>
              <NavLink to="/customers/add" className={subLinkClasses}>
                <UserPlus size={16} />
                Add Customer
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Reports */}
          <NavLink to="/reports" className={linkClasses}>
            <BarChart3 size={18} />
            Reports
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
