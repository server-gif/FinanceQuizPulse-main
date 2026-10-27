import HeroSection from '../components/HeroSection/HeroSection';
import BlogGrid from '../components/BlogGrid/BlogGrid';
import CategorySection from '../components/CategorySection/CategorySection';
import FaqSection from '../components/FaqSection/FaqSection';
import QuizSection from '../components/QuizSection/QuizSection';
import SEO from '../components/SEO/SEO';
import { SITE } from '../config/site';
import { BLOGS } from '../data/blogs';
import { FAQS } from '../data/faqs';

const LATEST_COUNT = 8;

export default function Home() {
  const latest = BLOGS.slice(0, LATEST_COUNT);
  const more = BLOGS.slice(LATEST_COUNT, LATEST_COUNT * 2);

  return (
    <>
      <SEO path="/" description={SITE.description} faqs={FAQS} />

      <HeroSection />


      <CategorySection
        id="latest"
        eyebrow="Fresh reads"
        title="Latest Financial Articles"
        action={{ label: 'View all articles', to: '/blog' }}
      >
        <BlogGrid blogs={latest} columns={4} />
      </CategorySection>
      
      <QuizSection />

      {more.length > 0 && (
        <CategorySection
          id="more"
          eyebrow="Keep learning"
          title="More Financial Articles"
          description="Guides on banking, credit, taxes and the economy — explained in plain language."
          action={{ label: "See every guide", to: "/blog" }}
        >
          <BlogGrid blogs={more} columns={4} />
        </CategorySection>
      )}

      <FaqSection />
    </>
  );
}
