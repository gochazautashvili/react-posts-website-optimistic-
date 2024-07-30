import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "../schema/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type UserData = z.infer<typeof SignUpSchema>;

const SignUp = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<UserData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (user: UserData) => {
    const { data, error } = SignUpSchema.safeParse(user);

    if (error) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/sign-up`, data);
      setAuth("login");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 w-full"
    >
      {error && (
        <h1 className="text-center font-semibold text-red-400">{error}</h1>
      )}
      <input
        type="text"
        {...register("username")}
        placeholder={
          errors.username ? errors.username.message : "Enter your username"
        }
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <input
        type="email"
        {...register("gmail")}
        placeholder={errors.gmail ? errors.gmail.message : "example@gmail.com"}
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <input
        type="text"
        placeholder={errors.password ? errors.password.message : "*********"}
        {...register("password")}
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <input
        type="text"
        {...register("avatar")}
        placeholder={errors.avatar ? errors.avatar.message : "image link"}
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <button
        disabled={isSubmitting || !isValid}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-black text-white round font-bold disabled:bg-slate-600 rounded disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Sing up"}
      </button>
    </form>
  );
};

export default SignUp;
