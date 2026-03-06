import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import { getAllPosts, getPostBySlug } from "@/lib/getPost";

// ... generateStaticParams y generateMetadata se mantienen igual ...

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
    <div className="post-page-wrapper">
      {/* BOTÓN VOLVER */}
      <div className="post-navigation">
        <Link href="/blog" className="back-to-blog">
          ← Back to Blog
        </Link>
      </div>

      <article className="post-container">
        {/* CABECERA DEL POST */}
        <div className="post-header">
          <div className="post-category">Fitness & Well-being</div>
          <h1 className="post-main-title">{post.title}</h1>
          
          <div className="post-info">
            <span className="post-date">
              Published on {format(parseISO(post.date), "MMMM d, yyyy")}
            </span>
            <span className="post-author">By Irela Aqua & Fitness</span>
          </div>
          
          <div className="post-separator"></div>
        </div>

        {/* CONTENIDO DEL POST */}
        <div 
          className="post-content-body"
          dangerouslySetInnerHTML={{
            __html: processedContent.toString(),
          }}
        />

        {/* PIE DE POST (Opcional) */}
        <footer className="post-footer">
          <p>Did you enjoy this article? Share it with your community!</p>
          <div className="post-share-placeholder">
            {/* Aquí podrías añadir iconos de redes sociales en el futuro */}
          </div>
        </footer>
      </article>
    </div>
  );
}