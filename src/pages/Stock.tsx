import { ChangeEvent, useState } from "react";

import ProductCard from "@/components/cards/ProductCard";
import ProductsTopBar from "@/components/forms/ProductsTopBar";
import StockPagination from "@/components/forms/StockPagination";
import Filters from "@/components/shared/Filters";

import {
  removeSelectedProduct,
  selectProduct,
  setFilter,
} from "@/redux/features/product/product.slice";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.api";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { TBrand } from "@/types/brand.interface";
import { TCategory } from "@/types/category.interface";
import { TProduct } from "@/types/product.interface";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const StockPage = () => {
  const [showFilters, setShowFilders] = useState<boolean>(false);

  const filter = useAppSelector((state) => state.product.filter);
  const dispatch = useAppDispatch();

  const handleSelectedProducts = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.target.checked) {
      dispatch(selectProduct(value));
    } else {
      dispatch(removeSelectedProduct(value));
    }
  };

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined, {
      pollingInterval: 10000,
    });

  const { data: brands, isLoading: isBrandsLoading } = useGetAllBrandsQuery(
    undefined,
    {
      pollingInterval: 10000,
    }
  );

  const { currentData, isFetching } = useGetAllProductsQuery(filter, {
    pollingInterval: 10000,
  });

  return (
    <div className="p-2 pt-16 max-sm:pt-14 relative">
      <h1 className="text-2xl font-semibold mb-2">Stock</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-sm:gap-1">
        <Select
          onValueChange={(v) =>
            dispatch(setFilter({ value: v, field: "category" }))
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {!isCategoriesLoading &&
              categories &&
              categories?.data.map((category: TCategory) => (
                <SelectItem key={category.name} value={category._id.toString()}>
                  {category.name.toLowerCase()}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) =>
            dispatch(setFilter({ value: v, field: "brand" }))
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {!isBrandsLoading &&
              brands &&
              brands?.data.map((brand: TBrand) => (
                <SelectItem key={brand.name} value={brand._id.toString()}>
                  {brand.name.toLowerCase()}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="col-span-2">
          <Input
            placeholder="Search"
            onChange={(e) =>
              setTimeout(() => {
                dispatch(setFilter({ value: e.target.value, field: "search" }));
              }, 300)
            }
          />
        </div>
      </div>

      <div className="stock-filter-container-grid">
        <Filters show={showFilters} setShow={setShowFilders} />
        <div className="">
          <ProductsTopBar show={showFilters} setShow={setShowFilders} />
          <div className="mt-3 stock-grid">
            {isFetching && !currentData ? (
              Array(9)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={`product-card-loading-${index}`}
                    className="h-60"
                  />
                ))
            ) : currentData?.data?.products?.length > 0 ? (
              currentData?.data?.products?.map((product: TProduct) => (
                <ProductCard
                  product={product}
                  handleSelect={handleSelectedProducts}
                  key={product._id.toString()}
                />
              ))
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                Stock is empty
              </div>
            )}
          </div>
          {!isFetching && currentData?.data?.products?.length > 0 && (
            <StockPagination total={currentData?.data?.total} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPage;
