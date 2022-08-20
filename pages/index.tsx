import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";
import authServices from "../lib/services/authServices";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fragment>
      {user && (
        <div className="mx-auto my-auto flex items-center justify-center h-screen flex-col space-y-5">
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <h1 className="font-poppins text-7xl text-green-500 font-semibold">
            Hello World!
          </h1>

          <button
            onClick={() => authServices.logout(setUser)}
            className="bg-red-400 items-center text-center px-8 py-2 rounded-md text-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Home;