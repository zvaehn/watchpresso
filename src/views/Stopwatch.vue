<template>
  <div class="stopwatch-view">
    <Timer></Timer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Timer from '@/components/Timer.vue';

export default Vue.extend({
  name: 'Stopwatch',
  components: {
    Timer,
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

</style>
