// import type { Route } from "./+types/home";
// import Hero from "~/components/Hero";
import type { Route } from "./+types";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Welcome" },
		{ name: "description", content: "Custom Friendly Blog" },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
	const url = new URL(request.url);
	const [projectRes, postRes] = await Promise.all([
		fetch(`${import.meta.env.VITE_API_URL}/projects`),
		fetch(new URL("/posts-meta.json", url)),
	]);

	if (!projectRes.ok || !postRes.ok) {
		throw new Error("Failed to fetch projects or posts");
	}

	const [projects, posts] = await Promise.all([
		projectRes.json(),
		postRes.json(),
	]);

	console.log(projects, posts);

	return { projects, posts };
}

const Home = ({ loaderData }: Route.ComponentProps) => {
	// console.log("hello...");
	const { projects } = loaderData;
	return (
		<>
			<FeaturedProjects projects={projects} count={3} />
			<AboutPreview />
		</>
	);
};
export default Home;
