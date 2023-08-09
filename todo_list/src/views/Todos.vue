<template>
  <div class="bg-grey-lighten-4">
    <v-container style="max-width: 700px">
      <v-text-field
        v-model="newTask"
        label="What are you working on?"
        variant="solo"
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

      <!-- <v-progress-circular
      v-model="loading"
      indeterminate
      class="me-2"
      v-if="loading"
    ></v-progress-circular> -->
      <div v-show="!loading">
        <h2 class="text-h4 text-success ps-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">
              {{ tasks.length }}
            </span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-row class="my-1" align="center">
          <strong class="mx-4 text-info-darken-2">
            Remaining: {{ remainingTasks }}
          </strong>

          <v-divider vertical></v-divider>

          <strong class="mx-4 text-success-darken-2">
            Completed: {{ completedTasks }}
          </strong>

          <v-spacer></v-spacer>
        </v-row>

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
                  ></v-checkbox-btn>
                </template>
                <!-- @checked="task.done = !task.done" -->

                <v-list-item-title>
                  <span :class="task.done ? 'text-grey' : 'text-primary'">{{
                    task.text
                  }}</span>
                </v-list-item-title>

                <template v-slot:append>
                  <v-expand-x-transition class="mr-4">
                    <v-icon v-if="task.done" color="success">
                      mdi-check
                    </v-icon> </v-expand-x-transition
                  ><v-btn
                    class="mr-4"
                    size="small"
                    color="blue-accent-2"
                    prepend-icon="$edit"
                  >
                    Edit
                  </v-btn>

                  <!-- modal delete -->
                  <v-col cols="auto">
                    <v-dialog
                      transition="dialog-top-transition"
                      width="auto"
                      content-class="custom-modal"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          size="small"
                          color="red-darken-1"
                          prepend-icon="$delete"
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
                            <div class="text-h2 pa-12">Hello world!</div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              color="success"
                              class="btn"
                              @click="deleteTask(task)"
                              >Apply</v-btn
                            >

                            <v-btn
                              variant="text"
                              class="btn btn-close"
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
export default {
  data: () => ({
    tasks: [],
    newTask: "",
    loading: false,
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
    // this.delayedGetTask();
  },

  methods: {
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
        .then((res) => {
          console.log(res);
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
      axios
        .get(import.meta.env.VITE_END_POINT + "/todos")
        .then((res) => {
          this.tasks = res.data;
          this.tasks.sort((a, b) => b.id - a.id);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },

    // delayedGetTask() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.getTask();
    //   }, 2000);
    // },
    deleteTask(task) {
      console.log("task", task.id);
      axios
        .delete(import.meta.env.VITE_END_POINT + `/todos/${task.id}`)
        .then((res) => {
          console.log(res);
          this.getTask(); // Load lại danh sách todos sau khi xóa
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.custom-modal {
  top: 10%; /* Điều chỉnh giá trị top để đặt modal ở vị trí mong muốn */
}
.btn {
  border: 1px solid #ccc; /* Thêm border cho button */
  border-radius: 4px; /* Điều chỉnh góc bo tròn của border */
  padding: 6px 12px; /* Điều chỉnh padding bên trong button */
}
</style>
