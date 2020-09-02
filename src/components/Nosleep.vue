<template>
  <div class="nosleep">
    <!-- <span
      v-if="!noSleepEnabled"
      class="btn-small"
      @click="enableNoSleep">
      Click to keep screen awake.
    </span>
    <span
      v-else
      class="btn-small"
      @click="disableNoSleep">
      Screen keeps awake.
    </span> -->

    <div
      class="nosleep-indicator"
      :class="{ 'is-active': noSleepEnabled }">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NoSleep from 'nosleep.js';

export default Vue.extend({
  name: 'Nosleep',
  components: {},
  props: {},
  data() {
    return {
      noSleepEnabled: false,
      noSleep: new NoSleep(),
    };
  },
  methods: {
    initializeNoSleep() {
      document.addEventListener('click', this.enableNoSleep, false);
    },
    enableNoSleep() {
      this.noSleep.enable();
      this.noSleepEnabled = true;
    },
    disableNoSleep() {
      document.removeEventListener('click', this.enableNoSleep, false);
      this.noSleep.disable();
      this.noSleepEnabled = false;
    },
  },
  mounted() {
    this.noSleep.disable();
    this.initializeNoSleep();
  },
  beforeDestroy() {
    this.noSleep.disable();
  },
});
</script>

<style lang="scss">
.nosleep {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  widows: 100%;

  > .btn {
    width: 100%;
  }

  &-indicator {
    height: 2px;
    width: 100%;
    // height: 15px;
    // width: 15px;
    // border-radius: 50%;
    background-color: red;

    &.is-active {
      background-color: green;
    }
  }
}
</style>
