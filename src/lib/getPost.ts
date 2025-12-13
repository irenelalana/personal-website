import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  content: string;
  title: string;
  excerpt: string;
  date: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

const postsDirectory = path.join(process.cwd(), "content");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      seo: data.seo,
    };
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    seo: data.seo,
  };
}
