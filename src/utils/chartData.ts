export const getStockPieChartData = (stock: number, outOfStock: number) => {
  return [
    {
      type: "Out of Stock",
      count: outOfStock,
      fill: "#EF4444",
    },
    {
      type: "In Stock",
      count: stock,
      fill: "#3B82F6",
    },
  ];
};

export const getWeeklySalePieChartData = (weeklySales: number[]) => {
  return [
    {
      week: "This Week",
      count: weeklySales[0],
      fill: "#3B82F6",
    },
    {
      week: "Last Week",
      count: weeklySales[1],
      fill: "#F59E0B",
    },
    {
      week: "2 Weeks Ago",
      count: weeklySales[2],
      fill: "#10B981",
    },
  ];
};
