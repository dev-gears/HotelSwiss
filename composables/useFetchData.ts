import { ref, onMounted } from "vue";

type FetchFunctionType = () => Promise<any>;
type DataRefType = { value: any };

export const useFetchData = (
  fetchFunction: FetchFunctionType,
  dataRef: DataRefType,
  initialLoadingState: boolean = true,
) => {
  const isLoading = ref(initialLoadingState);

  onMounted(async () => {
    try {
      isLoading.value = true;
      const data = await fetchFunction();
      dataRef.value = data;
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      isLoading.value = false;
    }
  });

  return { isLoading };
};
