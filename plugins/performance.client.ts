export default defineNuxtPlugin(() => {
  // Only run on client side
  if (import.meta.client) {
    // Wait for hydration to complete before running optimizations
    const runOptimizations = () => {
      try {
        // Preload critical resources
        const preloadCriticalResources = () => {
          const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
          
          criticalImages.forEach((img) => {
            if (img instanceof HTMLImageElement && img.src && !img.complete) {
              const existingPreload = document.querySelector(`link[href="${img.src}"]`);
              if (!existingPreload) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              }
            }
          });
        };

        // Optimize carousel performance
        const optimizeCarousel = () => {
          const carousels = document.querySelectorAll('[class*="carousel"]');
          carousels.forEach((carousel) => {
            if (carousel instanceof HTMLElement) {
              carousel.style.willChange = 'transform';
            }
          });
        };

        // Prefetch on hover with debouncing
        const prefetchOnHover = () => {
          const links = document.querySelectorAll('a[href^="/hotel/"], a[href^="/search"]');
          
          links.forEach((link) => {
            let timeoutId: NodeJS.Timeout;
            
            link.addEventListener('mouseenter', (e) => {
              timeoutId = setTimeout(() => {
                const href = (e.target as HTMLAnchorElement).href;
                if (href && !document.querySelector(`link[href="${href}"]`)) {
                  const prefetchLink = document.createElement('link');
                  prefetchLink.rel = 'prefetch';
                  prefetchLink.href = href;
                  document.head.appendChild(prefetchLink);
                }
              }, 100);
            }, { once: true });
            
            link.addEventListener('mouseleave', () => {
              if (timeoutId) clearTimeout(timeoutId);
            });
          });
        };

        // Run optimizations
        preloadCriticalResources();
        optimizeCarousel();
        prefetchOnHover();
        
      } catch (error) {
        console.warn('Performance optimizations failed:', error);
      }
    };

    // Wait for full DOM load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
      // DOM already loaded
      setTimeout(runOptimizations, 100);
    }
  }
});
