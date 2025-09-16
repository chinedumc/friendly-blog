import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "The friendly blog" },
    { name: "description", content: "Custom Friendly Blog" },
  ];
}

export default function Home() {
  return <>My App</>
}
