<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Edit Students</h4>
      </div>

      <div class="card-body">
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
          <button class="btn btn-primary" @click="updateStudent">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "studentEdit",

  data() {
    return {
      studentId: "",
      model: {
        student: { name: "", age: "", course: "", email: "", address: "" },
      },
    };
  },

  mounted() {
    this.studentId = this.$route.params.id;
    this.getStudentData(this.$route.params.id);
  },

  methods: {
    getStudentData(studentId) {
      axios
        .get(import.meta.env.VITE_API_URL + "/users" + `/${studentId}`)
        .then((res) => {
          console.log(res.data);
          this.model.student = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateStudent() {
      axios
        .put(
          import.meta.env.VITE_API_URL + "/users" + `/${this.studentId}`,
          this.model.student,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res);

          this.$router.push("/students");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
