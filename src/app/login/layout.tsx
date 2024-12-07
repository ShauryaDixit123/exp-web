"use client";
import RenderDefaultLayout from "@/components/layout/default";
import React from "react";

export default function RenderInternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RenderDefaultLayout>{children}</RenderDefaultLayout>;
}
