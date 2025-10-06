// Performance monitoring utilities

export const measurePerformance = () => {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') return;

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Log performance metrics
      console.log(`${entry.name}: ${entry.value}ms`);
      
      // You can send these to analytics service
      // analytics.track('performance', {
      //   metric: entry.name,
      //   value: entry.value,
      //   url: window.location.pathname
      // });
    }
  });

  // Observe Core Web Vitals
  try {
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  } catch (e) {
    // Fallback for older browsers
    console.warn('Performance Observer not supported');
  }
};

// Measure component render time
export const measureComponentRender = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts if any
  const fonts = [
    // Add your font URLs here if using custom fonts
  ];
  
  fonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

// Optimize images with lazy loading
export const optimizeImages = () => {
  // Add intersection observer for lazy loading images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};
