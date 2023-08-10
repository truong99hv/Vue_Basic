<template>
  <div class="bg-grey-lighten-4">
    <v-container style="max-width: 700px" :loading="loading">
      <v-text-field
        v-model="newTask"
        label="What are you working on?"
        @keydown.enter="createTask"
      >
        <template v-slot:append-inner>
          <v-fade-transition>
            <v-btn
              v-show="newTask"
              icon="mdi-plus-circle"
              variant="text"
              @click="createTask"
            ></v-btn>
          </v-fade-transition>
        </template>
        <template v-slot:loader>
          <v-progress-linear
            :active="loading"
            :model-value="progress"
            absolute
            height="2"
            indeterminate
          >
            ></v-progress-linear
          >
        </template>
      </v-text-field>

      <!-- v-show="!loading" -->
      <div>
        <h2 class="text-h4 text-success ps-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">
              {{ tasks.length }}
            </span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>
        <div class="mt-4 mb-4 d-flex justify-space-between align-center">
          <v-radio-group
            inline
            v-model="filterOption"
            @change="getTask"
            color="success"
            class="d-flex align-self-center"
          >
            <v-radio value="1"
              ><template v-slot:label>
                <strong class="text-info-darken-2">Remaining</strong>
              </template></v-radio
            >
            <v-radio value="2"
              ><template v-slot:label>
                <strong class="text-info-darken-2">Completed</strong>
              </template></v-radio
            >
            <v-radio value="3"
              ><template v-slot:label>
                <strong class="text-info-darken-2">All</strong>
              </template></v-radio
            >
          </v-radio-group>
          <v-card-text>
            <v-text-field
              v-model="searchQuery"
              @keydown.enter="performSearch"
              density="compact"
              variant="solo"
              label="Search"
              append-inner-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-btn @click="todoStore.sortText()">
            <v-icon icon="mdi-sort" color="light-blue-darken-3" />
            <v-tooltip activator="parent" location="start">Sort</v-tooltip>
          </v-btn>
        </div>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

              <v-list-item>
                <template v-slot:prepend>
                  <v-checkbox-btn
                    v-model="task.done"
                    color="grey"
                    @change="statusTask(task)"
                  ></v-checkbox-btn>
                </template>

                <v-list-item-title>
                  <span :class="task.done ? 'text-grey' : 'text-primary'">{{
                    task.text
                  }}</span>
                </v-list-item-title>

                <template v-slot:append>
                  <v-expand-x-transition class="mr-4">
                    <v-icon v-if="task.done" color="success">
                      mdi-check
                    </v-icon>
                  </v-expand-x-transition>
                  <!-- modal edit -->
                  <v-col cols="auto">
                    <v-dialog
                      transition="dialog-top-transition"
                      width="768"
                      content-class="custom-modal"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          size="small"
                          color="blue-accent-2"
                          prepend-icon="$edit"
                          v-bind="props"
                          @click="editTextTask(task.text)"
                        >
                          Edit
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-toolbar color="blue-accent-2" title="Edit Task"
                            ><v-icon
                              size="large"
                              color="grey-lighten-5"
                              @click="isActive.value = false"
                              icon="$delete"
                              class="mr-4"
                            ></v-icon
                          ></v-toolbar>

                          <v-card-text>
                            <div class="text-h2 pa-12">
                              <v-col cols="12">
                                <v-text-field
                                  label="Task"
                                  hint="Edit Task"
                                  v-model="this.textEdit"
                                ></v-text-field>
                              </v-col>
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              variant="outlined"
                              color="success"
                              @click="editTask(task)"
                              >Apply</v-btn
                            >

                            <v-btn
                              variant="outlined"
                              @click="isActive.value = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                  <!-- modal delete -->
                  <v-col cols="auto">
                    <v-dialog
                      transition="dialog-top-transition"
                      width="576"
                      content-class="custom-modal"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          size="small"
                          color="red-darken-1"
                          prepend-icon="mdi-trash-can-outline"
                          v-bind="props"
                        >
                          Delete
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-toolbar color="red-darken-2" title="Are you sure ?"
                            ><v-icon
                              size="large"
                              color="grey-lighten-5"
                              @click="isActive.value = false"
                              icon="$delete"
                              class="mr-3"
                            ></v-icon
                          ></v-toolbar>

                          <v-card-text>
                            <div class="text-h6">
                              This will Delete:
                              <strong
                                class="text-h5 font-weight-bold text-red-darken-1"
                                >{{ task.text }}</strong
                              >
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              color="success"
                              variant="outlined"
                              class="btn"
                              @click="deleteTask(task)"
                              >Apply</v-btn
                            >

                            <v-btn
                              class="btn btn-close"
                              variant="outlined"
                              @click="isActive.value = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                </template>
              </v-list-item>
            </template>
          </v-slide-y-transition>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { useTodoStore } from "@/store/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  data: () => ({
    tasks: [],
    newTask: "",
    loading: false,
    textEdit: "",
    filterOption: "3",
    sortOrder: 0,
    sortOptions: [
      { sort: "text", order: "asc" },
      { sort: "text", order: "desc" },
    ],
    searchQuery: "",
  }),

  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },

  mounted() {
    this.getTask();
  },

  methods: {
    statusTask(task) {
      axios
        .put(import.meta.env.VITE_END_POINT + `/todos/${task.id}`, {
          text: task.text,
          done: task.done,
        })
        .then(() => {
          this.getTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createTask() {
      this.loading = true;
      if (this.newTask.trim() === "") {
        return;
      }
      axios
        .post(import.meta.env.VITE_END_POINT + "/todos", {
          text: this.newTask,
          done: false,
        })
        .then(() => {
          this.newTask = "";
          this.getTask();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    getTask() {
      this.loading = true;

      let endpoint = import.meta.env.VITE_END_POINT + "/todos";
      const queryParams = [];

      if (this.filterOption === "1") {
        queryParams.push("done=false");
      } else if (this.filterOption === "2") {
        queryParams.push("done=true");
      }

      if (this.sortOrder !== 0) {
        const { sort, order } = this.sortOptions[this.sortOrder - 1];
        queryParams.push(`_sort=${sort}&_order=${order}`);
      }

      if (this.searchQuery) {
        queryParams.push(`q=${this.searchQuery}`);
      }

      if (queryParams.length > 0) {
        endpoint += "?" + queryParams.join("&");
      }

      axios
        .get(endpoint)
        .then((res) => {
          this.tasks = res.data;
          if (this.sortOrder === 0) {
            this.tasks.sort((a, b) => b.id - a.id);
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },

    editTextTask(text) {
      this.textEdit = text;
    },

    editTask(task) {
      axios
        .put(import.meta.env.VITE_END_POINT + `/todos/${task.id}`, {
          text: this.textEdit,
          done: task.done,
        })
        .then(() => {
          this.getTask();
          this.textEdit = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteTask(task) {
      axios
        .delete(import.meta.env.VITE_END_POINT + `/todos/${task.id}`)
        .then(() => {
          this.getTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // changeSortOrder() {
    //   this.sortOrder = (this.sortOrder + 1) % 3;
    //   this.getTask();
    // },

    performSearch() {
      this.getTask();
    },
  },
};
</script>

<style>
.custom-modal {
  top: 10%;
}
</style>
