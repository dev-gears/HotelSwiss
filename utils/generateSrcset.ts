import type { Image } from "@/types/hotel";

export const generateSrcset = (renditions: Record<string, string>): string => {
  const runtimeConfig = useRuntimeConfig();
  return Object.entries(renditions)
    .map(([size, url]) => `${runtimeConfig.public.backendUrl}${url} ${size}`)
    .join(", ");
};

// Helper function to generate srcset from Image object
export const generateSrcsetFromImage = (image: Image): string => {
  const runtimeConfig = useRuntimeConfig();
  if (typeof image.renditions === "object" && image.renditions !== null) {
    return Object.entries(image.renditions)
      .map(([size, url]) => `${runtimeConfig.public.backendUrl}${url} ${size}`)
      .join(", ");
  }
  return `${runtimeConfig.public.backendUrl}${image.url}`;
};
