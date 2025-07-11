/**
 * Categories API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.apiBaseUrl}/categories/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 120, // 2 hours cache for categories (relatively static)
    name: "categories-list",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
