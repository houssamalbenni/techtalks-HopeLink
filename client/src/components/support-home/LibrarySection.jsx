import ArticleCard from "./ArticleCard";

export default function LibrarySection({ title, items }) {
  return (
    <section className="library-section">
      <h2>{title}</h2>
      <div className="article-grid">
        {items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
