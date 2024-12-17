import apiClient from "@/common/interceptor/api";
import { Form, Select } from "antd";
import React, { useState } from "react";

const RenderSelectUserLocations = (props: {
  placeholder: string;
  name: string;
  userId: string;
}) => {
  const [options, setOptions] = useState([]);
  const reqURL = "users/locations";
  const list = async () => {
    const resp = await apiClient().post(reqURL, {
      user_id: props.userId,
    });
    setOptions(
      resp.data.map((v) => ({
        value: v.id,
        label: `${v.line1},${v.line2}, ${v.area}, ${v.city}, ${v.state}, ${v.country_id}`,
      }))
    );
  };
  return (
    <>
      {" "}
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

export default RenderSelectUserLocations;
