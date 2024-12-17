import { Form, Select } from "antd";
import React from "react";

export const RenderSelectForm = (props: {
  placeholder: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}) => {
  return (
    <div>
      {" "}
      <Form.Item
        name={props.name}
        label={<span className="font-[700] text-[#666666]">Payment Type</span>}
        className="w-[240px]"
      >
        <Select
          variant="filled"
          className="h-[40px]"
          placeholder={props.placeholder}
          options={props.options}
        />
      </Form.Item>
    </div>
  );
};
