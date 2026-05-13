import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const media = article.image ? (
    <img className="article-image" src={article.image} alt={article.title} />
  ) : (
    <div className="article-image" />
  );

  const content = (
    <>
      {media}
      <div className="article-body">
        <h3>{article.title}</h3>
        <span>{article.time}</span>
        {article.description && <p>{article.description}</p>}
      </div>
    </>
  );

  if (article.path) {
    return (
      <Link className="article-card article-card-link" to={article.path}>
        {content}
      </Link>
    );
  }

  return <article className="article-card">{content}</article>;
}