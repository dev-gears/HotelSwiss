import { ref, onMounted, onUnmounted } from "vue";

const useDeviceType = () => {
  const deviceType = ref("desktop");

  const checkDeviceType = () => {
    const width = window.innerWidth;

    if (width < 768) {
      deviceType.value = "mobile";
    } else if (width >= 768 && width < 1024) {
      deviceType.value = "tablet";
    } else {
      deviceType.value = "desktop";
    }
  };

  const onResize = () => {
    checkDeviceType();
  };

  onMounted(() => {
    checkDeviceType();
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  return { deviceType };
};

export default useDeviceType;
