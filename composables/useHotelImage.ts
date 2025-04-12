export function useHotelImage() {
  const runtimeConfig = useRuntimeConfig();

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
