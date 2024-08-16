import { useGetDashboardChartsDataQuery } from "@/redux/features/auth/auth.api";
import { getWeeklySalePieChartConfig } from "@/utils/chartConfig";
import { getWeeklySalePieChartData } from "@/utils/chartData";
import DashboardPieChart from "../shared/DashboardPieChart";

const WeeklySalePieChart = () => {
  const { data, isLoading } = useGetDashboardChartsDataQuery(undefined);
  const weeklySales = data?.data?.weeklySales?.toReversed();

  if (isLoading) return null;

  const chartData = getWeeklySalePieChartData(weeklySales);
  const chartConfig = getWeeklySalePieChartConfig();

  return (
    <div className="">
      <DashboardPieChart
        chartData={chartData}
        chartConfig={chartConfig}
        dataKey="count"
        nameKey="week"
        title="Sale last 3 weeks"
      />
    </div>
  );
};

export default WeeklySalePieChart;
