/**
 * Hotels API endpoint with native Nuxt caching
 * Replaces complex custom caching with built-in cachedEventHandler
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    // Your existing API logic
    const response = await $fetch(`${config.apiBaseUrl}/hotels/`, {
      query,
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 15, // 15 minutes cache
    name: "hotels-list",
    swr: true, // Enable stale-while-revalidate
    varies: ["Authorization", "Accept-Language", "query"],
  },
);
