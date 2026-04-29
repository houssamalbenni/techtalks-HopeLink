export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="article-image" />
      <div className="article-body">
        <h3>{article.title}</h3>
        <span>{article.time}</span>
      </div>
    </article>
  );
}
