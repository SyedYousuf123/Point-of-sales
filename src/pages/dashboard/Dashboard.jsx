import StatsCards from "./components/StatsCards"
import SalesChart from "./components/SalesChart"
import TopProducts from "./components/TopProducts"
import RecentSales from "./components/RecentSales"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <StatsCards />
      <SalesChart />
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProducts />
        <RecentSales />
      </div>
    </div>
  )
}
