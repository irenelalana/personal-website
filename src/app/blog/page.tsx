import Link from "next/link";
import { getAllPosts } from "@/lib/getPost";
import { format, parseISO } from "date-fns";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section id="blog-modern" className="blog-page-container">
      
      {/* HEADER DEL BLOG */}
      <div className="blog-header">
        <h1>Blog & Insights</h1>
        <p>Tips, news, and thoughts on fitness, swimming, and well-being.</p>
      </div>

      {/* CUADRÍCULA DE ARTÍCULOS */}
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <div className="blog-card-content">
              
              {/* Fecha (Meta info) */}
              <div className="blog-meta">
                <span className="blog-date">
                  📅 {format(parseISO(post.date), "MMMM d, yyyy")}
                </span>
              </div>

              {/* Título */}
              <Link href={`/blog/${post.slug}`} className="blog-title-link">
                <h2 className="blog-title">{post.title}</h2>
              </Link>

              {/* Extracto */}
              <p className="blog-excerpt">
                {post.excerpt}
              </p>

            </div>

            {/* Botón Leer Más (Empujado hacia abajo con flexbox) */}
            <div className="blog-card-footer">
              <Link href={`/blog/${post.slug}`} className="blog-read-more">
                Read more <span className="arrow">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
