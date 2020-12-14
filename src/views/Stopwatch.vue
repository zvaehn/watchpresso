<template>
  <div class="stopwatch-view">
    <Timer class="timer"></Timer>
    <Doser class="doser"></Doser>
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
.doser {
  margin-top: 50px;
}
</style>
