import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "../../components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

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
	const [searchQuery, setSearchQuery] = useState("");
	const postsPerPage = 3;
	const { posts } = loaderData;

	const filteredPosts = posts.filter((post) => {
		const query = searchQuery.toLowerCase();
		return (
			post.title.toLowerCase().includes(query) ||
			post.excerpt.toLowerCase().includes(query)
		);
	});

	const totalPages = Math.ceil(posts.length / postsPerPage);
	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const currentPost = filteredPosts.slice(indexOfFirst, indexOfLast);

	// console.log(posts);

	return (
		<div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
			<h2 className="text-3xl text-white font-bold mb-8">Blog </h2>

			<PostFilter
				searchQuery={searchQuery}
				onSearchChange={(query) => {
					setSearchQuery(query);
					setCurrentPage(1);
				}}
			/>

			<div className="space-y-8">
				{currentPost.length === 0 ? (
					<p className="text-gray-400 text-center">No Post Found</p>
				) : (
					currentPost.map((post) => <PostCard key={post.slug} post={post} />)
				)}
			</div>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}
		</div>
	);
};

export default BlogsPage;
