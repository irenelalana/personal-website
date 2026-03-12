import Link from "next/link";
import { getAllPosts } from "@/lib/getPost";
import { format, parseISO } from "date-fns";
import styles from "./blog.module.css";

export default function BlogPage(): React.JSX.Element {
  const posts = getAllPosts();

  return (
    <section id="blog-modern" className={styles.container}>
      
      {/* HEADER DEL BLOG */}
      <div className={styles.header}>
        <h1>Blog & Insights</h1>
        <p>Tips, news, and thoughts on fitness, swimming, and well-being.</p>
      </div>

      {/* CUADRÍCULA DE ARTÍCULOS */}
      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <div className={styles.cardContent}>
              
              {/* Fecha (Meta info) */}
              <div className={styles.meta}>
                <span className={styles.date}>
                  📅 {format(parseISO(post.date), "MMMM d, yyyy")}
                </span>
              </div>

              {/* Título */}
              <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                <h2 className={styles.title}>{post.title}</h2>
              </Link>

              {/* Extracto */}
              <p className={styles.excerpt}>
                {post.excerpt}
              </p>

            </div>

            {/* Botón Leer Más (Empujado hacia abajo con flexbox) */}
            <div className={styles.cardFooter}>
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read more <span className={styles.arrow}>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
