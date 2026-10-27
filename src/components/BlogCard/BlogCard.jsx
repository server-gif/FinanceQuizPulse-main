import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCalendar, FiClock } from 'react-icons/fi';
import { useArticleLink } from '../../hooks/useArticleLink';
import ArticleImage from '../ArticleImage/ArticleImage';
import './BlogCard.css';

/** Article teaser card. The whole card is one accessible link to the article. */
export default function BlogCard({ blog }) {
  const { to, onClick } = useArticleLink(blog.slug);

  return (
    <article className="blog-card">
      <Link to={to} onClick={onClick} className="blog-card__link">
        {/* Full-bleed background image */}
        <div className="blog-card__media" aria-hidden="true">
          <ArticleImage src={blog.image} alt="" className="blog-card__image" />
        </div>

        {/* Top row */}
        <div className="blog-card__top">
          <span className="blog-card__cat">{blog.category}</span>
          {blog.readTime && (
            <span className="blog-card__time">
              <FiClock aria-hidden="true" />
              {blog.readTime}
            </span>
          )}
        </div>

        {/* Bottom content over the gradient */}
        <div className="blog-card__content">
          <h3 className="blog-card__title">{blog.title}</h3>

          <div className="blog-card__reveal">
            <p className="blog-card__excerpt">{blog.excerpt}</p>
          </div>

          <div className="blog-card__footer">
            <span className="blog-card__date">
              <FiCalendar aria-hidden="true" />
              <time dateTime={blog.isoDate}>{blog.date}</time>
            </span>
            <span className="blog-card__cta">
              Read
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Image alt text for screen readers */}
        {blog.imageAlt && <span className="blog-card__sr">{blog.imageAlt}</span>}
      </Link>
    </article>
  );
}