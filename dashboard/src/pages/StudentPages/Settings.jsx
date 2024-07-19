import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../../redux/features/auth/authApi";
import Uploadimage from "../../assets/Icons/Screenshot 2024-07-17 at 17.57.38.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useUpdateAvatarMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} from "../../../redux/features/user/userApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heading from "@/utils/Heading";

function Settings() {
  const user = useSelector((state) => state.auth.user);
  const [logout, setLogout] = useState(false);
  const [logedout] = useLazyLogoutQuery();
  const navigate = useNavigate();

  const [
    changeUserInfo,
    {
      isLoading: loadingUserInfo,
      isSuccess: successUserInfo,
      error: errorUserInfo,
    },
  ] = useUpdateUserInfoMutation();
  const [
    changeAvatar,
    { isLoading: loadingAvatar, isSuccess: successAvatar, error: errorAvatar },
  ] = useUpdateAvatarMutation();
  const [
    changePassword,
    {
      isLoading: loadingChangePass,
      isSuccess: successChangePass,
      error: errorChangePass,
    },
  ] = useUpdateUserPasswordMutation();

  const logoutHandler = async () => {
    await logedout();
    setLogout(true);
    navigate("/login");
  };

  const handleChangeAvatar = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const avatar = e.target.result;
        try {
          await changeAvatar(avatar).unwrap();
          toast.success("Avatar changed successfully");
        } catch (err) {
          toast.error("Error changing avatar");
          console.error("Error changing avatar:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeName = async (values, { setSubmitting }) => {
    try {
      const response = await changeUserInfo({
        name: values.name,
        email: user.email,
      });
      toast.success("Name changed successfully");
      console.log("User data was changed successfully:", response);
    } catch (err) {
      toast.error("Error changing name");
      console.error("Error changing name:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (values, { setSubmitting }) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed successfully");
      console.log("Password was changed successfully");
    } catch (err) {
      toast.error("Error changing password");
      console.error("Error changing password:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-[97vh] p-2 items-center justify-center gap-5">
      <Heading
        title="Settings -Hogwarts"
        description="Settings"
        keywords="question,course,change the name, name, change the password, password, change the image, image, password, name, list of mentors, mentores, hogwatrs, school, learning free, paid , freecourses answer, queries, answered, lesson, html, css, js , search"
      />
      <ToastContainer />
      <div className="flex justify-center">
        <div className=" w-[20vw] ">
          <div className="py-2 px-4 border cursor-pointer">Edit Profile</div>
          <div
            className="py-2 px-4 border cursor-pointer"
            onClick={logoutHandler}
          >
            Log Out
          </div>
        </div>
      </div>

      <div className=" w-full border-2 shadow-[5px_5px_2px__rgba(0,0,0,0.7)] rounded-md border-black h-[90%] p-5">
        <div className="w-full flex justify-center items-center flex-col">
          <img
            src={user.avatar?.url || Uploadimage}
            className="w-[200px] h-[200px] 1000px:w-[300px] 1000px:h-[300px] rounded-full"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
            style={{ display: "none" }}
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="mt-3 text-sm p-2 bg-[#FE90E8] rounded-md border border-black shadow-[4px_4px_1px__rgba(0,0,0,0.3)] cursor-pointer"
          >
            {loadingAvatar ? "Uploading..." : "Change Image"}
          </label>
          {errorAvatar && (
            <p className="text-red-500 mt-2">
              {errorAvatar.data?.message || "Error uploading image"}
            </p>
          )}
        </div>

        <Formik initialValues={{ name: user.name }} onSubmit={handleChangeName}>
          {({ isSubmitting }) => (
            <Form className="space-y-4 w-full my-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Change Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || loadingUserInfo}
                  className="mt-3 text-sm p-2 bg-[#FE90E8] rounded-md border border-black shadow-[4px_4px_1px__rgba(0,0,0,0.3)]"
                >
                  {loadingUserInfo ? "Changing..." : "Change Name"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{ oldPassword: "", newPassword: "" }}
          onSubmit={handleChangePassword}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 w-full">
              <hr />
              <label className="block text-lg font-medium text-gray-700">
                Change Password
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <Field
                  type="password"
                  name="oldPassword"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || loadingChangePass}
                className="mt-3 text-sm p-2 bg-[#FE90E8] rounded-md border border-black shadow-[4px_4px_1px__rgba(0,0,0,0.3)]"
              >
                {loadingChangePass ? "Changing..." : "Change Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Settings;
