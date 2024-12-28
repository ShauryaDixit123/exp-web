"use client";
import { Layout } from "antd";

export default function RenderParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className="h-full w-full bg-white">
      {/* <Header className="p-4 bg-slate-100 mb-6 flex items-center justify-end">
        <RenderCreatePurchaseOrderModal button={" Create PO"} />
      </Header> */}
      {children}
    </Layout>
  );
}
