import { useGetStockCountQuery } from "@/redux/features/product/product.api";
import { getStockPieChartConfig } from "@/utils/chartConfig";
import { getStockPieChartData } from "@/utils/chartData";
import DashboardPieChart from "../shared/DashboardPieChart";

const StockPieChart = () => {
  const { data: stockData, isLoading: stockLoading } =
    useGetStockCountQuery("1");

  const { data: outOfStockData, isLoading: outOfStockLoading } =
    useGetStockCountQuery("0");

  const stock = stockData?.data?.count;
  const outOfStock = outOfStockData?.data?.count;

  if (stockLoading || outOfStockLoading) {
    return null;
  }

  const chartData = getStockPieChartData(stock, outOfStock);
  const chartConfig = getStockPieChartConfig();

  return (
    <div className="">
      <DashboardPieChart
        chartData={chartData}
        chartConfig={chartConfig}
        dataKey="count"
        nameKey="type"
        title="Stock Status"
      />
    </div>
  );
};

export default StockPieChart;
