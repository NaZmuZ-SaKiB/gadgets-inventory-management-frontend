/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import { productValidationSchema } from "@/validations/product.validation";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.api";
import {
  compatibilities,
  connectivities,
  operatingSystems,
  powerSources,
} from "@/constants/product.constant";
import { cn } from "@/lib/utils";
import { TBrand } from "@/types/brand.interface";
import { TCategory } from "@/types/category.interface";
import { TProduct } from "@/types/product.interface";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

type TProps = {
  product?: TProduct;
  defaultValues: any;
  type: "add" | "update" | "duplicate";
};

type TFormSchema = z.infer<typeof productValidationSchema>;

const ProductForm = ({ product, type, defaultValues }: TProps) => {
  const [selectedConnectivities, setConnectivities] = useState<string[]>(
    product?.connectivity || []
  );
  const [selectedCompatibilities, setCompatibilities] = useState<string[]>(
    product?.compatibility || []
  );

  const handleChange = (
    value: string,
    state: string[],
    setter: Dispatch<SetStateAction<string[]>>,
    type: "add" | "remove"
  ) => {
    if (type === "add") {
      const array = Array.from(new Set([...state, value]));
      setter(array);
    } else {
      const array = state.filter((item) => item !== value);
      setter(array);
    }
  };

  const navigate = useNavigate();

  const form = useForm<TFormSchema>({
    defaultValues,
    resolver: zodResolver(productValidationSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined, {
      pollingInterval: 60000,
    });

  const { data: brands, isLoading: isBrandsLoading } = useGetAllBrandsQuery(
    undefined,
    {
      pollingInterval: 60000,
    }
  );

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = async () => {
    const loadingToastId = toast.loading(
      type === "update" ? "Updating product" : "Creating new product"
    );

    const data: Record<string, unknown> = {
      ...form.getValues(),
      releaseDate: form.getValues().releaseDate.toISOString(),
    };

    for (const key in data) {
      if (data[key] === undefined) {
        delete data[key];
      }
    }

    if (selectedCompatibilities.length > 0)
      data.compatibility = selectedCompatibilities;
    if (selectedConnectivities.length > 0)
      data.connectivity = selectedConnectivities;

    try {
      let result: any;
      if (type === "update") {
        result = await updateProduct({
          productId: product?._id.toString(),
          product: data,
        });
      } else {
        result = await createProduct(data);
      }

      toast.success(result?.data?.message, { id: loadingToastId });

      navigate("/stock", { replace: true });
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong!", {
        id: loadingToastId,
      });
      console.log(error);
    }

    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
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

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 flex-wrap">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[250px]">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="quantity"
                    {...field}
                    min={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[250px]">
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="cost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[250px]">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="imgUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-36">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isCategoriesLoading &&
                      categories &&
                      categories?.data.map((category: TCategory) => (
                        <SelectItem
                          key={category.name}
                          value={category._id.toString()}
                        >
                          {category.name.toLowerCase()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-36">
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isBrandsLoading &&
                      brands &&
                      brands?.data.map((brand: TBrand) => (
                        <SelectItem
                          key={brand.name}
                          value={brand._id.toString()}
                        >
                          {brand.name.toLowerCase()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseDate"
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
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-10">
          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="operatingSystem"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-36">
                  <FormLabel>OS (optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {operatingSystems.map((os) => (
                        <SelectItem key={os} value={os}>
                          {os}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="powerSource"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-36">
                  <FormLabel>PowerSource (optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PowerSource" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {powerSources.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-36">
              <div className="mb-2">Connectivity (optional)</div>
              <Select
                onValueChange={(v) =>
                  handleChange(
                    v,
                    selectedConnectivities,
                    setConnectivities,
                    "add"
                  )
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Connectivity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {connectivities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              {selectedConnectivities.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedConnectivities.map((item, index) => (
                    <span
                      onClick={() =>
                        handleChange(
                          item,
                          selectedConnectivities,
                          setConnectivities,
                          "remove"
                        )
                      }
                      key={`selected-${item}-${index}`}
                      className="border border-gray-500 text-xs px-2 py-0.5 rounded-3xl cursor-pointer"
                    >
                      {item.toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-36">
              <div className="mb-2">Compatibility (optional)</div>
              <Select
                onValueChange={(v) =>
                  handleChange(
                    v,
                    selectedCompatibilities,
                    setCompatibilities,
                    "add"
                  )
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Compatibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {compatibilities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedCompatibilities.map((item, index) => (
                  <span
                    onClick={() =>
                      handleChange(
                        item,
                        selectedCompatibilities,
                        setCompatibilities,
                        "remove"
                      )
                    }
                    key={`selected-${item}-${index}`}
                    className="border border-gray-500 text-xs px-2 py-0.5 rounded-3xl cursor-pointer"
                  >
                    {item.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel>Weight in kg (optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel>Camera (optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="camera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displaySize"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[250px]">
                  <FormLabel>Display (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="display size"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700"
        >
          {type === "update"
            ? "Save Changes"
            : type === "add"
            ? "Create Product"
            : "Duplicate Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
