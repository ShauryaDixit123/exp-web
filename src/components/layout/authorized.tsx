"use client";

import React, { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import RenderMainMenuSlider from "@/components/sider/main-menu";
import { Layout, notification } from "antd";
import { useRouter } from "next/navigation";

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
  }, []);
  return (
    <Layout>
      {contextHolder}
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
