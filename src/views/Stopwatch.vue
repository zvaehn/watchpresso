<template>
  <div class="stopwatch-view">
    <Timer></Timer>
    <hr class="spacer">
    <Doser></Doser>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Timer from '@/components/Timer.vue';
import Doser from '@/components/Doser.vue';

export default Vue.extend({
  name: 'Stopwatch',
  components: {
    Timer,
    Doser,
  },
  data() {
    return {};
  },
  props: {
  },
  computed: {
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
.stopwatch-view {
  .spacer {
    margin-top: 35px;
    margin-bottom: 50px;
  }
}
</style>
