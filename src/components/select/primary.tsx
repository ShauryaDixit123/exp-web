import { Form, Select } from "antd";
import React from "react";

export const RenderSelectForm = (props: {
  label?: string;
  placeholder: string;
  name: string;
  w?: string;
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
        label={
          props.label && (
            <span className="font-[700] text-[#666666]">{props.label}</span>
          )
        }
        className={props.w ? `w-[${props.w}]` : "w-[320px]"}
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
