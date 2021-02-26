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
                <label
                  class="time-label"
                  :for="`entry-date-${entry.id}`">
                  {{ formatDateOnly(entry.date) }}
                </label>
                <input class="modal-state" :id="`entry-date-${entry.id}`" type="checkbox">
                <div class="modal">
                  <label class="modal-bg" :for="`entry-date-${entry.id}`"></label>
                  <div class="modal-body">
                    <label class="btn-close modal-close" :for="`entry-date-${entry.id}`">
                      ✘
                    </label>
                    <h4 class="modal-title">Entry Details</h4>
                    <p class="modal-text">
                      <table>
                        <tbody>
                          <tr>
                            <td>Time: </td>
                            <td>{{ formatDate(entry.date) }}</td>
                          </tr>
                          <tr>
                            <td>Rating: </td>
                            <td>
                              <font-awesome-icon
                                v-for="i in 5"
                                icon="star"
                                :class="{
                                  'rating-icon': true,
                                  'is-filled': entry.rating >= i,
                                }"
                                :key="i"
                                @click="setRatingForEntry(entry, i)">
                              </font-awesome-icon>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </p>
                  </div>
                </div>
              </td>
              <td>{{ entry.time / 10 }}s</td>
              <td>{{ entry.dose ? `${entry.dose.toFixed(1)}g` : '-' }}</td>
              <td>{{ getYield(entry) }}</td>
              <td>
                <font-awesome-icon
                  icon="trash"
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
    getYield(entry: TimeEntry): string {
      if (entry.dose && entry.ratio) {
        return `${(entry.dose * entry.ratio).toFixed(0)}g`;
      }

      return '-';
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
    formatDateOnly(timestamp: number): string {
      const date = new Date(timestamp);
      return date.toLocaleDateString(this.locale, {
        weekday: 'short',
        day: 'numeric',
      });
    },
    formatDateTime(timestamp: number): string {
      const date = new Date(timestamp);
      return date.toLocaleTimeString(this.locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    setRatingForEntry(entry: TimeEntry, rating: number) {
      const newEntry = entry;
      newEntry.rating = rating;

      this.$store.dispatch('updateEntry', newEntry);
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

.time-label {
  white-space: nowrap;
  border: none;
  padding: 0;
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

.rating-icon {
  opacity: .2;

  &.is-filled {
    opacity: 1;
  }
}

// Override
.collapsible {
  label.modal-close {
    border: none;
  }

  input[id^='collapsible']:checked ~ div.collapsible-body {
    padding-left: 0;
    padding-right: 0;
    max-height: fit-content;
  }
}

[popover-top] {
  margin: 0;

  &:after {
    margin: 25px;
  }
}
</style>
