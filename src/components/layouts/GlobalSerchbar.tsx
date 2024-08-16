import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TProduct } from "@/types/product.interface";
import { formatCurrency } from "@/utils/currencyFormat";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const GlobalSerchbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [search, setSerach] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    setOpen(false);
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const { data, isLoading } = useGetAllProductsQuery({
    search: debouncedSearch,
    limit: 5,
  });

  if (window.location.pathname.includes("product")) return null;

  return (
    <div className="relative max-md:hidden flex">
      <span className="flex justify-center items-center px-1 bg-white text-sky-800">
        <Search className="size-5" />
      </span>
      <Input
        className="h-8 min-w-[300px] text-slate-800 border-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-none"
        placeholder="Search Product..."
        onChange={(e) => setSerach(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <>
          <div
            className="fixed z-20 top-12 inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute top-9 z-50 w-full bg-white shadow text-slate-700 text-sm">
            {isLoading ? (
              <div className="p-2">Loading...</div>
            ) : (
              data?.data?.products?.map((product: TProduct) => (
                <div
                  key={product._id}
                  className="group p-2 hover:bg-slate-50 border-b cursor-pointer"
                  onClick={() => handleNavigate(product._id)}
                >
                  <div>
                    <div className="group-hover:text-sky-700 font-semibold pb-1">
                      {product.name}
                    </div>
                    <div className="flex gap-2 justify-between flex-wrap">
                      <span>
                        <span className="font-semibold">Qty:</span>{" "}
                        {product.quantity}
                      </span>
                      <span>
                        <span className="font-semibold">Cost:</span>{" "}
                        {formatCurrency(product.cost)}
                      </span>
                      <span>
                        <span className="font-semibold">Price:</span>{" "}
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSerchbar;
