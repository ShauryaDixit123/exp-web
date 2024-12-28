"use client";
import RenderCreatePurchaseOrderModal from "@/components/buttons/create-purchase-order";
import {
  DownOutlined,
  PlusCircleOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

export default function RenderParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-ful p-4">{children}</div>
    </>
  );
}
