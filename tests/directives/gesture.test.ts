import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import gestureDirective from "../../directives/gesture";

// Mock TouchEvent for JSDOM
global.TouchEvent = vi.fn(() => ({
  touches: [],
  changedTouches: [],
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
})) as any;

// Create a test component that uses the gesture directive
const TestComponent = defineComponent({
  template: '<div v-gesture="gestureOptions">Test Element</div>',
  directives: {
    gesture: gestureDirective,
  },
  props: {
    gestureOptions: {
      type: Object,
      default: () => ({}),
    },
  },
});

describe("Gesture Directive Cleanup", () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on addEventListener and removeEventListener
    addEventListenerSpy = vi.spyOn(HTMLElement.prototype, "addEventListener");
    removeEventListenerSpy = vi.spyOn(
      HTMLElement.prototype,
      "removeEventListener",
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should add event listeners when mounted", () => {
    const wrapper = mount(TestComponent, {
      props: {
        gestureOptions: {
          onSwipeLeft: vi.fn(),
          onSwipeRight: vi.fn(),
        },
      },
    });

    // Check that event listeners were added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchend",
      expect.any(Function),
    );

    wrapper.unmount();
  });

  it("should remove event listeners when unmounted", () => {
    const wrapper = mount(TestComponent, {
      props: {
        gestureOptions: {
          onSwipeLeft: vi.fn(),
          onSwipeRight: vi.fn(),
        },
      },
    });

    // Clear previous calls
    removeEventListenerSpy.mockClear();

    // Unmount the component
    wrapper.unmount();

    // Check that event listeners were removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchend",
      expect.any(Function),
    );
  });

  it("should store cleanup function on element", () => {
    const wrapper = mount(TestComponent, {
      props: {
        gestureOptions: {
          onSwipeLeft: vi.fn(),
        },
      },
    });

    const element = wrapper.element as any;

    // Check that cleanup function is stored on element
    expect(element._gestureCleanup).toBeDefined();
    expect(typeof element._gestureCleanup).toBe("function");

    wrapper.unmount();
  });

  it("should clean up properly on unmount", () => {
    const wrapper = mount(TestComponent, {
      props: {
        gestureOptions: {
          onSwipeLeft: vi.fn(),
          onSwipeRight: vi.fn(),
        },
      },
    });

    const element = wrapper.element as any;
    const cleanupSpy = vi.spyOn(element, "_gestureCleanup");

    // Unmount the component
    wrapper.unmount();

    // Check that cleanup function was called
    expect(cleanupSpy).toHaveBeenCalled();

    // Check that cleanup function is removed from element
    expect(element._gestureCleanup).toBeUndefined();
  });
  it("should handle multiple mount/unmount cycles", () => {
    // Test multiple mount/unmount cycles to ensure no memory leaks
    for (let i = 0; i < 3; i++) {
      const wrapper = mount(TestComponent, {
        props: {
          gestureOptions: {
            onSwipeLeft: vi.fn(),
          },
        },
      });

      // Verify elements have cleanup functions stored
      const divs = wrapper.findAll("div");
      divs.forEach((div) => {
        const element = div.element as any;
        expect(element._gestureCleanup).toBeTypeOf("function");
      });

      wrapper.unmount();

      // After unmount, cleanup functions should be removed
      divs.forEach((div) => {
        const element = div.element as any;
        expect(element._gestureCleanup).toBeUndefined();
      });
    }
  });

  it("should handle unmount gracefully when no cleanup function exists", () => {
    const wrapper = mount(TestComponent);
    const element = wrapper.element as any;

    // Remove the cleanup function to simulate edge case
    delete element._gestureCleanup;

    // Should not throw error when unmounting
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
