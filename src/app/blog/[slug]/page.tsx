import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getPostBySlug } from "@/lib/getPost";
import styles from "./blogpost.module.css";

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
    <div className={styles.wrapper}>
      {/* BOTÓN VOLVER */}
      <nav className={styles.navigation}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
      </nav>

      <article className={styles.container}>
        {/* CABECERA DEL POST */}
        <header className={styles.header}>
          <div className={styles.category}>Fitness & Well-being</div>
          <h1 className={styles.mainTitle}>{post.title}</h1>
          
          <div className={styles.info}>
            <span className={styles.date}>
              Published on {format(parseISO(post.date), "MMMM d, yyyy")}
            </span>
            <span className={styles.author}>By Irela Aqua & Fitness</span>
          </div>
          
          <div className={styles.separator}></div>
        </header>

        {/* CONTENIDO DEL POST (HTML Dinámico) */}
        <div 
          className={styles.contentBody}
          dangerouslySetInnerHTML={{
            __html: processedContent.toString(),
          }}
        />

        {/* PIE DE POST */}
        <footer className={styles.footer}>
          <p>Did you enjoy this article? Share it with your community!</p>
          <div className={styles.sharePlaceholder}>
            {/* Espacio para futuros iconos sociales */}
          </div>
        </footer>
      </article>
    </div>
  );
}
