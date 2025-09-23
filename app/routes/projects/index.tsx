import type { Route } from "./+types";

export async function loader({ request }: Route.LoaderArgs): Promise<any> {
	const res = await fetch("http://localhost:8000/projects");
	const data = await res.json();

	return { projects: data };
}

const ProjectsPage = () => {
	return <>Projects Page</>;
};
export default ProjectsPage;
