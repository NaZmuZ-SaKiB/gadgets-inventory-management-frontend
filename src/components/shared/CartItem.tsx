import {
  TCartItem,
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cart.slice";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { formatCurrency } from "@/utils/currencyFormat";

type TProps = {
  item: TCartItem;
};

const CartItem = ({ item }: TProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="py-2 px-3 bg-slate-50">
      <div className="flex items-center gap-3">
        <img
          src={item.product?.imgUrl || "/assets/icons/photo.svg"}
          alt={item.product.name}
          className="size-12 object-cover border"
        />
        <h2 className="flex-1 text-sm font-semibold">{item.product.name}</h2>
        <Button
          variant="outline"
          className="border-red-500 text-xs h-8 px-2 text-red-500 hover:bg-red-500 hover:text-white"
          size="sm"
          onClick={() => dispatch(removeFromCart(item.product._id.toString()))}
        >
          Remove
        </Button>
      </div>
      <div className="mt-3 flex gap-3 items-center justify-between">
        <span className="font-semibold">
          Price: {formatCurrency(item.quantity * item.price)}
        </span>
        <div className="flex items-center gap-3 text-sm">
          <div>Quantity: </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="text-lg"
              onClick={() =>
                dispatch(decreaseQuantity(item.product._id.toString()))
              }
            >
              -
            </Button>
            <span
              className={`${
                item.quantity === item.product.quantity ? "text-red-500" : ""
              }`}
            >
              {item.quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="text-lg"
              disabled={item.quantity === item.product.quantity}
              onClick={() =>
                dispatch(
                  addToCart({
                    product: item.product,
                    price: item.price,
                    quantity: 1,
                  })
                )
              }
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
