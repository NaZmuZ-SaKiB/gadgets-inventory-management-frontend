/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import {
  useLoginMutation,
  useSignupMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/auth.slice";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "@/validations/auth.validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLE } from "@/constants/user.constant";

type TFormSchema = z.infer<
  typeof loginValidationSchema | typeof signupValidationSchema
>;

const AuthenticationPage = () => {
  const { pathname } = useLocation();
  const currentUserRole = useAppSelector((state) => state.auth.user?.role);
  const isLoginPage = pathname === "/login";

  const form = useForm<TFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(
      isLoginPage ? loginValidationSchema : signupValidationSchema
    ),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const onSubmit = async (values: TFormSchema) => {
    const loadingToastId = toast.loading(
      isLoginPage ? "Logging in..." : "Creating user..."
    );
    try {
      let result: any;
      if (isLoginPage) {
        result = await login(values).unwrap();
      } else {
        result = await signup(values).unwrap();
      }

      toast.success(isLoginPage ? "Logged in" : "User created", {
        id: loadingToastId,
      });

      if (isLoginPage) {
        dispatch(setUser(result?.data));
        navigate("/", { replace: true });
      } else {
        form.reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Something went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="grid place-items-center w-full min-h-[100svh] p-2">
      <div className="max-w-sm w-full bg-sky-50 rounded-lg p-4">
        <h1 className="text-2xl text-sky-600 font-semibold text-center mb-10">
          {isLoginPage ? "Login" : "Create User"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
          >
            {!isLoginPage && (
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
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLoginPage && currentUserRole === USER_ROLE.ADMIN && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-36">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[USER_ROLE.MANAGER, USER_ROLE.USER].map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="bg-sky-600 hover:bg-sky-700"
            >
              {isLoginPage ? "Login" : "Create User"}
            </Button>

            {isLoginPage && (
              <div>
                <p className="text-center font-semibold">Test Login</p>

                <div className="mt-3 flex justify-center flex-wrap gap-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={form.formState.isSubmitting}
                    className="px-2 h-8 bg-transparent border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700 disabled:opacity-50"
                    onClick={() => {
                      form.setValue("email", "ananta@gmail.com");
                      form.setValue("password", "11111111");
                      form.handleSubmit(onSubmit)();
                    }}
                  >
                    Sales Man Login
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={form.formState.isSubmitting}
                    className="px-2 h-8 bg-transparent border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700 disabled:opacity-50"
                    onClick={() => {
                      form.setValue("email", "sakib@gmail.com");
                      form.setValue("password", "11111111");
                      form.handleSubmit(onSubmit)();
                    }}
                  >
                    Manager Login
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="px-2 h-8 bg-transparent border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
                    onClick={() => {
                      form.setValue("email", "boss@gmail.com");
                      form.setValue("password", "superman");
                      form.handleSubmit(onSubmit)();
                    }}
                  >
                    Admin Login
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
