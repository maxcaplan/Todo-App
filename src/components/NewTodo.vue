<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="title"
          placeholder="What needs to be done?"
          required
        >
      </div>

      <div class="card mb-3">
        <h5 class="card-header">Who needs to do it?</h5>
        <div class="card-body">
        </div>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/" class="btn btn-secondary">Cancle</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import db from "../firebase/firebaseInit.js";
var todosCollection = db.collection("todos");

export default {
  data() {
    return {
      title: null,
      assigned: [],
      completeBy: null
    };
  },
  methods: {
    submit() {
      todosCollection
        .add({
          title: this.title,
          completed: false,
          created: Date.now()
        })
        .then(this.$router.push("/"));
    }
  }
};
</script>

