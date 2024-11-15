import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button, Flex, Input, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import RenderMainMenuSlider from "@/components/sider/main_menu";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { Header, Content, Sider } = Layout;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-[100vh] w-[100vw] antialiased`}
      >
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
              <Input className="w-[300px]" placeholder="Search..." />
              <Button style={{ fontSize: "16px" }} type="primary">
                Get Quotes Now!
              </Button>
            </Flex>
          </Header>
          <Layout>
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
        </Layout>
      </body>
    </html>
  );
}
