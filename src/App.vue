<template>
  <div id="app" class="container">
    <div class="paper">
      <Navigation />

      <router-view />

      <Nosleep />
    </div>

    <div class="footer">
      ~
      <font-awesome-icon icon="coffee"></font-awesome-icon>
      ~
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nosleep from '@/components/Nosleep.vue';
import Navigation from '@/components/Navigation.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Nosleep,
    Navigation,
  },
  props: {},
  data() {
    return {};
  },
  methods: {

  },
});
</script>

<style lang="scss">
@import "../node_modules/papercss/dist/paper.min.css";

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
