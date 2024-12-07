"use client";
import RenderAuthorizedLayout from "@/components/layout/authorized";
import RenderDefaultLayout from "@/components/layout/default";
import React from "react";

export default function RenderParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RenderDefaultLayout>
      <RenderAuthorizedLayout>{children}</RenderAuthorizedLayout>
    </RenderDefaultLayout>
  );
}
