import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import useRevealOnScroll from '../hooks/useRevealOnScroll.js';
import { useNavigation } from '../context/NavigationContext.jsx';

const SLIDES = [
  {
    id: 'hero',
    webp: '/darby/darby-hero-static-1600.webp 1600w, /darby/darby-hero-static-1200.webp 1200w, /darby/darby-hero-static-900.webp 900w, /darby/darby-hero-static-640.webp 640w',
    jpg: '/darby/darby-hero-static-1600.jpg 1600w, /darby/darby-hero-static-1200.jpg 1200w, /darby/darby-hero-static-900.jpg 900w, /darby/darby-hero-static-640.jpg 640w',
    fallback: '/darby/darby-hero-static-1200.jpg',
  },
  {
    id: 'artwork',
    webp: '/darby/darby-artwork-static-1600.webp 1600w, /darby/darby-artwork-static-1200.webp 1200w, /darby/darby-artwork-static-900.webp 900w, /darby/darby-artwork-static-640.webp 640w',
    jpg: '/darby/darby-artwork-static-1600.jpg 1600w, /darby/darby-artwork-static-1200.jpg 1200w, /darby/darby-artwork-static-900.jpg 900w, /darby/darby-artwork-static-640.jpg 640w',
    fallback: '/darby/darby-artwork-static-1200.jpg',
  },
  {
    id: 'posters',
    webp: '/darby/darby-posters-static-1600.webp 1600w, /darby/darby-posters-static-1200.webp 1200w, /darby/darby-posters-static-900.webp 900w, /darby/darby-posters-static-640.webp 640w',
    jpg: '/darby/darby-posters-static-1600.jpg 1600w, /darby/darby-posters-static-1200.jpg 1200w, /darby/darby-posters-static-900.jpg 900w, /darby/darby-posters-static-640.jpg 640w',
    fallback: '/darby/darby-posters-static-1200.jpg',
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
          <h1>Raskkal</h1>
          <p className="intro">
            Hi! I'm Raskkal, a Melbourne-based engineer. For over four years I've been delivering applications and solutions for Australia's largest bank's web applications. Open to freelance projects as well, happy to discuss scope, timelines, and outcomes. Get in contact with me below
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/contact">
              Contact me
            </Link>
            <Link className="btn btn--ghost" to="/#darby">
              See latest work
            </Link>
          </div>
        </div>
      </section>

      <section id="darby" className="project project--darby">
        <header className="project__headline" data-reveal>
          <span className="project__badge">Project</span>
          <h2>
            <a href="https://darbymitchell.art" target="_blank" rel="noreferrer">
              darbymitchell.art
            </a>
          </h2>
          <p>
            Portfolio and poster shop for artist Darby Mitchell. I handled the entire build from the ground up, allowing her a page where she could showcase her art as well as sell her posters all directly from her own website.
          </p>
        </header>

        <div className="darby-slider" data-reveal>
          <button
            type="button"
            className="darby-slider__control darby-slider__control--prev"
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
                <img src={active.fallback} alt={active.caption} loading="lazy" />
              </picture>
            </div>
          </a>
          <button
            type="button"
            className="darby-slider__control darby-slider__control--next"
            aria-label="Next"
            onClick={nextSlide}
          >
            →
          </button>
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
          <h2 id="cta-title">Get in contact</h2>
          <p>
            Have a question or an inquiry?
          </p>
          <Link className="btn btn--primary" to="/contact">
            Contact me
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
