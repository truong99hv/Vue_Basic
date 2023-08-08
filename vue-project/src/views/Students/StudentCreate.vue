<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Add Students</h4>
      </div>

      <div class="card-body">
        <div class="mb-3">
          <label for="">Name</label>
          <input type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Age</label>
          <input type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Phone</label>
          <input type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Address</label>
          <input type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentCreate",

  data() {
    return {
      model: {
        student: {},
      },
    };
  },
};
</script>
