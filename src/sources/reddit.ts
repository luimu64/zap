///<reference path="./reddit.d.ts" />
import { writable } from "svelte/store";

export const useReSearch = () => {
  const searchStore = writable<IRedSearchStore>({
    searchResults: [],
    isLoading: false,
    error: null,
  });

  const redSearch = async (searchTerm: string) => {
    try {
      searchStore.update((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await fetch(
        `https://rsearch.luimu.dev/search?q=${searchTerm}`
      );
      let searchResults = await res.json();
      searchStore.update((prev) => {
        return { ...prev, searchResults: searchResults, error: null };
      });
    } catch (err: any) {
      searchStore.update((prev) => {
        return { ...prev, error: err };
      });
    } finally {
      searchStore.update((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  return { redData: { ...searchStore }, redSearch };
};
