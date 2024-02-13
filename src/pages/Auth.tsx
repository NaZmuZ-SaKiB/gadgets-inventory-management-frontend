/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import {
  useLoginMutation,
  useSignupMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
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

type TFormSchema = z.infer<
  typeof loginValidationSchema | typeof signupValidationSchema
>;

const AuthenticationPage = () => {
  const { pathname } = useLocation();

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
      isLoginPage ? "Logging in..." : "Signing up..."
    );
    try {
      let result: any;
      if (isLoginPage) {
        result = await login(values).unwrap();
      } else {
        result = await signup(values).unwrap();
      }

      dispatch(setUser(result?.data));

      toast.success(isLoginPage ? "Logged in" : "Signup successful", {
        id: loadingToastId,
      });

      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Something went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="grid place-items-center w-full min-h-[100svh] p-2">
      <div className="max-w-sm w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">
          {isLoginPage ? "Login" : "Sign up"}
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

            <Button disabled={form.formState.isSubmitting} type="submit">
              {isLoginPage ? "Login" : "Sign up"}
            </Button>

            {isLoginPage ? (
              <p>
                Do not have an account?{" "}
                <Link className="text-blue-500 hover:underline" to={"/signup"}>
                  sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account.{" "}
                <Link className="text-blue-500 hover:underline" to={"/login"}>
                  login
                </Link>
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
