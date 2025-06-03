export function useHotelImage() {
  const runtimeConfig = useRuntimeConfig();

  /**
   * Get the full URL for a hotel image path
   * This handles both local paths and external URLs.
   * If the path is undefined, it returns a placeholder image.
   * @param path - The image path or URL
   * @returns Full URL to the image
   */
  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/images/placeholder.webp";

    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    if (!runtimeConfig?.public?.backendUrl) {
      return path;
    }

    return `${runtimeConfig.public.backendUrl}${path}`;
  };

  /**
   * Get the style object for an image element
   * @param path - The image path or URL
   * @returns Style object with background image and opacity
   */
  const getImageStyle = (path: string | undefined) => {
    return {
      opacity: path ? 1 : 0.5,
      backgroundImage: `url(${getImageUrl(path)})`,
    };
  };

  return {
    getImageUrl,
    getImageStyle,
  };
}
