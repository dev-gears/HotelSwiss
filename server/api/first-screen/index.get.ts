/**
 * First screen API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.apiBaseUrl}/first-screen/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    return response;
  },
  {
    maxAge: 60 * 15, // 15 minutes cache for first screen data
    name: "first-screen-data",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
