/**
 * Single hotel API endpoint with native caching
 */

export default cachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const id = getRouterParam(event, "id");

    const response = await $fetch(`${config.apiBaseUrl}/hotels/${id}/`, {
      headers: {
        Authorization: config.authCredentials,
      },
    });

    // Parse images if they're serialized as string
    if (response && typeof (response as any).images === "string") {
      try {
        (response as any).images = JSON.parse((response as any).images);
      } catch (error) {
        console.warn("Failed to parse hotel images:", error);
        (response as any).images = [];
      }
    }

    return response;
  },
  {
    maxAge: 60 * 30, // 30 minutes cache for individual hotels
    name: "hotel-detail",
    swr: true,
    varies: ["Authorization", "Accept-Language"],
  },
);
