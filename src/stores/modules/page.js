import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => ({
    page: "대시보드",
  }),
  actions: {
    async login() {},
    setUserInfo(id, name, group, show) {},
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
