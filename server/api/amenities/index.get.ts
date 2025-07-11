/**
 * Amenities API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.apiBaseUrl}/amenities/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 120, // 2 hours cache for amenities (static data)
    name: "amenities-list",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
