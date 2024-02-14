import CartItem from "@/components/shared/CartItem";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";

const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="pt-16 p-2">
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      <div className="flex items-start gap-3">
        <div className="border flex-1 border-black space-y-2 p-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem key={item.product._id.toString()} item={item} />
            ))
          ) : (
            <p className="text-center text-3xl py-5">Cart is empty</p>
          )}

          {cart.length > 0 && (
            <div className="py-2 px-3 border flex gap-3 justify-between items-center font-semibold">
              <Button size="sm" variant="destructive">
                Clear Cart
              </Button>
              <span>Grand Total: {total}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
