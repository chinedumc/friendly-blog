// import type { Route } from "./+types/home";
import { log } from "console";
import type { Route } from "./+types";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome" },
    { name: "description", content: "Custom Friendly Blog" },
  ];
}

export default function Home() {
  // console.log("hello...");
  
  return <>My App</>
}
