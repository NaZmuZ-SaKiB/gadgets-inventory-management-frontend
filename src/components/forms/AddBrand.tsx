/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateBrandMutation } from "@/redux/features/brand/brand.api";

import { brandValidationSchema } from "@/validations/brand.validation";
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

type TFormSchema = z.infer<typeof brandValidationSchema>;

const AddBrand = () => {
  const form = useForm<TFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(brandValidationSchema),
  });

  const [addBrand] = useCreateBrandMutation();

  const onSubmit = async (values: TFormSchema) => {
    const loadingToastId = toast.loading("Creating new brand");

    try {
      await addBrand(values.name).unwrap();

      form.reset();

      toast.success("Brand created", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-center mb-10">Add Brand</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit">
            Add Brand
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddBrand;
