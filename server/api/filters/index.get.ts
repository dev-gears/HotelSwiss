/**
 * Filters API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.apiBaseUrl}/filters/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 60, // 1 hour cache for filters
    name: "filters-data",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
