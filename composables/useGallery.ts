import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  computed,
  readonly,
  type Ref,
  type ComputedRef,
} from "vue";
import type { Image } from "@/types/hotel";

/**
 * Configuration options for the useGallery composable
 */
export interface UseGalleryOptions {
  /** Array of images or reactive ref to array of images to display in the gallery */
  images: Ref<Array<Image>> | Array<Image>;
  /** Reactive boolean indicating if the gallery is visible */
  visible: Ref<boolean>;
  /** Callback function called when the gallery should be closed */
  onClose: () => void;
}

/**
 * Return type for the useGallery composable
 */
export interface UseGalleryReturn {
  /** Currently selected image index (null if none selected) */
  selectedImageIndex: Ref<number | null>;
  /** Whether the current image is loading */
  isImageLoading: Ref<boolean>;
  /** Computed array of gallery images */
  galleryImages: ComputedRef<Array<Image>>;
  /** Function to open an image modal at specific index */
  openImageModal: (index: number) => void;
  /** Function to close the gallery */
  closeGallery: () => void;
  /** Function to show the next image */
  showNextImage: () => void;
  /** Function to show the previous image */
  showPreviousImage: () => void;
  /** Function to scroll thumbnail into view */
  scrollThumbnailIntoView: (index: number) => void;
}

/**
 * Composable for managing a gallery of images with navigation, keyboard controls, and thumbnail scrolling.
 *
 * Provides a complete gallery experience including:
 * - Image navigation (next/previous)
 * - Keyboard controls (arrow keys, escape)
 * - Thumbnail scrolling and centering
 * - Body scroll locking when gallery is open
 * - Loading states management
 *
 * @param options - Configuration options for the gallery
 * @param options.images - Array of images or reactive ref to display
 * @param options.visible - Reactive boolean for gallery visibility
 * @param options.onClose - Callback when gallery should close
 *
 * @returns Gallery state and control functions
 *
 * @example
 * ```typescript
 * const {
 *   selectedImageIndex,
 *   isImageLoading,
 *   galleryImages,
 *   openImageModal,
 *   closeGallery,
 *   showNextImage,
 *   showPreviousImage
 * } = useGallery({
 *   images: computed(() => props.images ?? []),
 *   visible: toRef(props, 'visible'),
 *   onClose: () => emit("update:visible", false)
 * });
 * ```
 */
export const useGallery = ({
  images,
  visible,
  onClose,
}: UseGalleryOptions): UseGalleryReturn => {
  // State management
  /** Currently selected image index in the gallery */
  const selectedImageIndex = ref<number | null>(null);

  /** Loading state for the current image */
  const isImageLoading = ref(false);

  /** Computed property that normalizes images input to always return an array */
  const galleryImages = computed(() => {
    return Array.isArray(images) ? images : images.value;
  });
  /**
   * Scrolls the thumbnail at the specified index into the center of the thumbnail container.
   * Uses smooth scrolling behavior for better UX.
   *
   * @param index - The index of the thumbnail to scroll into view
   */
  const scrollThumbnailIntoView = (index: number): void => {
    nextTick(() => {
      const thumbnailContainer = document.querySelector(".thumbnail-scroll");
      const thumbnails = document.querySelectorAll(".thumbnail-scroll .group");
      const selectedThumbnail = thumbnails[index];

      if (thumbnailContainer && selectedThumbnail && thumbnails.length > 0) {
        const containerRect = thumbnailContainer.getBoundingClientRect();
        const thumbnailRect = selectedThumbnail.getBoundingClientRect();

        // Calculate the scroll position to center the thumbnail
        const containerCenter = containerRect.width / 2;
        const thumbnailCenter =
          thumbnailRect.left - containerRect.left + thumbnailRect.width / 2;
        const scrollOffset = thumbnailCenter - containerCenter;

        thumbnailContainer.scrollBy({
          left: scrollOffset,
          behavior: "smooth",
        });
      }
    });
  };

  /**
   * Opens the image modal at the specified index.
   * Sets loading state and scrolls the corresponding thumbnail into view.
   *
   * @param index - The index of the image to display
   */
  const openImageModal = (index: number): void => {
    selectedImageIndex.value = index;
    isImageLoading.value = true;
    scrollThumbnailIntoView(index);
  };

  /**
   * Closes the gallery and resets the selected image index.
   * Calls the onClose callback to notify parent component.
   */
  const closeGallery = (): void => {
    onClose();
    selectedImageIndex.value = null;
  };

  /**
   * Shows the next image in the gallery.
   * Wraps around to the first image when reaching the end.
   * Updates loading state and scrolls thumbnail into view.
   */
  const showNextImage = (): void => {
    if (selectedImageIndex.value !== null && galleryImages.value.length > 0) {
      selectedImageIndex.value =
        (selectedImageIndex.value + 1) % galleryImages.value.length;
      isImageLoading.value = true;
      scrollThumbnailIntoView(selectedImageIndex.value);
    }
  };

  /**
   * Shows the previous image in the gallery.
   * Wraps around to the last image when reaching the beginning.
   * Updates loading state and scrolls thumbnail into view.
   */
  const showPreviousImage = (): void => {
    if (selectedImageIndex.value !== null && galleryImages.value.length > 0) {
      selectedImageIndex.value =
        (selectedImageIndex.value - 1 + galleryImages.value.length) %
        galleryImages.value.length;
      isImageLoading.value = true;
      scrollThumbnailIntoView(selectedImageIndex.value);
    }
  };
  /**
   * Handles keyboard navigation for the gallery.
   * Supports:
   * - Escape: Close gallery
   * - ArrowLeft: Previous image
   * - ArrowRight: Next image
   *
   * @param e - The keyboard event
   */
  const handleKeydown = (e: KeyboardEvent): void => {
    const isVisible = typeof visible === "object" ? visible.value : visible;
    if (!isVisible) return;

    switch (e.key) {
      case "Escape":
        closeGallery();
        break;
      case "ArrowLeft":
        e.preventDefault();
        showPreviousImage();
        break;
      case "ArrowRight":
        e.preventDefault();
        showNextImage();
        break;
    }
  };

  /**
   * Locks body scroll to prevent background scrolling when gallery is open.
   * Uses fixed positioning to maintain scroll position on mobile devices.
   */
  const lockBodyScroll = (): void => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.bottom = "0";
    }
  };

  /**
   * Unlocks body scroll and restores normal scrolling behavior.
   * Resets all body style properties that were modified by lockBodyScroll.
   */
  const unlockBodyScroll = (): void => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.bottom = "";
    }
  };
  // Watchers
  /**
   * Watches for changes in gallery visibility.
   * When gallery opens: sets first image as selected, enables loading state, locks body scroll
   * When gallery closes: resets selection and unlocks body scroll
   */
  watch(
    () => (typeof visible === "object" ? visible.value : visible),
    (newVisible) => {
      if (newVisible && galleryImages.value.length > 0) {
        selectedImageIndex.value = 0;
        isImageLoading.value = true;
        scrollThumbnailIntoView(0);
        lockBodyScroll();
      } else if (!newVisible) {
        selectedImageIndex.value = null;
        unlockBodyScroll();
      }
    },
  );

  // Lifecycle hooks
  /**
   * Sets up keyboard event listeners when component mounts
   */
  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  /**
   * Cleans up event listeners and unlocks body scroll when component unmounts
   */
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    unlockBodyScroll();
  });
  return {
    selectedImageIndex,
    isImageLoading,
    galleryImages,

    openImageModal,
    closeGallery,
    showNextImage,
    showPreviousImage,
    scrollThumbnailIntoView,
  };
};
