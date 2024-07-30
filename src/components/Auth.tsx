import { useState } from "react";
import SignUp from "./Sign-up";
import SignIn from "./Sing-in";

const Auth = () => {
  const [auth, setAuth] = useState("register");

  return (
    <div className="mx-auto mt-20 flex flex-col p-10 items-center w-[95%] max-w-[500px] rounded bg-sky-700 text-white">
      <h1 className="text-2xl font-bold mb-10">Post Authorization</h1>
      {auth === "register" ? <SignUp setAuth={setAuth} /> : <SignIn />}
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
