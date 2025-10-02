// import type { Route } from "./+types/home";
// import Hero from "~/components/Hero";
import type { Route } from "./+types";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project } from "~/types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Welcome" },
		{ name: "description", content: "Custom Friendly Blog" },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
	const data = await res.json();
	return { projects: data };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
	// console.log("hello...");
	const { projects } = loaderData;
	return (
		<>
			<FeaturedProjects projects={projects} count={3} />
		</>
	);
};
export default Home;
