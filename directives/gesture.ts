import { type Directive } from "vue";

type GestureOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchIn?: () => void;
  onPinchOut?: () => void;
  swipeThreshold?: number;
  pinchThreshold?: number;
};

const gestureDirective: Directive = {
  mounted(el, binding) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let initialDistance = 0;
    let isPinching = false;

    const defaultOptions: GestureOptions = {
      swipeThreshold: 50,
      pinchThreshold: 0.5,
    };

    const options: GestureOptions = { ...defaultOptions, ...binding.value };

    const getTouchDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        isPinching = true;
        initialDistance = getTouchDistance(e.touches);
      } else {
        isPinching = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length > 1) {
        const currentDistance = getTouchDistance(e.touches);
        const pinchFactor = currentDistance / initialDistance;

        if (pinchFactor < 1 - (options.pinchThreshold || 0.5)) {
          options.onPinchIn?.();
        } else if (pinchFactor > 1 + (options.pinchThreshold || 0.5)) {
          options.onPinchOut?.();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isPinching) {
        isPinching = false;
        return;
      }

      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;

      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = options.swipeThreshold || 50;
      const horizontalSwipeDistance = touchStartX - touchEndX;
      const verticalSwipeDistance = touchStartY - touchEndY;

      if (Math.abs(horizontalSwipeDistance) > Math.abs(verticalSwipeDistance)) {
        if (horizontalSwipeDistance > swipeThreshold) {
          options.onSwipeLeft?.();
        } else if (horizontalSwipeDistance < -swipeThreshold) {
          options.onSwipeRight?.();
        }
      } else {
        if (verticalSwipeDistance > swipeThreshold) {
          options.onSwipeUp?.();
        } else if (verticalSwipeDistance < -swipeThreshold) {
          options.onSwipeDown?.();
        }
      }
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    el._cleanup = () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  },
  unmounted(el) {
    el._cleanup?.();
  },
};

export default gestureDirective;
