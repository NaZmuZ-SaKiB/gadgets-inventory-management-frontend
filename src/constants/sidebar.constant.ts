export const commonSideBarRoutes: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/stock",
    label: "Stock",
  },
  {
    path: "/sales",
    label: "Sales",
  },
  {
    path: "/add-product",
    label: "Add Product",
  },
  {
    path: "/category",
    label: "Category",
  },
  {
    path: "/brand",
    label: "Brand",
  },
  {
    path: "/checkout",
    label: "Checkout",
  },
];

export const sideBarRoutesManager: { path: string; label: string }[] = [
  ...commonSideBarRoutes,
  {
    path: "/create-user",
    label: "Create User",
  },
];

export const sideBarRoutesAdmin: { path: string; label: string }[] = [
  ...sideBarRoutesManager,
  {
    path: "/user-management",
    label: "Users",
  },
];
