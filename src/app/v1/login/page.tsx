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
      value: "4307b3bc-ce3c-4da1-932b-05ef0591cf44",
      label: "abnc@gm.com : Seller",
    },
    {
      value: "362b004f-be5c-45a1-96e5-f465a013c49e",
      label: "abc@gm.com : Buyer",
    },
  ];
  const getUser = async (id: string) => (
    localStorage.setItem(
      "user_details",
      JSON.stringify(
        (
          await apiClient({ token: id }).get(
            `http://localhost:9000/v1/users/${id}`
          )
        ).data
      )
    ),
    router.push("/quotes")
  );

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
