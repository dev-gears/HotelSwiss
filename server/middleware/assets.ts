export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Handle _nuxt assets with proper MIME types
  if (url.pathname.startsWith("/_nuxt/")) {
    const ext = url.pathname.split(".").pop();

    switch (ext) {
      case "js":
        setHeader(event, "content-type", "application/javascript");
        break;
      case "css":
        setHeader(event, "content-type", "text/css");
        break;
      case "woff2":
        setHeader(event, "content-type", "font/woff2");
        break;
      case "woff":
        setHeader(event, "content-type", "font/woff");
        break;
      case "ttf":
        setHeader(event, "content-type", "font/ttf");
        break;
      case "svg":
        setHeader(event, "content-type", "image/svg+xml");
        break;
      case "png":
        setHeader(event, "content-type", "image/png");
        break;
      case "jpg":
      case "jpeg":
        setHeader(event, "content-type", "image/jpeg");
        break;
      case "webp":
        setHeader(event, "content-type", "image/webp");
        break;
    }

    // Set cache headers for static assets
    setHeader(event, "cache-control", "public, max-age=31536000, immutable");
  }
});
