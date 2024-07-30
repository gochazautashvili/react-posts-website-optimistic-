import { useState } from "react";
import SignUp from "./Sign-up";
import SignIn from "./Sing-in";
import axios from "axios";

const Auth = () => {
  const [auth, setAuth] = useState("register");

  const handleSignInWithDemoUser = async () => {
    const data = {
      gmail: "demouser@gmail.com",
      password: "514113131",
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/sign-in`,
      data
    );

    localStorage.setItem("token", res.data);
    window.location.reload();
  };

  return (
    <div className="mx-auto mt-20 flex flex-col p-10 items-center w-[95%] max-w-[500px] rounded bg-sky-700 text-white">
      <h1 className="text-2xl font-bold mb-10">Post Authorization</h1>
      {auth === "register" ? <SignUp setAuth={setAuth} /> : <SignIn />}
      <button
        onClick={handleSignInWithDemoUser}
        type="button"
        className="mt-2 w-full h-10 flex items-center justify-center bg-black/40 text-white border-2 border-black font-bold disabled:bg-slate-600 rounded disabled:cursor-not-allowed"
      >
        Sign in with DemoUser
      </button>
      <div className="mt-3">
        {auth === "register" ? (
          <p
            onClick={() => setAuth("login")}
            className="font-bold cursor-pointer"
          >
            You already have a account? Sing-in
          </p>
        ) : (
          <p
            onClick={() => setAuth("register")}
            className="font-bold cursor-pointer"
          >
            You hav&apos;t account yet? Sign-up
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
