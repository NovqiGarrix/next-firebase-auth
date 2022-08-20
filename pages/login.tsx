import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../contexts/AuthContext";
import authServices from "../lib/services/authServices";
import { toast } from "react-toastify";

const initLoginData = {
  email: "",
  password: "",
};

const LoginPage: NextPage = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState(initLoginData);

  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { error, data } = await authServices.loginWithEmail(
        formData.email,
        formData.password
      );

      if (error) {
        toast.error(error);
        return;
      }

      setUser(data!);
    } catch (error: any) {
      toast.error("An error occured while logging in");
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const destination = router.query?.destination as string | undefined;
      const redirect = destination ?? "/";
      router.replace(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className="flex items-center w-full max-h-screen h-screen justify-center font-poppins">
      <div className="flex flex-col items-center justify-center w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-5">Login</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center w-full max-w-md space-y-3"
        >
          <input
            className="w-full max-w-md"
            type="text"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <input
            className="w-full max-w-md"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
          <button className="w-full max-w-md bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            Login
          </button>
        </form>

        <Link href="/signup" passHref>
          <a className="text-base mt-3 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </a>
        </Link>

        <div className="space-x-3 flex items-center">
          <button
            className="items-center mt-5 text-center px-8 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-200"
            onClick={authServices.loginWithGoogle}
          >
            Login With Google
          </button>
          <button
            className="items-center mt-5 text-center px-8 py-2 bg-blue-500 hover:bg-blue-400  text-white rounded-md transition-colors duration-200"
            onClick={authServices.loginWithFacebook}
          >
            Login With Facebook
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
