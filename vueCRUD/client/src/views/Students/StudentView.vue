<template>
  <div class="container mt-5">
    <div class="card mb-5">
      <div class="card-header">
        <h4>
          Students
          <RouterLink to="/students/create" class="btn btn-primary float-end"
            >Add Student</RouterLink
          >
        </h4>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th class="fw-bold">STT</th>
            <th class="fw-bold">Name</th>
            <th class="fw-bold">Age</th>
            <th class="fw-bold">Course</th>
            <th class="fw-bold">Email</th>
            <th class="fw-bold">Address</th>
            <th class="fw-bold">Action</th>
          </tr>
        </thead>
        <tbody v-if="this.students.length > 0">
          <tr v-for="(student, index) in this.students" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.address }}</td>
            <td>
              <RouterLink
                :to="{ path: '/students/' + student.id + '/edit' }"
                class="btn btn-success me-2"
                >Edit</RouterLink
              >
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Delete
              </button>
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Delete Student
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">...</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="deleteStudent"
                      >
                        Understood
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7">
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <paginate
      v-model="page"
      :page-count="pageCount"
      :page-range="5"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate-next";
export default {
  components: {
    Paginate,
  },

  name: "students",
  data() {
    return {
      students: [],
      page: 1,
      pageCount: this.pageCount,
    };
  },
  mounted() {
    this.getStudents();
  },

  methods: {
    getStudents(page, pageSize) {
      axios.get(import.meta.env.VITE_API_URL + "/users").then((res) => {
        this.students = res.data;
        this.students.sort((a, b) => b.id - a.id);
      });
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    deleteStudent() {
      axios.delete(import.meta.env.VITE_API_URL + "/users").then((res) => {});
    },
  },
};
</script>

<style>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
