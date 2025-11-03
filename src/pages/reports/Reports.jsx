import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";

const Reports = () => {
  // Example demo data — in a real app, you'd fetch this from an API
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
  ];

  const productData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
  ];

  const COLORS = ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4 flex items-center gap-4">
          <DollarSign className="text-green-600" size={32} />
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold">$45,230</h2>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <ShoppingBag className="text-indigo-600" size={32} />
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <h2 className="text-2xl font-bold">1,245</h2>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <Users className="text-blue-600" size={32} />
          <div>
            <p className="text-gray-500 text-sm">Customers</p>
            <h2 className="text-2xl font-bold">352</h2>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-4">
          <Package className="text-orange-600" size={32} />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h2 className="text-2xl font-bold">128</h2>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3">Top Selling Products</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
