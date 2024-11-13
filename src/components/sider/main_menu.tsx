"use client";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MessageOutlined,
  PoundCircleOutlined,
  ProjectOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function RenderMainMenuSlider() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Sider
      defaultCollapsed
      collapsible
      width={250}
      className="bg-slate-50"
      onCollapse={(collapsed) => setIsOpen(collapsed)}
    >
      <Flex vertical align="center">
        <div className="pt-[4rem] flex flex-col items-center">
          <UserOutlined
            style={{
              fontSize: "1.5em",
              backgroundColor: "wheat",
              borderRadius: "50%",
              padding: "0.5em",
            }}
          />
          {!isOpen && (
            <span className="font-[500] text-[24px] mt-[0.5rem]">Jon Doe</span>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname.split("/")[1]]}
          onClick={({ key }) => router.replace(`/${key.toLowerCase()}`)}
          defaultOpenKeys={[pathname.split("/")[1]]}
          activeKey={pathname.split("/")[1]}
          style={{
            width: "100%",
            height: "100%",
            borderRight: 0,
            fontSize: "24px",
            fontWeight: "300",
            color: "#666666",
            padding: "4rem 1rem",
          }}
          className="bg-slate-50"
          items={[
            {
              key: "Dashboard",
              ref: undefined,

              label: "Dashboard",
              icon: <BarChartOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Products",
              label: "Products",
              ref: undefined,

              icon: <ProjectOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Quotes",
              label: "Quotes",
              ref: undefined,
              icon: <AppstoreOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Orders",
              label: "Orders",
              ref: undefined,

              icon: <ReconciliationOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Payments",
              label: "Payments",
              ref: undefined,

              icon: <PoundCircleOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Chats",
              label: "Chats",
              ref: undefined,

              icon: <MessageOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "Settings",
              ref: undefined,

              label: "Settings",
              icon: <SettingOutlined style={{ fontSize: "1.5rem" }} />,
            },
          ].map((val) => {
            return {
              key: val.key,
              value: val.key,
              label: val.label,
              icon: val.icon,
            };
          })}
        />
      </Flex>
    </Sider>
  );
}
