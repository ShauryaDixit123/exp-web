import { Flex } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import React from "react";
import RenderGetQuotesButton from "../buttons/get-quotes";

export default function RenderDefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout className="h-[100vh] w-[100vw] overflow-hidden">
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="text-3xl font-bold text-white">Build.Better</div>
          <Flex gap={"1rem"}>
            <RenderGetQuotesButton />
          </Flex>
        </Header>
        <>{children}</>
      </Layout>
    </>
  );
}
