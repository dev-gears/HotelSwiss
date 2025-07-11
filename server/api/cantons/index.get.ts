/**
 * Cantons API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.apiBaseUrl}/cantons/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 120, // 2 hours cache for cantons (static data)
    name: "cantons-list",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
