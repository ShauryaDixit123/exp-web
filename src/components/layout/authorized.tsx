"use client";

import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import RenderMainMenuSlider from "@/components/sider/main-menu";
import { Card, Flex, Layout, Modal, notification } from "antd";
import { useRouter } from "next/navigation";
import { ControlOutlined, TeamOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function RenderAuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: `Logged out successfully`,
      description: "Login if you want to continue using the application",
      placement: "bottom",
    });
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem("user_details") || "[]"
    );
    if (userDetails.name === undefined) {
      openNotification();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    if (
      userDetails.name !== undefined &&
      (localStorage.getItem("current_account_id") === null ||
        localStorage.getItem("current_account_id") === "")
    ) {
      setOpen(true);
    }
  }, []);
  return (
    <Layout>
      {contextHolder}
      <Modal
        open={open}
        closable={false}
        title={
          <Flex align="center" vertical>
            <Flex
              gap={"1rem"}
              className="font-[900] p-2 w-full text-[20px] text-[#666666] border-[#333333]"
            >
              <ControlOutlined style={{ fontSize: "2.5em" }} />
              <Flex vertical>
                <span>You have multiple accounts linked </span>
                <span className="text-blue-500 text-[16px]">
                  Select an account to continue
                </span>
              </Flex>
            </Flex>
          </Flex>
        }
        onCancel={() => null}
        footer={<></>}
      >
        {" "}
        <Flex className="mt-4 pt-2" vertical justify="center">
          {JSON.parse(
            localStorage.getItem("user_details") as string
          ).accounts.map(
            (
              v: {
                id: string;
                gst_no: string;
              },
              i: number
            ) => (
              <Card
                onClick={() => (
                  localStorage.setItem("current_account_id", v.id),
                  setOpen(false),
                  router.push("/v1/orders")
                )}
                key={i}
                hoverable
                className="w-[29rem] bg-slate-100 mt-[0.8rem]"
              >
                <Flex gap="2rem">
                  <TeamOutlined
                    style={{
                      fontSize: "1.5em",
                      backgroundColor: "wheat",
                      borderRadius: "50%",
                      padding: "0.8em",
                    }}
                  />
                  <Flex
                    gap="0.2rem"
                    align="center"
                    className="font-[700] text-[18px] text-[#333333]"
                  >
                    <span className="font-[900]">{v.id}</span>
                    <span className="font-[400] text-[14px] text-[#666666]">
                      (GST No <span className="font-[600]">{v.gst_no}</span>)
                    </span>
                  </Flex>
                </Flex>
              </Card>
            )
          )}
        </Flex>
      </Modal>
      <RenderMainMenuSlider />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "white",
            overflow: "auto",
            width: "100%",
          }}
        >
          {open ? (
            <>
              <Image
                className=" top-[680px] left-[1280px] absolute"
                src="/loading.gif"
                width={100}
                height={100}
                alt="empty"
              />
            </>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
