// import type { Route } from "./+types/home";
// import Hero from "~/components/Hero";
import type { Route } from "./+types";
import FeaturedProjects from "~/components/FeaturedProjects";

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
			<FeaturedProjects />
		</>
	);
}
