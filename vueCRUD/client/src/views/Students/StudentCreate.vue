<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Add Students</h4>
      </div>

      <div class="card-body">
        <!-- <ul
          class="alert alert-warning"
          v-if="Object.keys(this.errorList).length > 0"
        >
          <li
            class="mb-0 ms-3"
            v-for="(error, index) in this.errorList"
            :keys="index"
          >
            {{ error[0] }}
          </li>
        </ul> -->
        <div class="mb-3">
          <label for="">Name</label>
          <input
            type="text"
            v-model="model.student.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Age</label>
          <input
            type="number"
            v-model="model.student.age"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Course</label>
          <input
            type="text"
            v-model="model.student.course"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="text"
            v-model="model.student.email"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="">Address</label>
          <input
            type="text"
            v-model="model.student.address"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click="saveStudent">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "studentCreate",

  data() {
    return {
      model: {
        student: { name: "", age: "", course: "", email: "", address: "" },
      },
    };
  },

  methods: {
    saveStudent() {
      axios
        .post(" http://localhost:3000/users", this.model.student, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          this.model.student = {
            name: "",
            age: "",
            course: "",
            email: "",
            address: "",
          };
          this.$router.push("/students");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
