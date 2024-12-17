"use client";
import apiClient from "@/common/interceptor/api";
import { Form, Select } from "antd";
import React, { useState } from "react";

const RenderSelectAccountUser = (props: {
  placeholder: string;
  role: string;
  name: string;
}) => {
  const [options, setOptions] = useState([]);
  const accountId = localStorage.getItem("current_account_id");
  const reqURL = "users/account_users";
  const list = async () => {
    const resp = await apiClient().post(reqURL, {
      account_id: parseInt(accountId || ""),
      role: props.role,
    });
    setOptions(resp.data.map((v) => ({ value: v.id, label: v.name })));
  };
  return (
    <>
      <Form.Item name={props.name} className="w-[320px]">
        <Select
          variant="filled"
          className="h-[40px]"
          onClick={list}
          placeholder={props.placeholder}
          options={options}
        />
      </Form.Item>
    </>
  );
};

export default RenderSelectAccountUser;
