/**
 * Example of using Nuxt's native cachedEventHandler for API routes
 * This replaces complex custom caching with built-in functionality
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    // Your API logic here
    const response = await $fetch(`${config.apiBaseUrl}/hotels/`, {
      query,
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 15, // 15 minutes
    name: "hotels-list",
    swr: true, // Enable stale-while-revalidate
    varies: ["Authorization", "Accept-Language"],
  },
);
