<template>
  <div id="app" class="container">
    <div class="paper">
      <Navigation />

      <router-view />

      <!-- <Nosleep /> -->
    </div>

    <div class="footer">
      ~
      <font-awesome-icon
        icon="coffee"
        @click="toggleDarkMode()">
      </font-awesome-icon>
      ~
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Nosleep from '@/components/Nosleep.vue';
import Navigation from '@/components/Navigation.vue';

export default Vue.extend({
  name: 'App',
  components: {
    // Nosleep,
    Navigation,
  },
  props: {},
  data() {
    return {
      darkModeIsActive: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkModeIsActive = !this.darkModeIsActive;
      const html = document.getElementsByTagName('html')[0];
      const darkmodeClass = 'dark';

      if (this.darkModeIsActive) {
        html.classList.add(darkmodeClass);
      } else {
        html.classList.remove(darkmodeClass);
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('initializeArchive');
    this.$store.dispatch('initializeDose');
    this.$store.dispatch('initializeRatio');
    this.$store.dispatch('initializeRatio');
    this.$store.dispatch('initializeGrind');
  },
});
</script>

<style lang="scss">
@import "../node_modules/papercss/dist/paper.min.css";

body {
  touch-action: manipulation;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #382C2C;
  margin-top: 20px;
}

.footer {
  margin-top: 25px;
  text-align: center;
  width: 100%;
  opacity: .1;
}
</style>
