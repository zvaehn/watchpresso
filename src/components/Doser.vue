<template>
  <div class="doser-wrapper row">
    <div class="collapsible is-brew-settings">
      <input id="collapsible-brew-settings" type="checkbox" name="collapsible-brew-settings">
      <label for="collapsible-brew-settings">
        <small>
          <div class="row flex-edges brew-settings">
            <div class="col-6 col-left">
              {{ formattedDose }}
              <font-awesome-icon
                class="brew-icon"
                icon="angle-double-right">
              </font-awesome-icon>
              {{ formattedYield }}
            </div>
            <div class="col-6 col-right">
              {{ formattedGrind }}
              <font-awesome-icon
                class="brew-icon"
                icon="cogs">
              </font-awesome-icon>
            </div>
          </div>
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
            Dose: {{ formattedDose }}
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
            Ratio: {{ formattedRatio }}
          </div>
          <button
            class="btn-small"
            @click="increaseRatio()">
            +
          </button>
        </div>

        <div class="grind row flex-edges flex-middle">
          <button
            class="btn-small"
            @click="decreaseGrind()">
            -
          </button>
          <div class="grind-value">
            Grind: {{ formattedGrind }}
          </div>
          <button
            class="btn-small"
            @click="increaseGrind()">
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
      grindStep: 0.1,
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
    grind(): number {
      return this.$store.getters.getGrind;
    },
    formattedDose(): string {
      return `${this.dose.toFixed(1)}g`;
    },
    formattedRatio(): string {
      return `1:${this.ratio.toFixed(1)}`;
    },
    formattedYield(): string {
      return `${this.yield.toFixed(1)}g`;
    },
    formattedGrind(): string {
      return `${this.grind.toFixed(1)}`;
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
    increaseGrind() {
      const newGrind = this.grind + this.grindStep;
      this.$store.dispatch('setGrind', newGrind);
    },
    decreaseGrind() {
      const newGrind = this.grind - this.grindStep;

      if (newGrind > 0) {
        this.$store.dispatch('setGrind', newGrind);
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

.brew-settings {
  margin-bottom: 0;

  .col-left {
    text-align: left;
  }

  .col-right {
    text-align: right;
  }

  .brew-icon {
    opacity: .4;
    margin: 0 .1em;
  }
}

.dose-value {
  font-size: 1rem;
}

.collapsible.is-brew-settings {
  width: 100%;
}
</style>
