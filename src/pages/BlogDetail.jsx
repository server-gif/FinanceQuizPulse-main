import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiLink,
  FiShare2,
} from 'react-icons/fi';
import ArticleContent from '../components/ArticleContent/ArticleContent';
import ArticleImage from '../components/ArticleImage/ArticleImage';
import BlogGrid from '../components/BlogGrid/BlogGrid';
import CategorySection from '../components/CategorySection/CategorySection';
import Container from '../components/Container/Container';
import SEO from '../components/SEO/SEO';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogs';
import { getCategoryBySlug } from '../data/categories';
import NotFound from './NotFound';
import './BlogDetail.css';

/** Thin bar at the top of the screen that fills as you read the article. */
function useReadingProgress(targetRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const read = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? read / total : 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetRef]);

  return progress;
}

/** Copy-link + native share buttons. */
function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  const share = () => {
    navigator.share({ title, url: window.location.href }).catch(() => {});
  };

  return (
    <div className="post__share">
      <button
        type="button"
        className="post__share-btn"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? <FiCheck aria-hidden="true" /> : <FiLink aria-hidden="true" />}
      </button>
      {canShare && (
        <button
          type="button"
          className="post__share-btn"
          onClick={share}
          aria-label="Share article"
          title="Share"
        >
          <FiShare2 aria-hidden="true" />
        </button>
      )}
      <span className="post__share-status" role="status">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);
  const articleRef = useRef(null);
  const progress = useReadingProgress(articleRef);

  if (!blog) return <NotFound />;

  const section = getCategoryBySlug(blog.section);
  const related = getRelatedBlogs(blog, 3);

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        image={blog.ogImage}
        // The Open Graph image is the article photograph itself (1200x675),
        // so its alt text describes the photo rather than a separate cover.
        imageAlt={`${blog.title} — article photograph`}
        type="article"
        path={`/blog/${blog.slug}`}
        article={{ publishedTime: blog.isoDate, author: blog.author, section: blog.category }}
      />

      {/* Reading progress */}
      <div className="post__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <article className="post" key={blog.slug} ref={articleRef}>
        <div className="post__bg" aria-hidden="true" />

        {/* ---------- Header ---------- */}
        <Container size="narrow">
          <nav className="post__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight aria-hidden="true" />
            {section && (
              <>
                <Link to={`/category/${section.slug}`}>{section.name}</Link>
                <FiChevronRight aria-hidden="true" />
              </>
            )}
            <span className="post__crumb-current" aria-current="page">{blog.title}</span>
          </nav>

          <header className="post__header">
            <span className="post__cat">{blog.category}</span>
            <h1 className="post__title">{blog.title}</h1>
            <p className="post__lede">{blog.excerpt}</p>

            <div className="post__meta">
              <div className="post__byline">
                <span className="post__avatar" aria-hidden="true">{blog.author.charAt(0)}</span>
                <div>
                  <span className="post__author">{blog.author}</span>
                  <span className="post__details">
                    <span className="post__detail">
                      <FiCalendar aria-hidden="true" />
                      <time dateTime={blog.isoDate}>{blog.date}</time>
                    </span>
                    <span className="post__detail">
                      <FiClock aria-hidden="true" />
                      {blog.readTime} min read
                    </span>
                  </span>
                </div>
              </div>

              <ShareButtons title={blog.title} />
            </div>
          </header>
        </Container>

        {/* ---------- Hero image (wider than the text) ---------- */}
        <Container>
          <figure className="post__figure">
            <ArticleImage
              src={blog.image}
              alt={blog.imageAlt}
              priority
              ratio="16 / 9"
              className="post__image"
            />
            {blog.imageAlt && <figcaption className="post__caption">{blog.imageAlt}</figcaption>}
          </figure>
        </Container>

        {/* ---------- Body ---------- */}
        <Container size="narrow">
          <div className="post__body">
            <ArticleContent blocks={blog.content} />
          </div>

          {/* ---------- End of article ---------- */}
          <footer className="post__end">
            <div className="post__end-text">
              <span className="post__end-label">Thanks for reading</span>
              <span className="post__end-title">Found this useful? Share it with a friend.</span>
            </div>
            <div className="post__end-actions">
              <ShareButtons title={blog.title} />
              <Link to="/blog" className="post__back">
                <FiArrowLeft aria-hidden="true" />
                All articles
              </Link>
            </div>
          </footer>
        </Container>
      </article>

      {related.length > 0 && (
        <CategorySection id="related" eyebrow="Continue reading" title="Related Articles">
          <BlogGrid blogs={related} />
        </CategorySection>
      )}
    </>
  );
}