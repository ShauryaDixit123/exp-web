"use client";
import { Flex, Select } from "antd";
import Form, { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const Page = () => {
  const [form] = useForm();
  return <Flex align="center">
    <Form className="flex w-[80%] flex-wrap gap-[10px] justify-between" form={form} layout="vertical">
    {/* <Flex gap="36px"> */}
      <FormItem label="Title" className="w-[220px]">
        <Input/>
      </FormItem>
      <FormItem label="Description" className="w-[220px]">
        <Input/>
      </FormItem>
      <FormItem label="Inco Terms" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
    {/* </Flex> */}
      <FormItem label="Pickup Location" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <FormItem label="Drop Location" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <FormItem label="Payment Terms" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <FormItem label="TAT" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <FormItem label="Due Date" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <Flex gap="36px">
      <FormItem label="Status" className="w-[220px]">
        <Select options={[
          {value: "EXW", label : "Ex works"}
        ]}/>
      </FormItem>
      <FormItem label="Terms and Conditions" className="w-[380px] h-[120px]">
        <TextArea className="w-[380px] h-[120px]"/>
      </FormItem>
      </Flex>
    </Form>
  </Flex>
};

export default Page;
