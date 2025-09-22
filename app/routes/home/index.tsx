// import type { Route } from "./+types/home";
// import Hero from "~/components/Hero";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Welcome" },
		{ name: "description", content: "Custom Friendly Blog" },
	];
}

export default function Home() {
	// console.log("hello...");

	return (
		<>
			{/* <Hero name="Nedum" /> */}
      Home page
		</>
	);
}
