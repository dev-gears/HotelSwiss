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

    // Service Worker Registration
    const registerServiceWorker = async () => {
      if (
        "serviceWorker" in navigator &&
        process.env.NODE_ENV === "production"
      ) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
            },
          );

          console.log("Service Worker registered successfully:", registration);

          // Listen for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // New version available
                  console.log("New version of the app is available");
                }
              });
            }
          });

          // Cache management utilities
          window.cacheManager = {
            clearCache: async () => {
              const messageChannel = new MessageChannel();
              return new Promise((resolve) => {
                messageChannel.port1.onmessage = (event) => {
                  resolve(event.data);
                };
                navigator.serviceWorker.controller?.postMessage(
                  { type: "CACHE_CLEAR" },
                  [messageChannel.port2],
                );
              });
            },
            getCacheStats: async () => {
              const messageChannel = new MessageChannel();
              return new Promise((resolve) => {
                messageChannel.port1.onmessage = (event) => {
                  resolve(event.data);
                };
                navigator.serviceWorker.controller?.postMessage(
                  { type: "CACHE_STATS" },
                  [messageChannel.port2],
                );
              });
            },
          };
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    };

    // Performance optimizations on load
    window.addEventListener("load", () => {
      preloadCriticalResources();
      optimizeCarousel();
      lazyLoadImages();
      registerServiceWorker(); // Register service worker after load
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
