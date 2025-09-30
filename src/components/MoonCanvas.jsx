import { useEffect, useRef } from 'react';

const MoonCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      element.style.setProperty('--moon-translate', '0');
      element.style.setProperty('--moon-tilt', '0deg');
      return undefined;
    }

    let ticking = false;

    const update = () => {
      const maxOffset = window.innerHeight * 1.2 || 1;
      const ratio = Math.min(Math.max(window.scrollY / maxOffset, 0), 1);
      const translate = -6 + ratio * -6;
      const tilt = (ratio - 0.5) * 8;
      element.style.setProperty('--moon-translate', `${translate}vh`);
      element.style.setProperty('--moon-tilt', `${tilt}deg`);
      ticking = false;
    };

    update();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    const onResize = () => {
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <div className="moon" ref={ref} aria-hidden="true" />;
};

export default MoonCanvas;
