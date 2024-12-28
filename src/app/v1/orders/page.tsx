"use client";
import RenderOrderCard from "@/components/card/order";
import RenderButtonList from "@/components/custom/button-list";
import {
  ExportOutlined,
  HistoryOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-x-scroll overflow-y-scroll">
      <RenderButtonList
        gap="3rem"
        coverFlexJustify="space-between"
        coverClassName="w-[100%]"
        list={[
          { label: "Pre Production", icon: <ExportOutlined /> },
          { label: "In Production", icon: <HistoryOutlined /> },
          { label: "Post Production", icon: <SwitcherOutlined /> },
          { label: "In Packaging", icon: <SwitcherOutlined /> },
          { label: "Shipped", icon: <SwitcherOutlined /> },
          { label: "In Transit", icon: <SwitcherOutlined /> },
          { label: "In Delivery", icon: <SwitcherOutlined /> },
        ]}
      />
      <Flex className="mt-[2rem] h-[80vh] w-[100%]" gap="1rem">
        <Flex
          className="overflow-y-scroll w-[100%] h-[100%] flex-col"
          gap={"3rem"}
        >
          <RenderOrderCard />
          <RenderOrderCard />
          <RenderOrderCard />
          <RenderOrderCard />
          <RenderOrderCard />
        </Flex>
      </Flex>
    </div>
  );
};

export default Page;
