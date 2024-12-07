"use client";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MessageOutlined,
  PoundCircleOutlined,
  ProfileOutlined,
  ProjectOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Flex, Menu, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function RenderMainMenuSlider() {
  const router = useRouter();
  const pathname = usePathname();
  const userDetails = JSON.parse(localStorage.getItem("user_details") || "[]");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Sider
      defaultCollapsed
      collapsible
      width={250}
      className="bg-slate-50"
      onCollapse={(collapsed) => setIsOpen(collapsed)}
    >
      <Flex className=" h-full overflow-y-scroll " vertical align="center">
        <div className="pt-[4rem] flex flex-col items-center">
          {/* <Dropdown> */}
          <UserOutlined
            style={{
              fontSize: "1.5em",
              backgroundColor: "wheat",
              borderRadius: "50%",
              padding: "0.5em",
            }}
          />
          {!isOpen && (
            <Flex vertical align="center">
              <span className="font-[500] text-[24px] mt-[0.5rem]">
                {userDetails.name}
              </span>
              <span className="font-[600] mt-[-0.2rem] text-[#666666] text-[16px]">
                ( Account Number : {localStorage.getItem("current_account_id")}{" "}
                )
              </span>
            </Flex>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname.split("/")[2]]}
          onClick={({ key }) =>
            key == "accounts:2"
              ? (localStorage.setItem("user_details", ""),
                localStorage.setItem("current_account_id", ""),
                router.push("/login"))
              : key.includes("accounts")
              ? null
              : router.replace(`/v1/${key.toLowerCase()}`)
          }
          defaultOpenKeys={[pathname.split("/")[2]]}
          activeKey={pathname.split("/")[2]}
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
              key: "dashboard",
              ref: undefined,

              label: "Dashboard",
              icon: <BarChartOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "products",
              label: "Products",
              ref: undefined,

              icon: <ProjectOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "quotes",
              label: "Quotes",
              ref: undefined,
              icon: <AppstoreOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "orders",
              label: "Orders",
              ref: undefined,

              icon: <ReconciliationOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "payments",
              label: "Payments",
              ref: undefined,

              icon: <PoundCircleOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "chats",
              label: "Chats",
              ref: undefined,

              icon: <MessageOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "settings",
              ref: undefined,

              label: "Settings",
              icon: <SettingOutlined style={{ fontSize: "1.5rem" }} />,
            },
            {
              key: "account",
              label: "Account",
              icon: <ProfileOutlined style={{ fontSize: "1.5rem" }} />,
              children: [
                {
                  type: "group",
                  key: "accounts.group",
                  children: [
                    {
                      label: "Accounts",
                      key: "accounts:1",
                      icon: (
                        <UserSwitchOutlined style={{ fontSize: "1.5rem" }} />
                      ),
                      children: [
                        ...JSON.parse(
                          localStorage.getItem("user_details") || "[]"
                        ).accounts.map((v: { id: string; gst_no: string }) => ({
                          label: (
                            <Tooltip
                              title={
                                <Flex
                                  gap="0.2rem"
                                  align="center"
                                  className="font-[700] text-[18px] text-[#333333]"
                                >
                                  <span className="font-[900]">{v.id}</span>
                                  <span className="font-[400] text-[14px] text-[#666666]">
                                    (GST No{" "}
                                    <span className="font-[600]">
                                      {v.gst_no}
                                    </span>
                                    )
                                  </span>
                                </Flex>
                              }
                            >
                              <Flex
                                gap="0.2rem"
                                align="center"
                                className="font-[700] text-[18px] text-[#333333]"
                              >
                                <span className="font-[900]">{v.id}</span>
                                <span className="font-[400] text-[14px] text-[#666666]">
                                  (GST No{" "}
                                  <span className="font-[600]">{v.gst_no}</span>
                                  )
                                </span>
                              </Flex>
                            </Tooltip>
                          ),
                        })),
                      ],
                    },
                    {
                      label: "Logout",
                      key: "accounts:2",
                      icon: <SunOutlined style={{ fontSize: "1.5rem" }} />,
                    },
                  ],
                },
              ],
            },
          ].map((val) => {
            return {
              key: val.key,
              value: val.key,
              label: val.label,
              icon: val.icon,
              children: val.children,
            };
          })}
        />
      </Flex>
    </Sider>
  );
}
