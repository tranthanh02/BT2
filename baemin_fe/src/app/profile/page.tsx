"use client";
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const profilePage = () => {
  const router = useRouter();
  return (
    <div className="max-w-7xl m-auto">
      <h2 className=" text-2xl">Profile</h2>
      <Button
        //   href="/login"
        onClick={() => {
          signOut({ redirect: false });
          router.push("/");
        }}
        className="font-normal  leading-5 btn-home	"
        style={{
          fontSize: "18px",
          height: "100%",
          color: "rgb(128, 128, 137)",
        }}
        type="text"
        htmlType="button"
        icon={<SolutionOutlined />}
      >
        LogOut
      </Button>
    </div>
  );
};

export default profilePage;
