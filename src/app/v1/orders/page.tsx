import RenderOrderCard from "@/components/card/order";
import { Button, Flex } from "antd";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-x-scroll overflow-y-scroll">
      <Flex gap="1rem" justify="space-between" className="w-[100%]">
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>{" "}
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>{" "}
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>{" "}
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>{" "}
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>{" "}
        <Button className=" rounded-xl bg-slate-100 text-[18px] p-[1.5rem] font-[500]">
          Pre production
        </Button>
      </Flex>
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
