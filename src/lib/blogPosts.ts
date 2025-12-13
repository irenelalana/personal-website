export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "beneficios-pilates",
    title: "Beneficios del Pilates",
    excerpt: "Descubre cómo el pilates mejora tu fuerza y movilidad.",
    content: `
      <p>El pilates es una disciplina fantástica para...</p>
      <p>Mejora la postura, el core y la movilidad.</p>
    `,
    date: "2025-01-10",
  },
  {
    slug: "entrenamiento-funcional",
    title: "Entrenamiento Funcional: qué es",
    excerpt: "Todo lo que debes saber sobre el functional training.",
    content: `
      <p>El entrenamiento funcional se basa en...</p>
    `,
    date: "2025-01-05",
  },
];
