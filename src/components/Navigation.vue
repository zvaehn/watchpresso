<template>
  <div class="navigation" role="navigation">
    <div class="row flex-spaces tabs">
      <template v-for="tab in tabs">
        <input
          type="radio"
          name="tabs"
          :id="tab.name"
          :checked="tab.route === activeTab"
          :key="`radio-${tab.name}`">
        <label
          :for="tab.name"
          :key="`label-${tab.name}`"
          @click="setActiveTab(tab.route)">
          <font-awesome-icon :icon="tab.icon" />
          <small> {{ tab.name }}</small>
        </label>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navigation',
  components: {},
  props: {},
  data() {
    return {
      tabs: [
        {
          icon: 'stopwatch',
          name: 'Timer',
          route: '/stopwatch',
        },
        {
          icon: 'archive',
          name: 'Archive',
          route: '/archive',
        },
      ],
      activeTab: '/stopwatch',
    };
  },
  methods: {
    setActiveTab(name: string) {
      this.activeTab = name;

      if (this.$router.currentRoute.path !== name) {
        this.$router.push(name);
      }
    },
  },
  computed: {
  },
  mounted() {
    const { path } = this.$router.currentRoute;
    const matchingTab = this.tabs.find((tab) => tab.route.search(path) >= 0);

    if (matchingTab) {
      this.activeTab = matchingTab.route;
    } else {
      this.activeTab = this.tabs[0].route;
    }
  },
});
</script>

<style lang="scss">
.navigation {
  margin-bottom: 50px;

  .tabs input:checked+label {
    border-bottom: 3px solid #D79E69;
  }
}
</style>
