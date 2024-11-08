"use client";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Card, Flex, Steps } from "antd";
import React from "react";

const RenderOrderCard = () => {
  const { Step } = Steps;
  return (
    <Card hoverable style={{ width: "100%" }}>
      <span className="font-[500] text-[16px] text-[#666666]">Status:</span>
      <Flex className="mt-4" gap="3rem">
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Order No.
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Product Name
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Quantity
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Incoterms
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Order Placed on
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
        <Flex vertical>
          <span className="font-[600] text-[18px] text-blue-500 ">
            Order No.
          </span>
          <span className="font-[300] text-[14px] text-[#666666]">#9999</span>
        </Flex>
      </Flex>
      <div className="w-[100%] overflow-x-scroll">
        <Steps
          direction="horizontal" // This sets the Steps component to display horizontally
          style={{
            marginTop: "2rem",
          }}
          className="gap-[1rem]"
        >
          {/* <div> */}
          {[
            {
              title: "Create a services site",
              description: "2015-09-01",
            },
            {
              title: "Solve initial network problems",
              description: "2015-09-01",
            },
            {
              title: "Technical testing",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
            {
              title: "Network problems being solved",
              description: "2015-09-01",
            },
          ].map((v, idx) => (
            <Step className="min-w-[300px]" {...v} key={idx} />
          ))}
          {/* </div> */}
        </Steps>
      </div>
      <Flex justify="end">
        <Flex gap={"0.5rem"} className="font-[600] text-[18px] text-blue-500 ">
          <span>View</span> <DoubleRightOutlined />
        </Flex>
      </Flex>
    </Card>
  );
};

export default RenderOrderCard;
