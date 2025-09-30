import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types";
import type { Project } from "~/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Friendly Dev | Projects" },
		{ name: "description", content: "Site of Friendly Blog" },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch("http://localhost:8000/projects");
	const data = await res.json();

	return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
	// console.log(projects);

	const [selectedCategory, setSelectedCategory] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 5;

	const { projects } = loaderData as { projects: Project[] };

	//Get unique categories
	const categories = [
		"All",
		...new Set(projects.map((project) => project.category)),
	];

	//Filter projects based on the category
	const filteredProjects =
		selectedCategory === "All"
			? projects
			: projects.filter((project) => project.category === selectedCategory);

	//Calculate total pages
	const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

	//Get current pages projects
	const indexOfLast = currentPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

	//Button to render Pagination
	// const renderPagination = () => (
	// 	<div className="flex justify-center gap-2 mt-8">
	// 		{Array.from({ length: totalPages }, (_, idx) => (
	// 			<button
	// 				key={idx + 1}
	// 				className={`px-3 py-1 cursor-pointer rounded ${currentPage === idx + 1 ? "bg-blue-600 " : "bg-gray-700 text-gray-200"}`}
	// 				onClick={() => setCurrentPage(idx + 1)}
	// 			>
	// 				{idx + 1}
	// 			</button>
	// 		))}
	// 	</div>
	// );

	return (
		<>
			<h2 className="text-3xl font-bold mb-8"> Projects</h2>

			<div className="flex flex-wrap gap-2 mb-8">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => {
							setSelectedCategory(category);
							setCurrentPage(1);
						}}
						className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
					>
						{category}
					</button>
				))}
			</div>
			<AnimatePresence mode="wait">
				<motion.div layout className="grid gap-6 sm:grid-cols-2">
					{currentProjects.map((project) => (
						<motion.div layout key={project.id}>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>

			{/* {totalPages > 1 && renderPagination()} */}
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</>
	);
};
export default ProjectsPage;
