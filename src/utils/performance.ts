export const measurePerformance = () => {
  if (!import.meta.env.PROD) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const reading = 'value' in entry && typeof entry.value === 'number' ? entry.value : entry.duration;
      console.log(`${entry.name}: ${reading}ms`);
    }
  });

  try {
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  } catch {
    console.warn('Performance Observer not supported');
  }
};

export const measureComponentRender = (componentName: string) => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    if (import.meta.env.DEV) {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  };
};

export const preloadCriticalResources = () => {
  const fonts: string[] = [];

  fonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

export const optimizeImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (!(img instanceof HTMLImageElement)) return;
        const src = img.dataset.src;
        if (src) img.src = src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};
