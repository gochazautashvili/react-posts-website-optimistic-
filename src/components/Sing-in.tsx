import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../schema/schemas";
import { z } from "zod";

type UserData = z.infer<typeof SignInSchema>;

const SignIn = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<UserData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (user: UserData) => {
    const { data, error } = SignInSchema.safeParse(user);

    if (error) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        data
      );

      localStorage.setItem("token", res.data);
      window.location.reload();
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
        type="email"
        {...register("gmail")}
        placeholder={errors.gmail ? errors.gmail.message : "example@gmail.com"}
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <input
        type="text"
        {...register("password")}
        placeholder={errors.password ? errors.password.message : "*********"}
        className="w-full h-10 rounded text-white bg-transparent px-4 border border-white"
      />
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full h-10 flex items-center justify-center bg-black text-white round font-bold disabled:bg-slate-600 rounded disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Sing in"}
      </button>
    </form>
  );
};

export default SignIn;
