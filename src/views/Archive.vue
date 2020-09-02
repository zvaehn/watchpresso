<template>
  <div class="archive-view">
    <div class="row">
      <table v-if="archive.length" >
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in archive"
            :key="entry.id">

            <td>{{ index + 1 }}</td>
            <td><strong>{{ entry.time / 10 }}s</strong></td>
            <td>{{ new Date(entry.date).toUTCString() }}</td>
            <td>
              <font-awesome-icon
              icon="times"
              class="delete-time"
              @click="deleteTime(entry)">
              </font-awesome-icon>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="empty-archive">No times stopped yet.</p>
    </div>

    <hr class="spacer margin-large">

    <div class="row">
      <button class="btn-small" @click="clearArchive">delete archive</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Archive',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    deleteTime(time: number) {
      this.$store.dispatch('deleteTime', time);
    },
    clearArchive() {
      this.$store.dispatch('clearArchive');
    },
  },
  computed: {
    archive(): Array<number> {
      return this.$store.getters.archive;
    },
  },
});
</script>

<style lang="scss" scoped>
.delete-time {
  margin-left: 10px;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
  }
}

.archive-list {
  width: 100%;
  padding: 0;

  > li {
    width: 100%;
    padding: 15px;
  }
}

.empty-archive {
  width: 100%;
  text-align: center;
}
</style>
