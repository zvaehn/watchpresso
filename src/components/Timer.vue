<template>
  <div class="timer">
    <div class="countdown">
      <div class="timer margin-large">
        <span class="seconds">{{ seconds }}</span>
        <span class="milliseconds">.{{ milliseconds }}</span>
        <span>s</span>
      </div>

      <button
        class="btn-large"
        @click="handleTimerClick">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimeEntry from '@/types/archive';

export default Vue.extend({
  name: 'Timer',
  components: {
  },
  data() {
    return {
      time: 0,
      timer: -1,
      history: [],
    };
  },
  props: {
  },
  computed: {
    seconds(): string {
      return `${Math.floor(this.time / 10)}`;
    },
    milliseconds(): string {
      return `${this.time % 10}`;
    },
    timerActive(): boolean {
      return this.timer > 0;
    },
    buttonText(): string {
      if (this.time === 0 && !this.timerActive) {
        return 'Start';
      }

      if (this.time > 0 && !this.timerActive) {
        return 'Restart';
      }

      return 'Stop';
    },
  },
  methods: {
    tick() {
      this.time += 1;
    },
    handleTimerClick() {
      if (this.time === 0 && !this.timerActive) {
        this.startTimer();
      } else if (this.time > 0 && !this.timerActive) {
        this.restartTimer();
      } else {
        this.stopTimer();
      }
    },
    toggleTimer() {
      if (this.timerActive) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.tick();
      }, 100);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = -1;

      const archiveItem = new TimeEntry({
        id: Math.random(),
        time: this.time,
        date: Date.now(),
      });

      this.$store.dispatch('addArchiveItem', archiveItem);
    },
    restartTimer() {
      this.time = 0;
      this.startTimer();
    },
  },
});
</script>

<style lang="scss" scoped>
.countdown {
  text-align: center;
}

.history {
  text-align: left;
}

.seconds {
  font-size: 4rem;
}

</style>
