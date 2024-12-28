import { Button, Dropdown, Flex, MenuProps, Tooltip } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import React from "react";
import {
  AppstoreAddOutlined,
  BellOutlined,
  PlusCircleOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import RenderNotification from "../custom/notification";
import RenderCreatePurchaseOrderModal from "../buttons/create-purchase-order";
import RenderCreateQuotesModal from "../buttons/get-quotes";

export default function RenderDefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <RenderCreateQuotesModal
          button={
            <Flex
              gap={"0.5rem"}
              className="font-[600] text-[16px] text-[#666666]"
            >
              <AppstoreAddOutlined />
              <span> Request For Quote</span>
            </Flex>
          }
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <RenderCreatePurchaseOrderModal
          button={
            <Flex
              gap={"0.5rem"}
              className="font-[600] text-[16px] text-[#666666]"
            >
              <ReconciliationOutlined />
              <span> Purchase Order</span>
            </Flex>
          }
        />
      ),
    },

    {
      key: "3",
      label: (
        <RenderCreatePurchaseOrderModal
          button={
            <Flex
              gap={"0.5rem"}
              className="font-[600] text-[16px] text-[#666666]"
            >
              <ReconciliationOutlined />
              <span> Sales Order</span>
            </Flex>
          }
        />
      ),
    },
  ];
  return (
    <>
      <Layout className="h-[100vh] w-[100vw] overflow-hidden">
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2rem",
          }}
        >
          <div className="text-3xl font-bold text-white">Build.Better</div>
          <Flex align="center" gap={"1rem"}>
            <Dropdown menu={{ items }}>
              <Button
                style={{ fontSize: "16px", fontWeight: "900", width: "180px" }}
                type="primary"
                icon={<PlusCircleOutlined />}
                iconPosition="end"
              >
                Create
              </Button>
            </Dropdown>
            <RenderNotification
              button={
                <BellOutlined
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    border: "1px solid white",
                  }}
                />
              }
            />
            <Tooltip title="Talk To Team">
              <ThunderboltOutlined
                style={{
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  border: "1px solid white",
                }}
              />
            </Tooltip>
          </Flex>
        </Header>
        <>{children}</>
      </Layout>
    </>
  );
}
