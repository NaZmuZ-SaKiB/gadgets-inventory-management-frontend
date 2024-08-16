/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateBrandMutation } from "@/redux/features/brand/brand.api";
import { brandValidationSchema } from "@/validations/brand.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TFormSchema = z.infer<typeof brandValidationSchema>;

type TProps = {
  id: string;
  name: string;
};

const UpdateBrandModel = ({ id, name }: TProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(brandValidationSchema),
    defaultValues: {
      name,
    },
  });

  const [updateBrand] = useUpdateBrandMutation();

  const onSubmit = async (values: TFormSchema) => {
    const loadingToastId = toast.loading("Updating new brand");

    try {
      await updateBrand({ id, name: values.name }).unwrap();

      toast.success("Brand Updated", { id: loadingToastId });

      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 bg-sky-600 hover:bg-sky-700">
          <EditIcon className="mr-2 size-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Brand</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex flex-col justify-start gap-3 max-sm:gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className={`bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 disabled:animate-pulse`}
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBrandModel;
