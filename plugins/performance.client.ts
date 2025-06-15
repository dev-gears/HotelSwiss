export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = document.querySelectorAll(
        'img[fetchpriority="high"]',
      );

      criticalImages.forEach((img) => {
        if (img instanceof HTMLImageElement && img.src && !img.complete) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = img.src;
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        }
      });
    };

    // Optimize carousel performance
    const optimizeCarousel = () => {
      const carousels = document.querySelectorAll('[class*="carousel"]');
      carousels.forEach((carousel) => {
        // Add will-change for better performance
        if (carousel instanceof HTMLElement) {
          carousel.style.willChange = "transform";
        }
      });
    };

    // Lazy load images that are not in viewport
    const lazyLoadImages = () => {
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove("lazy");
                  imageObserver.unobserve(img);
                }
              }
            });
          },
          {
            rootMargin: "50px",
          },
        );

        document.querySelectorAll("img[data-src]").forEach((img) => {
          imageObserver.observe(img);
        });
      }
    };

    // Performance optimizations on load
    window.addEventListener("load", () => {
      preloadCriticalResources();
      optimizeCarousel();
      lazyLoadImages();
    });

    // Prefetch next page content on hover
    const prefetchOnHover = () => {
      const links = document.querySelectorAll(
        'a[href^="/hotel/"], a[href^="/search"]',
      );

      links.forEach((link) => {
        link.addEventListener(
          "mouseenter",
          (e) => {
            const href = (e.target as HTMLAnchorElement).href;
            if (href && !document.querySelector(`link[href="${href}"]`)) {
              const prefetchLink = document.createElement("link");
              prefetchLink.rel = "prefetch";
              prefetchLink.href = href;
              document.head.appendChild(prefetchLink);
            }
          },
          { once: true },
        );
      });
    };

    // Set up prefetching after DOM is ready
    window.addEventListener("DOMContentLoaded", prefetchOnHover);
  }
});
