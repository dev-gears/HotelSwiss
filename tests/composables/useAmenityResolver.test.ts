import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref } from "vue";
import { useAmenityResolver } from "@/composables/useAmenityResolver";
import { useAmenitiesData } from "@/utils/api";
import type { Amenity } from "@/types/hotel";

// Mock the useAmenitiesData utility
vi.mock("@/utils/api", () => ({
  useAmenitiesData: vi.fn(),
}));

describe("useAmenityResolver", () => {
  const mockUseAmenitiesData = vi.mocked(useAmenitiesData);
  // Helper function to create a proper AsyncData mock
  const createAsyncDataMock = (data: any, dataRef?: any) => {
    const asyncData = {
      data: dataRef || ref(data),
      pending: ref(false),
      refresh: vi.fn(),
      execute: vi.fn(),
      clear: vi.fn(),
      error: ref(null),
      status: ref("success" as const),
    };

    // Make it a thenable to satisfy the Promise interface
    const thenable = Promise.resolve(asyncData);
    Object.assign(thenable, asyncData);

    return thenable;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mock to return complete AsyncData structure
    mockUseAmenitiesData.mockReturnValue(createAsyncDataMock(null) as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Mock amenity data for testing
  const mockAmenities: Amenity[] = [
    {
      id: 1,
      name: "WiFi",
      description: "Free wireless internet",
      image: {
        id: 101,
        title: "WiFi Icon",
        url: "https://example.com/wifi.png",
        width: 64,
        height: 64,
        renditions: {
          thumbnail: "https://example.com/wifi-thumb.png",
          medium: "https://example.com/wifi-medium.png",
          large: "https://example.com/wifi-large.png",
        },
      },
    },
    {
      id: 2,
      name: "Swimming Pool",
      description: "Outdoor swimming pool",
      image: {
        id: 102,
        title: "Pool Icon",
        url: "https://example.com/pool.png",
        width: 64,
        height: 64,
        renditions: {
          thumbnail: "https://example.com/pool-thumb.png",
          medium: "https://example.com/pool-medium.png",
          large: "https://example.com/pool-large.png",
        },
      },
    },
    {
      id: 3,
      name: "Parking",
      description: "Free parking available",
      image: {
        id: 103,
        title: "Parking Icon",
        url: "https://example.com/parking.png",
        width: 64,
        height: 64,
        renditions: {
          thumbnail: "https://example.com/parking-thumb.png",
          medium: "https://example.com/parking-medium.png",
          large: "https://example.com/parking-large.png",
        },
      },
    },
    {
      id: 4,
      name: "Gym",
      description: undefined, // Test case with undefined description
      image: {
        id: 104,
        title: "Gym Icon",
        url: "https://example.com/gym.png",
        width: 64,
        height: 64,
        renditions: {
          thumbnail: "https://example.com/gym-thumb.png",
          medium: "https://example.com/gym-medium.png",
          large: "https://example.com/gym-large.png",
        },
      },
    },
  ];

  const mockApiResponse = {
    results: mockAmenities,
  };

  describe("initialization", () => {
    it("should initialize with empty amenities when data is not loaded", () => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(undefined) as any,
      );

      const { amenities, isLoaded } = useAmenityResolver();

      expect(amenities.value).toEqual([]);
      expect(isLoaded.value).toBe(false);
    });
    it("should initialize with amenities when data is loaded", () => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );

      const { amenities, isLoaded } = useAmenityResolver();

      expect(amenities.value).toEqual(mockAmenities);
      expect(isLoaded.value).toBe(true);
    });
    it("should handle null API response gracefully", () => {
      mockUseAmenitiesData.mockReturnValue(createAsyncDataMock(null) as any);

      const { amenities, isLoaded } = useAmenityResolver();

      expect(amenities.value).toEqual([]);
      expect(isLoaded.value).toBe(false);
    });
    it("should handle API response without results property", () => {
      mockUseAmenitiesData.mockReturnValue(createAsyncDataMock({}) as any);

      const { amenities, isLoaded } = useAmenityResolver();

      expect(amenities.value).toEqual([]);
      expect(isLoaded.value).toBe(true);
    });
  });
  describe("resolveAmenity", () => {
    beforeEach(() => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );
    });

    it("should resolve an existing amenity by ID", () => {
      const { resolveAmenity } = useAmenityResolver();

      const result = resolveAmenity(1);

      expect(result).toEqual(mockAmenities[0]);
      expect(result?.name).toBe("WiFi");
      expect(result?.description).toBe("Free wireless internet");
    });

    it("should return undefined for non-existing amenity ID", () => {
      const { resolveAmenity } = useAmenityResolver();

      const result = resolveAmenity(999);

      expect(result).toBeUndefined();
    });

    it("should handle amenity with undefined description", () => {
      const { resolveAmenity } = useAmenityResolver();

      const result = resolveAmenity(4);

      expect(result).toEqual(mockAmenities[3]);
      expect(result?.name).toBe("Gym");
      expect(result?.description).toBeUndefined();
    });

    it("should work with different valid amenity IDs", () => {
      const { resolveAmenity } = useAmenityResolver();

      expect(resolveAmenity(1)?.name).toBe("WiFi");
      expect(resolveAmenity(2)?.name).toBe("Swimming Pool");
      expect(resolveAmenity(3)?.name).toBe("Parking");
    });
  });
  describe("resolveAmenities", () => {
    beforeEach(() => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );
    });

    it("should resolve multiple amenity IDs to amenity objects", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([1, 2, 3]);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe("WiFi");
      expect(result[1].name).toBe("Swimming Pool");
      expect(result[2].name).toBe("Parking");
    });

    it("should filter out non-existing amenity IDs", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([1, 999, 2, 888]);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("WiFi");
      expect(result[1].name).toBe("Swimming Pool");
    });

    it("should return empty array for empty input array", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([]);

      expect(result).toEqual([]);
    });

    it("should handle null input gracefully", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities(null as any);

      expect(result).toEqual([]);
    });

    it("should handle undefined input gracefully", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities(undefined as any);

      expect(result).toEqual([]);
    });

    it("should return empty array when all IDs are invalid", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([999, 888, 777]);

      expect(result).toEqual([]);
    });

    it("should handle single amenity ID in array", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([2]);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Swimming Pool");
    });

    it("should handle duplicate amenity IDs", () => {
      const { resolveAmenities } = useAmenityResolver();

      const result = resolveAmenities([1, 1, 2, 2]);

      expect(result).toHaveLength(4);
      expect(result[0].name).toBe("WiFi");
      expect(result[1].name).toBe("WiFi");
      expect(result[2].name).toBe("Swimming Pool");
      expect(result[3].name).toBe("Swimming Pool");
    });
  });
  describe("reactivity", () => {
    it("should update amenities when API data changes", () => {
      const dataRef = ref(undefined as any);
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(undefined, dataRef) as any,
      );

      const { amenities, isLoaded } = useAmenityResolver();

      // Initially should be empty
      expect(amenities.value).toEqual([]);
      expect(isLoaded.value).toBe(false);

      // Update the data
      dataRef.value = mockApiResponse;

      // Should now have amenities
      expect(amenities.value).toEqual(mockAmenities);
      expect(isLoaded.value).toBe(true);
    });
    it("should update resolved amenities when underlying data changes", () => {
      const dataRef = ref(mockApiResponse as any);
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse, dataRef) as any,
      );

      const { resolveAmenity, resolveAmenities } = useAmenityResolver();

      // Initially should resolve correctly
      expect(resolveAmenity(1)?.name).toBe("WiFi");
      expect(resolveAmenities([1, 2])).toHaveLength(2);

      // Update to different data
      const newMockData = {
        results: [
          {
            id: 5,
            name: "Spa",
            description: "Luxury spa services",
            image: {
              id: 105,
              title: "Spa Icon",
              url: "https://example.com/spa.png",
              width: 64,
              height: 64,
              renditions: {
                thumbnail: "https://example.com/spa-thumb.png",
                medium: "https://example.com/spa-medium.png",
                large: "https://example.com/spa-large.png",
              },
            },
          },
        ],
      };

      dataRef.value = newMockData;

      // Should now resolve different amenities
      expect(resolveAmenity(1)).toBeUndefined(); // Old amenity should not exist
      expect(resolveAmenity(5)?.name).toBe("Spa"); // New amenity should exist
      expect(resolveAmenities([1, 2])).toEqual([]); // Old amenities should not resolve
      expect(resolveAmenities([5])).toHaveLength(1); // New amenity should resolve
    });
  });

  describe("edge cases", () => {
    it("should handle malformed amenity data gracefully", () => {
      const malformedData = {
        results: [
          { id: 1, name: "WiFi" }, // Missing image and description
          { id: 2 }, // Missing name and image
          null, // Null entry
          undefined, // Undefined entry
        ],
      };
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(malformedData) as any,
      );

      const { amenities, resolveAmenity } = useAmenityResolver();

      expect(amenities.value).toEqual(malformedData.results);
      // The composable should still work with malformed data
      expect(resolveAmenity(1)?.name).toBe("WiFi");
      expect(resolveAmenity(2)).toBeDefined();
    });
    it("should handle zero as a valid amenity ID", () => {
      const dataWithZeroId = {
        results: [
          {
            id: 0,
            name: "Basic Amenity",
            description: "Basic amenity with ID 0",
            image: {
              id: 100,
              title: "Basic Icon",
              url: "https://example.com/basic.png",
              width: 64,
              height: 64,
              renditions: {},
            },
          },
        ],
      };
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(dataWithZeroId) as any,
      );

      const { resolveAmenity, resolveAmenities } = useAmenityResolver();

      expect(resolveAmenity(0)?.name).toBe("Basic Amenity");
      expect(resolveAmenities([0])).toHaveLength(1);
    });
    it("should handle negative amenity IDs", () => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );

      const { resolveAmenity, resolveAmenities } = useAmenityResolver();

      expect(resolveAmenity(-1)).toBeUndefined();
      expect(resolveAmenities([-1, -2])).toEqual([]);
    });
    it("should handle large arrays of amenity IDs efficiently", () => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );

      const { resolveAmenities } = useAmenityResolver();

      // Create a large array with valid and invalid IDs
      const largeIdArray = Array.from({ length: 1000 }, (_, i) => i % 5);

      const result = resolveAmenities(largeIdArray);

      // Should only return valid amenities (IDs 1, 2, 3, 4 exist, 0 doesn't)
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((amenity) => amenity && amenity.id > 0)).toBe(true);
    });
  });

  describe("return object structure", () => {
    it("should return all expected properties", () => {
      mockUseAmenitiesData.mockReturnValue({
        data: ref(mockApiResponse),
        pending: ref(false),
        refresh: vi.fn(),
        execute: vi.fn(),
        clear: vi.fn(),
        error: ref(null),
        status: ref("success" as const),
      } as any);

      const resolver = useAmenityResolver();

      expect(resolver).toHaveProperty("amenities");
      expect(resolver).toHaveProperty("resolveAmenity");
      expect(resolver).toHaveProperty("resolveAmenities");
      expect(resolver).toHaveProperty("isLoaded");
    });
    it("should return functions for resolveAmenity and resolveAmenities", () => {
      mockUseAmenitiesData.mockReturnValue({
        data: ref(mockApiResponse),
        pending: ref(false),
        refresh: vi.fn(),
        execute: vi.fn(),
        clear: vi.fn(),
        error: ref(null),
        status: ref("success" as const),
      } as any);

      const { resolveAmenity, resolveAmenities } = useAmenityResolver();

      expect(typeof resolveAmenity).toBe("function");
      expect(typeof resolveAmenities).toBe("function");
    });
    it("should return computed refs for amenities and isLoaded", () => {
      mockUseAmenitiesData.mockReturnValue(
        createAsyncDataMock(mockApiResponse) as any,
      );

      const { amenities, isLoaded } = useAmenityResolver();

      // These should be computed refs with a value property
      expect(amenities).toHaveProperty("value");
      expect(isLoaded).toHaveProperty("value");
    });
  });
});
