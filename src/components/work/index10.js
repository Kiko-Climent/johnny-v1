"use client"

import dynamic from "next/dynamic";
const WorkMenuContent = dynamic(() => import("./WorkMenuContent"), {
  ssr: false,
});

export default function WorkMenu10() {
  return <WorkMenuContent />;
}