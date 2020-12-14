<template>
  <div class="doser-wrapper row">
    <div class="collapsible is-brew-settings">
      <input id="collapsible-brew-settings" type="checkbox" name="collapsible-brew-settings">
      <label for="collapsible-brew-settings">
        <small class="_brew-preview">
          {{ formattedDose }} in, {{ formattedRatio }}, {{ formattedYield }} out
        </small>
      </label>
      <div class="collapsible-body">
        <div class="doser row flex-edges flex-middle">
          <button
            class="btn-small"
            @click="decreaseDose()">
            -
          </button>
          <div class="dose-value">
            {{ formattedDose }}
          </div>
          <button
            class="btn-small"
            @click="increaseDose()">
            +
          </button>
        </div>

        <div class="ratio row flex-edges flex-middle">
          <button
            class="btn-small"
            @click="decreaseRatio()">
            -
          </button>
          <div class="dose-value">
            {{ formattedRatio }}
          </div>
          <button
            class="btn-small"
            @click="increaseRatio()">
            +
          </button>
        </div>
      </div>
    </div>
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
      doseStep: 0.5,
      ratioStep: 0.1,
    };
  },
  props: {
  },
  computed: {
    dose(): number {
      return this.$store.getters.getDose;
    },
    ratio(): number {
      return this.$store.getters.getRatio;
    },
    yield(): number {
      return this.$store.getters.getYield;
    },
    formattedDose(): string {
      return `${this.dose.toFixed(1)}g`;
    },
    formattedRatio(): string {
      return `1:${this.ratio.toFixed(1)}`;
    },
    formattedYield(): string {
      return `${this.yield}g`;
    },
  },
  methods: {
    increaseDose() {
      const newDose = this.dose + this.doseStep;

      if (newDose < 30) {
        this.$store.dispatch('setDose', newDose);
      }
    },
    decreaseDose() {
      const newDose = this.dose - this.doseStep;

      if (newDose > 0) {
        this.$store.dispatch('setDose', newDose);
      }
    },
    increaseRatio() {
      const newRatio = this.ratio + this.ratioStep;

      if (newRatio < 4) {
        this.$store.dispatch('setRatio', newRatio);
      }
    },
    decreaseRatio() {
      const newRatio = this.ratio - this.ratioStep;

      if (newRatio > 0) {
        this.$store.dispatch('setRatio', newRatio);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.doser, .ratio {
  .btn-small {
    margin: 0;
  }
}

.dose-value {
  font-size: 1rem;
}

.collapsible.is-brew-settings {
  width: 100%;
}

.brew-preview {
  margin-top: .75rem;
  display: block;
  color: grey;
  font-weight: normal;
  font-style: italic;
  letter-spacing: -1px;
}
</style>
