import { ChartConfig } from "@/components/ui/chart";

export const getStockPieChartConfig = () => {
  return {
    count: {
      label: "Count",
    },
    "Out of Stock": {
      label: "Out of Stock",
      color: "hsl(var(--chart-1))",
    },
    "In Stock": {
      label: "In Stock",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
};

export const getWeeklySalePieChartConfig = () => {
  return {
    count: {
      label: "Count",
    },
    "Week 1": {
      label: "This Week",
      color: "hsl(var(--chart-1))",
    },
    "Week 2": {
      label: "Last Week",
      color: "hsl(var(--chart-2))",
    },
    "Week 3": {
      label: "2 Weeks Ago",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
};
