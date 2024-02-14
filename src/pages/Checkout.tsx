import { useAppSelector } from "@/redux/hooks";

const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.cart.cart);

  return (
    <div className="pt-16 p-2">
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      <div className="flex items-start gap-3"></div>
    </div>
  );
};

export default CheckoutPage;
