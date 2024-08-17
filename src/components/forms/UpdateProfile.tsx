/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateProfileValidationSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  employeeTypes,
  employmentStatuses,
  genders,
  workLocations,
} from "@/constants/user.constant";
import { z } from "zod";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

type TFormSchema = z.infer<typeof updateProfileValidationSchema>;

const UpdateProfile = ({
  role,
  defaultValues,
}: {
  role: string;
  defaultValues: any;
}) => {
  const { id } = useParams();

  const form = useForm<TFormSchema>({
    defaultValues,
    resolver: zodResolver(updateProfileValidationSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<TFormSchema> = async (values) => {
    const loadingToastId = toast.loading("Saving User");

    const data = {
      id,
      user: values,
    };

    try {
      const result = (await updateUser(data as any)) as any;

      toast.success(result?.data?.message, { id: loadingToastId });
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong!", {
        id: loadingToastId,
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="Date Of Birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Address</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Permanent Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="presentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Present Address</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Present Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((item: string) => (
                      <SelectItem
                        key={`gender-item-${item}`}
                        value={item}
                        className="capitalize"
                      >
                        {item}
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
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={role === "user"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employment Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employmentStatuses.map((item: string) => (
                      <SelectItem
                        key={`employmentStatus-item-${item}`}
                        value={item}
                        className="capitalize"
                      >
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

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="workLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={role === "user"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Work Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {workLocations.map((item: string) => (
                      <SelectItem
                        key={`workLocation-item-${item}`}
                        value={item}
                        className="capitalize"
                      >
                        {item}
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
            name="employeeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={role === "user"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employee Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeTypes.map((item: string) => (
                      <SelectItem
                        key={`employeeType-item-${item}`}
                        value={item}
                        className="capitalize"
                      >
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

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="joiningDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joining Date</FormLabel>
                <FormControl>
                  <Input
                    disabled={role === "user"}
                    placeholder="Joining Date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    disabled={role === "user"}
                    placeholder="Salary"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="font-semibold">Emergency Contact</h2>

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="emergencyContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact.relationShip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input placeholder="Relationship" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
          <FormField
            control={form.control}
            name="emergencyContact.occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700"
        >
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfile;
