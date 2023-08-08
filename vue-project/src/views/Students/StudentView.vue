<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          Students
          <RouterLink to="/student/create" class="btn btn-primary float-end"
            >Add Student</RouterLink
          >
        </h4>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <!-- v-if="this.students.length > 0" -->
        <tbody v-if="this.students.length > 0">
          <tr v-for="(student, index) in this.students" :key="index">
            <td>{{ student.id }}</td>
            <td>{{ student.firstName }} {{ student.lastName }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.address.address }}</td>
            <td>
              <RouterLink to="/" class="btn btn-success me-2">Edit</RouterLink>
              <button type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "students",
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    this.getStudents();
  },

  methods: {
    getStudents() {
      axios.get("https://dummyjson.com/users?limit=5").then((res) => {
        this.students = res.data.users;
      });
    },
  },
};
</script>

<style></style>
