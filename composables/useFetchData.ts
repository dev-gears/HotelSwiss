import { ref, onMounted } from "vue";

type FetchFunctionType = () => Promise<any>;
type DataRefType = { value: any };

export const useFetchData = (
  fetchFunction: FetchFunctionType,
  dataRef: DataRefType,
  requestImmediately: boolean = true,
  initialLoadingState: boolean = true,
) => {
  const isLoading = ref(initialLoadingState);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      const data = await fetchFunction();
      dataRef.value = data;
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      isLoading.value = false;
    }
  };

  if (requestImmediately) {
    onMounted(fetchData);
  } else {
    fetchData();
  }

  return { isLoading };
};
