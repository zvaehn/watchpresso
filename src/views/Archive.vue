<template>
  <div class="archive-view container-lg">
    <div
      v-for="(entries, key, i) in groupedArchive"
      class="collapsible"
      :key="key">
      <input :id="`collapsible_${key}`"
        type="checkbox"
        name="collapsible"
        :checked="i === 0">
      <label :for="`collapsible_${key}`">
        {{ key }}
      </label>
      <div class="collapsible-body">
        <table v-if="hasArchive">
          <thead>
            <tr>
              <th>Time</th>
              <th>Dur.</th>
              <th>Dose</th>
              <th>Yield</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="archive-table-body">
            <tr
              v-for="(entry, index) in entries"
              :key="`entry-${index}`">
              <td>
                <span :popover-top="formatDate(entry.date)">
                  <span class="badge">
                    {{ formatDateTime(entry.date) }}&thinsp;h
                  </span>
                </span>
              </td>
              <td>{{ entry.time / 10 }}s</td>
              <td>{{ entry.dose ? `${entry.dose.toFixed(1)}g` : '-' }}</td>
              <td>45g</td>
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
      </div>
    </div>

    <p v-if="!hasArchive" class="empty-archive">No times stopped yet.</p>

    <hr class="spacer margin-large">

    <div class="row">
      <button class="btn-small" @click="clearArchive">
        delete archive
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import TimeEntry, { GroupedArchive } from '@/types/archive';
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
    formatDate(timestamp: number): string {
      const date = new Date(timestamp);

      return date.toLocaleString(
        'de-DE',
        { timeZone: 'Europe/Berlin' },
      );
    },
    formatMonth(timestamp: number): string {
      const date = new Date(timestamp);
      return date.toLocaleDateString(this.locale, {
        month: 'long',
        year: 'numeric',
      });
    },
    formatDateTime(timestamp: number): string {
      const date = new Date(timestamp);
      return date.toLocaleTimeString(this.locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  computed: {
    hasArchive(): boolean {
      return Object.keys(this.groupedArchive).length > 0;
    },
    groupedArchive(): GroupedArchive {
      const groupedArchive: GroupedArchive = {};

      this.archive.forEach((item: TimeEntry) => {
        const month = this.formatMonth(item.date);

        if (groupedArchive[month] === undefined) {
          groupedArchive[month] = [];
        }

        groupedArchive[month].push(item);
      });

      return groupedArchive;
    },
    archive(): Array<TimeEntry> {
      return this.$store.getters.archive;
    },
    locale(): string {
      return navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
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

.archive-table-body {
  letter-spacing: 1px;
}

// Override
.collapsible input[id^='collapsible']:checked ~ div.collapsible-body {
  padding-left: 0;
  padding-right: 0;
}

[popover-top] {
  margin: 0;

  &:after {
    margin: 25px;
  }
}
</style>
