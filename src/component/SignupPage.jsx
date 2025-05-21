import { useForm } from "react-hook-form";
import InputField from "./InputField";
import authService from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const userData = await authService.getCurrentUser();
      if (!userData) {
        const session = await authService.createAccount(data);
        if (session) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            setLoading(false);
            navigate("/profilePage");
          }
        }
      } else {
        setLoading(false);
        setErrorMessage(
          "You are already logged in. Please logout before Login"
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.error("Error during signup:", error);
    }
  };

  return loading ? (
    <Loader text="Creating Account" />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md h-screen mx-auto p-6 bg-white rounded-xl shadow-sm  justify-between flex flex-col"
    >
      <div className="flex-grow">
        <h2 className="text-[35px] font-bold text-left mb-4">
          Create your PopX account
        </h2>

        <div className="mb-6">
          <InputField
            className="mb-2"
            label="Full Name"
            placeholder="Marry Doe"
            type="text"
            required
            {...register("name", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.name && (
            <p className=" text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <InputField
            className="mb-2"
            label="Phone number"
            placeholder="Marry Doe"
            type="tel"
            required
            {...register("PhoneNumber", {
              required: { value: true, message: "This field is required" },
              pattern: {
                value: /^\d{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {errors.PhoneNumber && (
            <p className=" text-sm text-red-600">
              {errors.PhoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <InputField
            className="mb-2"
            label="Email address"
            placeholder="Marry Doe"
            type="email"
            required
            {...register("email", {
              required: { value: true, message: "This field is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Enter a valid Gmail address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <InputField
            className="mb-2"
            label="Password"
            placeholder="Marry Doe"
            type="password"
            required
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
              maxLength: {
                value: 24,
                message: "Maximum 24 characters allowed",
              },
            })}
          />
          {errors.password && (
            <p className=" text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6">
          <InputField
            className="mb-2"
            label="Company"
            placeholder="Marry Doe"
            type="company"
            {...register("company")}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you an Agency?<span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="yes"
                {...register("agency", { required: true })}
                className="accent-violet-800"
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="no"
                {...register("agency", { required: true })}
                className="accent-violet-800"
              />
              No
            </label>
          </div>

          {errors.agency && (
            <p className=" text-sm text-red-600">This field is required</p>
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-600 mb-4 text-center">{errorMessage}</p>
      )}

      <div className="mt-auto">
        <button
          type="submit"
          className="w-full bg-violet-800 text-white py-3 px-4 rounded-lg hover:bg-violet-900 "
        >
          Create Account
        </button>
      </div>
    </form>
  );
};
export default SignupPage;
