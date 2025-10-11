import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";

export async function loader({ request, params }: Route.LoaderArgs) {
	const { slug } = params;

	const url = new URL("/posts-meta.json", request.url);
	const res = await fetch(url.href);

	if (!res.ok) throw new Error("Failed to fetch data");

	const postIndex = await res.json();

	const postMeta = postIndex.find((post: PostMeta) => post.slug === slug);

  if(!postMeta) throw new Response('Not Found',{status:404})

	console.log(slug);
	return {};
}
const BlogDetailsPage = () => {
	return <>Blog Det</>;
};

export default BlogDetailsPage;
