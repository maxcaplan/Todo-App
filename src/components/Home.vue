<template>
  <div class="container">
    <h1>Home</h1>
    <button class="btn btn-primary" @click="getData">Get</button>
    <button class="btn btn-secondary" @click="makeData">Make</button>
    <button class="btn btn-warning" @click="clearData">Clear</button>
  </div>
</template>
<script>
import db from "../firebase/firebaseInit.js";

export default {
  data() {
    return {
      test: []
    };
  },
  methods: {
    makeData() {
      console.log("make");

      db.collection("test").add({
        num: Math.floor(Math.random() * 100)
      });
    },
    getData() {
      console.log("get");

      db.collection("test")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              num: doc.data().num
            };
            this.test.push(data);
          });
        });
    },
    clearData() {
      console.log("clear");
    }
  }
};
</script>

