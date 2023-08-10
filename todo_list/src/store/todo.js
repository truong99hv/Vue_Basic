import { defineStore } from "pinia";
import axios from "axios";
const todoURL = import.meta.env.VITE_END_POINT + "/todos";
export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    filter: "all",
    sort: 0,
    loading: true,
    tasks: [],
  }),
  getters: {
    getFilterQuery() {
      switch (this.filter) {
        case "all":
          return "";
        case "done":
          return "done=true&";
        case "onGoing":
          return "done=false&";
        default:
          return "";
      }
    },
    getSortQuery() {
      switch (this.sort) {
        case 0:
          return "";
        case 1:
          return "_sort=text&_order=desc&";
        case 2:
          return "_sort=text&_order=asc&";
        default:
          return "";
      }
    },
  },

  actions: {
    sortText() {
      console.log("sort");
      if (this.sort < 2) {
        this.sort++;
      } else {
        this.sort = 0;
      }
      this.getTask();
    },
    async getTask() {
      this.loading = true;
      try {
        const url = todoURL + "?" + this.getFilterQuery + this.getSortQuery;
        const response = await axios.get(url);
        this.tasks = response.data;
        // this.tasks.sort((a, b) => b.id - a.id);
        this.loading = false;
      } catch (error) {
        console.error("Error:", error);
        this.loading = false;
      }
    },
    async createTask(state) {
      const URL = todoURL;
      try {
        const taskData = {
          text: state,
          done: false,
        };
        await axios.post(URL, taskData);

        this.getTask();
      } catch (error) {
        console.error("Error:", error);
      }
      this.loading = false;
    },
    async deleteTask(state) {
      try {
        const URL = todoURL + "/" + state.id;
        await axios.delete(URL);

        this.getTask();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async editTask(id, state, control) {
      console.log(id, state, control);

      try {
        const URL = todoURL + "/" + id;
        if (control === "toggle") {
          const data = {
            done: !state,
          };
          await axios.put(URL, data);
        } else {
          const data = {
            text: state,
          };
          await axios.put(URL, data);
        }
        this.getTask();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
});
