import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import useRevealOnScroll from '../hooks/useRevealOnScroll.js';
import { useNavigation } from '../context/NavigationContext.jsx';

const SLIDES = [
  {
    id: 'hero',
    title: 'Drop hero',
    caption: 'Framing the Johnny Blue Skies drop with a copper skyline and midnight gradients.',
    webp: '/darby/darby-home-hero-sq-1200.webp 1200w, /darby/darby-home-hero-sq-900.webp 900w, /darby/darby-home-hero-sq-640.webp 640w',
    jpg: '/darby/darby-home-hero-sq-1200.jpg 1200w, /darby/darby-home-hero-sq-900.jpg 900w, /darby/darby-home-hero-sq-640.jpg 640w',
    fallback: '/darby/darby-home-hero-sq-1200.jpg',
    focus: 'center 30%',
  },
  {
    id: 'posters-grid',
    title: 'Poster shop',
    caption: 'Edition grid showing matte, foil, and uncut variants with real-time inventory.',
    webp: '/darby/darby-posters-grid-sq-1200.webp 1200w, /darby/darby-posters-grid-sq-900.webp 900w, /darby/darby-posters-grid-sq-640.webp 640w',
    jpg: '/darby/darby-posters-grid-sq-1200.jpg 1200w, /darby/darby-posters-grid-sq-900.jpg 900w, /darby/darby-posters-grid-sq-640.jpg 640w',
    fallback: '/darby/darby-posters-grid-sq-1200.jpg',
    focus: 'center 50%',
  },
  {
    id: 'poster-detail',
    title: 'Edition detail',
    caption: 'Variant-aware product page connected to Stripe for smooth launch-night checkouts.',
    webp: '/darby/darby-poster-detail-sq-1200.webp 1200w, /darby/darby-poster-detail-sq-900.webp 900w, /darby/darby-poster-detail-sq-640.webp 640w',
    jpg: '/darby/darby-poster-detail-sq-1200.jpg 1200w, /darby/darby-poster-detail-sq-900.jpg 900w, /darby/darby-poster-detail-sq-640.jpg 640w',
    fallback: '/darby/darby-poster-detail-sq-1200.jpg',
    focus: 'center 40%',
  },
];

const Home = () => {
  const { setActiveSection } = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

  useRevealOnScroll({ threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'darby' ? 'darby' : 'top');
          }
        });
      },
      { threshold: 0.4 }
    );

    const darbySection = document.getElementById('darby');
    if (darbySection) observer.observe(darbySection);

    return () => observer.disconnect();
  }, [setActiveSection]);

  const nextSlide = () => setActiveSlide((index) => (index + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((index) => (index - 1 + SLIDES.length) % SLIDES.length);
  const goToSlide = (index) => setActiveSlide(index);

  const active = useMemo(() => SLIDES[activeSlide], [activeSlide]);

  return (
    <main id="top">
      <section id="intro" className="hero" data-reveal>
        <div className="hero__content">
          <p className="eyebrow">Full-stack developer</p>
          <h1>Minimal surfaces, resilient systems.</h1>
          <p className="intro">
            I'm Raskkal, a Melbourne-based engineer. For over four years I've delivered applications for Australia's largest banks—architecting secure platforms, mentoring teams, and keeping UX sharp despite heavy compliance. Now I collaborate with founders and product teams as a freelance partner.
          </p>
          <ul className="hero__facts reveal-stagger">
            <li>4+ years building products for major Australian banks</li>
            <li>End-to-end partner for design engineering and delivery</li>
            <li>Based in Melbourne, embedded remotely worldwide</li>
          </ul>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/contact">
              Book a conversation
            </Link>
            <Link className="btn btn--ghost" to="/#darby">
              See latest work
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__visual-frame">Building digital experiences that stay sharp under pressure.</div>
        </div>
      </section>

      <section id="darby" className="project project--darby">
        <header className="project__headline" data-reveal>
          <span className="project__badge">Case study</span>
          <h2>darbymitchell.art</h2>
          <p>
            Portfolio and poster shop for artist Darby Mitchell. I handled the build from discovery and prototyping through to Stripe integration, headless CMS, and Netlify deploy—so each drop ships without friction.
          </p>
        </header>

        <div className="darby-slider" data-reveal>
          <button
            type="button"
            className="darby-slider__control"
            aria-label="Previous"
            onClick={prevSlide}
          >
            ←
          </button>
          <a className="darby-slider__frame" href="https://darbymitchell.art" target="_blank" rel="noreferrer">
            <div className="darby-slider__media">
              <picture>
                <source type="image/webp" srcSet={active.webp} />
                <source type="image/jpeg" srcSet={active.jpg} />
                <img
                  src={active.fallback}
                  alt={active.caption}
                  loading="lazy"
                  sizes="(max-width: 900px) 80vw, 420px"
                  style={{ objectPosition: active.focus ?? 'center center' }}
                />
              </picture>
            </div>
          </a>
          <button
            type="button"
            className="darby-slider__control"
            aria-label="Next"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
        <div className="darby-slider__caption" data-reveal>
          <span className="darby-slider__title">{active.title}</span>
          <p>{active.caption}</p>
        </div>
        <div className="darby-slider__dots" role="tablist">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeSlide === index ? 'true' : 'false'}
              className={`darby-slider__dot ${activeSlide === index ? 'is-active' : ''}`.trim()}
              onClick={() => goToSlide(index)}
            >
              <span className="visually-hidden">{slide.title}</span>
            </button>
          ))}
        </div>
        <a className="project__link" href="https://darbymitchell.art" target="_blank" rel="noreferrer">
          Visit darbymitchell.art
        </a>
      </section>

      <section className="cta" aria-labelledby="cta-title" data-reveal>
        <div className="cta__content">
          <h2 id="cta-title">Let's ship what you're imagining</h2>
          <p>
            I work with a small roster of teams at a time. Share the product, constraints, and outcomes you're targeting—we'll scope the work and get momentum behind it quickly.
          </p>
          <Link className="btn btn--primary" to="/contact">
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
