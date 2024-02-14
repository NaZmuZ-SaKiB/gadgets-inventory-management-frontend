/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { useCreateSaleMutation } from "@/redux/features/sale/sale.api";
import { saleValidationSchema } from "@/validations/sale.validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { TCartItem } from "@/redux/features/cart/cart.slice";

type TProps = {
  items: TCartItem[];
};

type TFormSchema = z.infer<typeof saleValidationSchema>;

const SaleForm = ({ items }: TProps) => {
  const form = useForm<TFormSchema>({
    defaultValues: {
      buyerName: "",
      contactNo: "",
      dateOfSale: new Date(),
    },
    resolver: zodResolver(saleValidationSchema),
  });

  const [createSale] = useCreateSaleMutation();

  const onSubmit = async () => {
    const loadingToastId = toast.loading("Creating new sale");

    const data = {
      ...form.getValues(),
      dateOfSale: form.getValues().dateOfSale.toISOString(),
      products: items.map((item) => ({
        product: item.product._id,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    console.log(data);

    try {
      await createSale(data);

      toast.success("Sale created.", { id: loadingToastId });
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong!", {
        id: loadingToastId,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="buyerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="buyer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-32">
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input type="string" placeholder="contact no" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfSale"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-36">
                <FormLabel>Release Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal mt-2",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick release date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Sale
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SaleForm;
