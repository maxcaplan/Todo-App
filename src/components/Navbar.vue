<template>
  <nav v-show="title" class="navbar navbar-dark bg-dark mb-3">
    <span class="navbar-text mb-0 h2">{{title}}</span>
    <span class="navbar-text mb-0 h3">
      <span>{{date}}</span>
      <span class="d-none d-sm-inline">{{time}}</span>
      <button
        v-if="!isFullscreen"
        @click="fullscreen()"
        class="btn btn-outline-secondary text-light border-0"
      >
        <i class="fas fa-expand fa-lg"></i>
      </button>
      <button
        v-if="isFullscreen"
        @click="exitFullscreen()"
        class="btn btn-outline-secondary text-light border-0"
      >
        <i class="fas fa-compress fa-lg"></i>
      </button>
    </span>
  </nav>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      title: "Todo",
      time: null,
      date: null,
      isFullscreen: false
    };
  },

  watch: {
    $route(to, from) {
      this.title = to.name;

      if (this.title == "err") {
        this.title = "";
      }
    }
  },

  created() {
    this.time = moment().format("h:mm");
    this.date = moment().format("MMM Do");
    setInterval(() => this.updatetime(), 1 * 1000);

    this.title = this.$route.name;

    if (this.title == "err") {
      this.title = "";
    }
  },

  methods: {
    //clock script
    updatetime() {
      this.time = moment().format("h:mm");
      this.date = moment().format("MMM Do");
    },

    fullscreen() {
      var element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
        this.isFullscreen = true;
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        this.isFullscreen = true;
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        this.isFullscreen = true;
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        this.isFullscreen = true;
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullscreen = false;
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        this.isFullscreen = false;
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        this.isFullscreen = false;
      }
    }
  }
};
</script>

