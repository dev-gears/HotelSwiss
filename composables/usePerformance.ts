import { ref, onMounted } from "vue";

export function usePerformance() {
  const lcpTime = ref(0);
  const fcp = ref(0);
  const cls = ref(0);
  const fid = ref(0);

  const measurePerformance = () => {
    if (typeof window === "undefined") return;

    // Measure LCP
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcpTime.value = lastEntry.startTime;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // Measure FCP
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            fcp.value = entry.startTime;
          }
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true }); // Measure CLS
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        cls.value = clsValue;
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });

      // Measure FID
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as any;
          fid.value = fidEntry.processingStart - fidEntry.startTime;
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    }
  };

  const logPerformanceMetrics = () => {
    if (process.dev) {
      console.log("Performance Metrics:", {
        LCP: `${lcpTime.value.toFixed(2)}ms`,
        FCP: `${fcp.value.toFixed(2)}ms`,
        CLS: cls.value.toFixed(3),
        FID: `${fid.value.toFixed(2)}ms`,
      });
    }
  };

  onMounted(() => {
    measurePerformance();

    // Log metrics after 3 seconds to allow for measurements
    setTimeout(logPerformanceMetrics, 3000);
  });

  return {
    lcpTime,
    fcp,
    cls,
    fid,
    logPerformanceMetrics,
  };
}
