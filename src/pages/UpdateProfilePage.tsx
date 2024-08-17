import UpdateProfile from "@/components/forms/UpdateProfile";
import { useAppSelector } from "@/redux/hooks";
import Spinner from "@/components/shared/Spinner";
import { useGetUserByIdQuery } from "@/redux/features/auth/auth.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateProfilePage = () => {
  const { id } = useParams();

  const authUser = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetUserByIdQuery(id as string, {});
  const user = userData?.data;

  if (isLoading)
    return (
      <div className=" flex justify-center items-center h-svh">
        <div className="size-16">
          <Spinner className="border-y-black" />
        </div>
      </div>
    );

  if (
    authUser?._id.toString() !== id &&
    (authUser?.role === "user" || authUser?.role === user?.role)
  ) {
    toast.error("Unauthorized Access");
    navigate("/");
  }

  return (
    <div className="pt-16 flex-1 p-2 max-w-screen-xl mx-auto">
      <div className="w-full max-w-screen-md mx-auto border rounded-lg p-4">
        <h1 className="text-center text-xl font-semibold mb-5 text-slate-700">
          Profile
        </h1>
        <UpdateProfile
          role={authUser?.role as string}
          defaultValues={{
            name: user?.name || "",
            email: user?.email || "",
            dateOfBirth: user?.dateOfBirth || "",
            gender: user?.gender || "male",
            phone: user?.phone || "",
            permanentAddress: user?.permanentAddress || "",
            presentAddress: user?.presentAddress || "",
            employmentStatus: user?.employmentStatus || "full-time",
            workLocation: user?.workLocation || "on-site",
            employeeType: user?.employeeType || "permanent",
            salary: user?.salary || 0,
            joiningDate: user?.joiningDate || "",
            image: user?.image || "",
            emergencyContact: {
              name: user?.emergencyContact?.name || "",
              phone: user?.emergencyContact?.phone || "",
              relationShip: user?.emergencyContact?.relationShip || "",
              occupation: user?.emergencyContact?.occupation || "",
            },
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProfilePage;
