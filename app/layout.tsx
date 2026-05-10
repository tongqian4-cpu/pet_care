import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "泡泡爪宠物洗护 | 宠物洗澡美容预约",
  description:
    "泡泡爪宠物洗护提供犬猫洗澡、美容修剪、皮毛护理、除味护理和预约到店服务。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
