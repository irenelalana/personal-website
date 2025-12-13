import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";

import { getAllPosts, getPostBySlug } from "@/lib/getPost";

/* ─────────────────────────────
   1️⃣ SSG REAL (build time)
───────────────────────────── */
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/* ─────────────────────────────
   2️⃣ SEO POR ARTÍCULO
───────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
  };
}

/* ─────────────────────────────
   3️⃣ PÁGINA DEL ARTÍCULO
───────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const processedContent = await remark()
    .use(html)
    .process(post.content);

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: processedContent.toString(),
        }}
      />
    </article>
  );
}
