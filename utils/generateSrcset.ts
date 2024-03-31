import type { ImageRenditions } from "@/types/hotel";

export const generateSrcset = (renditions: ImageRenditions): string => {
  const runtimeConfig = useRuntimeConfig();
  return Object.entries(renditions)
    .map(([size, url]) => `${runtimeConfig.public.backendUrl}${url} ${size}`)
    .join(", ");
};
