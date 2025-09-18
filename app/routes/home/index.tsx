// import type { Route } from "./+types/home";
import type { Route } from "./+types";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome" },
    { name: "description", content: "Custom Friendly Blog" },
  ];
}

export default function Home() {
  return <>My App</>
}
