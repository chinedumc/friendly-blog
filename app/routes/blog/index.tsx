import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "../../components/PostCard";
import Pagination from "~/components/Pagination";

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
	const url = new URL("/posts-meta.json", request.url);
	const res = await fetch(url.href);

	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();

	return { posts: data };
}

const BlogsPage = ({ loaderData }: Route.ComponentProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 4;
	const { posts } = loaderData;

	const totalPages = Math.ceil(posts.length / postsPerPage);
	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const currentPost = posts.slice(indexOfFirst, indexOfLast);

	// console.log(posts);

	return (
		<div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
			<h2 className="text-3xl text-white font-bold mb-8">Blog Page</h2>
			{currentPost.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={(page) => setCurrentPage}
				/>
			)}
		</div>
	);
};

export default BlogsPage;
