"use client";
import apiClient from "@/common/interceptor/api";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const Page = () => {
  const router = useRouter();
  const ref = useRef(null);
  const users = [
    {
      value: "e89c69c9-74bf-4c59-bdf0-1ebdd3fd7d73",
      label: "frank@example.com: Seller",
    },
    {
      value: "5d74f8e4-8b2f-400f-93f2-1d2e973f2a01",
      label: "alice@example.com : Buyer",
    },
  ];
  const getUser = async (id: string) => {
    const user = (
      await apiClient({ token: id }).get(`http://localhost:9000/v1/users/${id}`)
    ).data;
    localStorage.setItem("user_details", JSON.stringify(user));
    if (user.accounts.length === 1) {
      localStorage.setItem("current_account_id", user.accounts?.[0].id);
    }
    router.push("/v1/orders");
  };

  return (
    <Select
      ref={ref}
      placeholder="Select a user"
      className="w-[240px]"
      options={users}
      optionRender={(option) => {
        return (
          <div
            onClick={() => getUser(option.value as string)}
            className="flex gap-2 items-center"
          >
            <div className="font-bold">{option.label}</div>
          </div>
        );
      }}
    />
  );
};

export default Page;
