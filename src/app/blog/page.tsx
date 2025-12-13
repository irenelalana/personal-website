import Link from "next/link";
import { getAllPosts } from "@/lib/getPost";
import { format, parseISO } from "date-fns";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-3xl mb-8">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-b pb-6"
          >
            <h2 className="text-2xl mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 mb-2">
              {post.excerpt}
            </p>

            <p className="text-sm text-gray-400">
              {format(parseISO(post.date), "MMMM d, yyyy")}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-sm underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
