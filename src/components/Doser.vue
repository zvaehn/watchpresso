<template>
  <div class="doser row flex-center flex-middle">
    <button
      class="btn-medium"
      @click="decreaseDose()">
      -
    </button>
    <div class="dose-value">
      {{ formattedDose }}
    </div>
    <button
      class="btn-medium"
      @click="increaseDose()">
      +
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Doser',
  components: {
  },
  data() {
    return {
      step: 0.5,
    };
  },
  props: {
  },
  computed: {
    dose(): number {
      return this.$store.getters.getDose;
    },
    formattedDose(): string {
      return `${this.dose.toFixed(1)}g`;
    },
  },
  methods: {
    increaseDose() {
      const newDose = this.dose + this.step;

      if (newDose < 30) {
        this.$store.dispatch('setDose', newDose);
      }
    },
    decreaseDose() {
      const newDose = this.dose - this.step;

      if (newDose > 0) {
        this.$store.dispatch('setDose', newDose);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.dose-value {
  font-size: 1.5rem;
}

.btn-medium {
  margin-bottom: 0;
}
</style>
