import { defineStore } from "pinia";
import { checkLogin } from "../../api/index.js";

export const userStateStore = defineStore("userState", {
  state: () => ({
    token: "",
    id: "",
    userid: "",
    isAdmin: "",
    showDashboard: false,
  }),
  actions: {
    async login(data) {
      const response = await checkLogin(data);
      this.token = response;
      return response;
    },
    setUserInfo(id, name, group, show) {
      this.id = id;
      this.userid = name;
      this.isAdmin = group;
      this.showDashboard = show;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
