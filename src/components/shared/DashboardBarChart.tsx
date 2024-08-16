/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";

const DashboardBarChart = () => {
  const { data, isLoading } = useGetAllProductsQuery({ sort: "-quantity" });

  if (isLoading) return null;

  const chartData = data?.data?.products?.map((product: any) => ({
    name: product.name,
    quantity: product.quantity,
  }));

  const chartConfig = {
    quantity: {
      label: "Quantity",
      color: "#3B82F6",
    },
  } satisfies ChartConfig;
  return (
    <div className="p-5 border border-slate-300 rounded-lg">
      <h2 className="text-center font-semibold text-slate-700 mb-5">
        Top Products
      </h2>
      <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground max-md:hidden"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DashboardBarChart;
