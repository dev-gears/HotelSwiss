import type { ProviderGetImage } from "@nuxt/image";
import { createOperationsGenerator } from "#image";

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    quality: "q",
    width: "w",
    height: "h",
    fit: "fit",
    background: "bg",
  },
  joinWith: "&",
  formatter: (key: string, value: string) => `${key}=${value}`,
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL },
) => {
  // Handle external URLs
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return {
      url: src,
    };
  }

  // Remove leading slash from src if present
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  // Default quality and format optimizations
  const defaultModifiers = {
    format: "webp",
    quality: "85",
    ...modifiers,
  };

  // Convert all modifiers to strings
  const stringModifiers: Record<string, string> = {};
  Object.entries(defaultModifiers).forEach(([key, value]) => {
    stringModifiers[key] = String(value);
  });

  const operations = operationsGenerator(stringModifiers);
  const url = operations
    ? `${baseURL}/${cleanSrc}?${operations}`
    : `${baseURL}/${cleanSrc}`;

  return {
    url,
  };
};
