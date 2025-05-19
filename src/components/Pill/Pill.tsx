"use client";

import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PillProps = {
  text: string;
  color?: "default" | "destructive" | "success" | "custom" | "primary" | "warning";
  href?: string;
};

const Pill = ({ text, color = "default", href }: PillProps) => {
  const colorMap = {
    default: "",
    destructive: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    custom: "bg-purple-500 text-white border border-purple-900",
    primary: "bg-blue-500 text-white",
    warning: "bg-yellow-400 text-black",
  };

  const badge = (
    <Badge className={cn("rounded-full text-sm px-4 py-1", colorMap[color])}>
      {text}
    </Badge>
  );

  return href ? <Link href={href}>{badge}</Link> : badge;
};

export default Pill;
