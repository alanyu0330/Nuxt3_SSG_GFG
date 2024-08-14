interface baseState {
  loading: boolean;
  lang: string;
}

export const useBaseStore = defineStore({
  id: "base",
  state: (): baseState => {
    return {
      loading: false,
      lang: "简体中文",
    };
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
  },
});
