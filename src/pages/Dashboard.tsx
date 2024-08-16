import ProductStockCountCard from "@/components/cards/dashboard/ProductStockCountCard";
import PurchasedCount from "@/components/cards/dashboard/PurchasedCount";
import SalesCard from "@/components/cards/dashboard/SalesCard";
import StockPieChart from "@/components/charts/StockPieChart";
import WeeklySalePieChart from "@/components/charts/WeeklySalePieChart";
import DashboardBarChart from "@/components/shared/DashboardBarChart";
import DashboardLineChart from "@/components/shared/DashboardLineChart";
import LastPurchased from "@/components/shared/LastPurchased";
import LastSales from "@/components/shared/LastSales";

const Dashboard = () => {
  return (
    <div className="px-2 md:px-5 lg:px-10 pt-16 mx-auto pb-10">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-5">
        <SalesCard
          className="bg-orange-500 hover:bg-orange-600"
          time="1"
          title="Sales Today"
        />
        <SalesCard
          className="bg-pink-500 hover:bg-pink-600"
          time="7"
          title="Sales This Week"
        />
        <SalesCard
          className="bg-purple-500 hover:bg-purple-600"
          time="30"
          title="Sales This Month"
        />
        <ProductStockCountCard
          quantity="1"
          title="Products in Stock"
          className="bg-green-500 hover:bg-green-600"
        />
        <ProductStockCountCard
          quantity="0"
          title="Products out of Stock"
          className="bg-red-500 hover:bg-red-600"
        />
        <PurchasedCount />
      </div>

      <div className="mt-5 flex gap-5 [&>*]:flex-1 [&>*]:basis-[300px] flex-wrap">
        <StockPieChart />
        <WeeklySalePieChart />
      </div>

      <div className="mt-5 flex gap-5 [&>*]:flex-1 [&>*]:basis-[400px] flex-wrap">
        <DashboardBarChart />
        <DashboardLineChart />
      </div>

      <LastSales />
      <LastPurchased />
    </div>
  );
};

export default Dashboard;
