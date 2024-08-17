import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useGetUserByIdQuery } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { id } = useParams();
  const [authorized, setAuthorized] = useState(true);

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
    setAuthorized(false);
    toast.error("Unauthorized Access");
    navigate("/");
  }
  return (
    <div className="pt-16 flex-1 p-2 max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center gap-5">
        {authorized && (
          <Link to={`/profile/edit/${user?._id}`} className="self-end">
            <Button className="bg-sky-600 hover:bg-sky-700" size="sm">
              <Edit className="mr-2 size-4" /> Edit Profile
            </Button>
          </Link>
        )}

        <div className="mx-auto size-[250px] bg-slate-100 rounded-full overflow-hidden shadow-lg">
          {user?.image && (
            <img
              src={user?.image}
              className="size-full object-cover object-center p-1.5 rounded-full"
              alt="profile pic"
            />
          )}
        </div>

        <div>
          <h1 className="text-lg font-semibold text-slate-600 text-center">
            {user?.name}
          </h1>
          <h2 className="text-2xl font-bold text-slate-700 text-center">
            {user?.role === "user"
              ? "Sales Executive"
              : user?.role === "admin"
              ? "Boss"
              : "Manager"}
          </h2>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 w-full">
          <h3 className="text-xl font-semibold text-slate-700 mb-3">
            General Info
          </h3>

          <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user?.name ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {user?.email ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span>{" "}
              {user?.gender ?? "N/A"}
            </p>
          </div>

          <div className="mt-3 flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
            <p className="text-gray-700">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {user?.dateOfBirth ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {user?.phone ?? "N/A"}
            </p>

            <p></p>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-700 mb-3">
            Address
          </h3>

          <div className="mt-3 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Present Address:</span>{" "}
              {user?.presentAddress ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Permanent Address:</span>{" "}
              {user?.permanentAddress ?? "N/A"}
            </p>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-700 mb-3">
            Emergency Contact
          </h3>

          <div className="mt-3 flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {user?.emergencyContact?.name ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Occupation:</span>{" "}
              {user?.emergencyContact?.occupation ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {user?.emergencyContact?.phone ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Relationship:</span>{" "}
              {user?.emergencyContact?.relationShip ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 w-full mb-5">
          <h3 className="text-xl font-semibold text-slate-700 mb-3">
            Official Info
          </h3>

          <div className="flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span>{" "}
              {user?.salary ? user?.salary + "/-" : "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Joining Date:</span>{" "}
              {user?.joiningDate ?? "N/A"}
            </p>

            <p className="text-gray-700"></p>
          </div>

          <div className="mt-3 flex gap-3 flex-wrap [&>*]:flex-1 [&>*]:basis-[250px]">
            <p className="text-gray-700">
              <span className="font-semibold">Employment Status:</span>{" "}
              {user?.employmentStatus ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Work Location:</span>{" "}
              {user?.workLocation ?? "N/A"}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Employee Type:</span>{" "}
              {user?.employeeType ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
