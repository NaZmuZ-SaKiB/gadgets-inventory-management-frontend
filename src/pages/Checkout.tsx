import SaleForm from "@/components/forms/SaleForm";
import CartItem from "@/components/shared/CartItem";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatCurrency } from "@/utils/currencyFormat";

const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const dispatch = useAppDispatch();

  return (
    <div className="pt-16 p-2">
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      <div className="lg:grid grid-cols-3 gap-2 items-start max-lg:space-y-3">
        <div className="col-span-2 space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem key={item.product._id.toString()} item={item} />
            ))
          ) : (
            <p className="text-center text-3xl py-5 bg-slate-50 text-slate-700 font-semibold">
              Cart is empty
            </p>
          )}

          {cart.length > 0 && (
            <div className="py-2 px-3 bg-slate-50 flex gap-3 justify-between items-center">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
              <span>
                Grand Total:{" "}
                <span className="font-semibold">{formatCurrency(total)}</span>
              </span>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-3 bg-slate-50">
            <SaleForm items={cart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
