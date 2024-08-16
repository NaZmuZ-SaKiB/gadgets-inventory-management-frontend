import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useGetDashboardChartsDataQuery } from "@/redux/features/auth/auth.api";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#0c4a6e",
  },
} satisfies ChartConfig;

const DashboardLineChart = () => {
  const { data, isLoading } = useGetDashboardChartsDataQuery(undefined);
  const weeklySales = data?.data?.weeklySales;

  if (isLoading) return null;

  const chartData = weeklySales.map((saleCount: number, i: number) => ({
    week: `week ${i + 1}`,
    sales: saleCount,
  }));

  return (
    <div className="border border-slate-300 rounded-lg p-5">
      <h2 className="text-center font-semibold text-lg mb-3">Weekly Sales</h2>
      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit">
        <div className="min-w-[400px]">
          <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="sales"
                type="natural"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLineChart;
