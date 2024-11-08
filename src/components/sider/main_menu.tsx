"use client";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MessageOutlined,
  PoundCircleOutlined,
  ProjectOutlined,
  ReconciliationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RenderMainMenuSlider() {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState("Orders");
  useEffect(() => {
    setCurrent(pathname.split("/")[1]);
    console.log(current, "ccmmcmc");
  }, [pathname]);
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[current]}
      onClick={({ key }) => router.replace(`/${key.toLowerCase()}`)}
      defaultOpenKeys={[current]}
      activeKey={current}
      style={{
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
          icon: <BarChartOutlined />,
        },
        {
          key: "Products",
          label: "Products",
          ref: undefined,

          icon: <ProjectOutlined />,
        },
        {
          key: "Quotes",
          label: "Quotes",
          ref: undefined,
          icon: <AppstoreOutlined />,
        },
        {
          key: "Orders",
          label: "Orders",
          ref: undefined,

          icon: <ReconciliationOutlined />,
        },
        {
          key: "Payments",
          label: "Payments",
          ref: undefined,

          icon: <PoundCircleOutlined />,
        },
        {
          key: "Chats",
          label: "Chats",
          ref: undefined,

          icon: <MessageOutlined />,
        },
        {
          key: "Settings",
          ref: undefined,

          label: "Settings",
          icon: <SettingOutlined />,
        },
      ].map((val) => {
        return {
          key: val.key,
          value: val.key,
          label: val.label,
          icon: val.icon,
          //   icon: BarChartOutlined,
        };
      })}
    />
  );
}
