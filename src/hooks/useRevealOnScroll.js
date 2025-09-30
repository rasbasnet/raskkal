import { useEffect } from 'react';

const useRevealOnScroll = ({ threshold = 0.35, rootMargin = '0px' } = {}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!elements.length) {
      return undefined;
    }

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.setAttribute('data-inview', 'true');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => {
      if (!el.getAttribute('data-inview')) {
        el.setAttribute('data-inview', 'false');
      }
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [rootMargin, threshold]);
};

export default useRevealOnScroll;
