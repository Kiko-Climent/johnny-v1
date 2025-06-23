"use client"

import dynamic from "next/dynamic";
const WorkMenu10Content = dynamic(() => import("./WorkMenuContent"), {
  ssr: false,
});

export default function WorkMenu10() {
  return <WorkMenu10Content />;
}