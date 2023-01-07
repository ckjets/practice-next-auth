"use client";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { FormEventHandler, MouseEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
    });

    console.log("res", res);
  };

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signOut();
  };

  // return <p>test</p>;
  return (
    <>
      {session ? (
        <>
          <p>ログイン済みです</p>
          <button onClick={handleSignOut}>ログアウト</button>
        </>
      ) : (
        <>
          <div>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                value={userInfo.email}
                placeholder="Email"
                onChange={({ target }) => {
                  setUserInfo({
                    ...userInfo,
                    email: target.value,
                  });
                }}
              />
              <input
                type="password"
                value={userInfo.password}
                placeholder="Password"
                onChange={({ target }) => {
                  setUserInfo({
                    ...userInfo,
                    password: target.value,
                  });
                }}
              />

              <button type="submit">ログイン</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
