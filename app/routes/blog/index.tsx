import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "../../components/PostCard";

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
	const { posts } = loaderData;
	// console.log(posts);

	return (
		<div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
			<h3 className="text-3xl text-white font-bold mb-8">Blog Page</h3>
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	);
};

export default BlogsPage;
