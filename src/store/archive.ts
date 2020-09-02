import { Module } from 'vuex';

import {
  ArchiveStore,
  TimeEntryInterface,
} from '@/types/archive';

const archiveLocalStorageKey = 'watchpresso-archive';

// eslint-disable-next-line
const ArchiveModule: Module<ArchiveStore, any> = {
  state: {
    archive: [],
  },

  getters: {
    archive: (state: ArchiveStore) => state.archive,
  },

  actions: {
    addArchiveItem({ commit }, time: TimeEntryInterface) {
      commit('ADD_ARCHIVE_ITEM', time);
    },
    deleteTime({ commit }, time: TimeEntryInterface) {
      commit('DELETE_ARCHIVE_ITEM', time);
    },
    clearArchive({ commit }) {
      commit('CLEAR_ARCHIVE');
    },
    initializeArchive({ commit }) {
      const localArchive = localStorage.getItem(archiveLocalStorageKey);

      if (localArchive) {
        try {
          const archive = JSON.parse(localArchive);

          if (archive) {
            commit('SET_ARCHIVE', archive);
          }
        } catch (e) {
          localStorage.removeItem(archiveLocalStorageKey);
        }
      }
    },
  },

  mutations: {
    ADD_ARCHIVE_ITEM: (state, time: TimeEntryInterface) => {
      state.archive.push(time);

      window.localStorage.setItem(archiveLocalStorageKey, JSON.stringify(state.archive));
    },
    SET_ARCHIVE: (state, archive: Array<TimeEntryInterface>) => {
      state.archive = archive;
    },
    DELETE_ARCHIVE_ITEM: (state, time: TimeEntryInterface) => {
      const imageIndex = state.archive.findIndex(
        (el: TimeEntryInterface) => el.id === time.id,
      );

      if (imageIndex >= 0) {
        state.archive.splice(imageIndex, 1);
      }

      window.localStorage.setItem(archiveLocalStorageKey, JSON.stringify(state.archive));
    },
    CLEAR_ARCHIVE: (state) => {
      state.archive = [];

      window.localStorage.setItem(archiveLocalStorageKey, JSON.stringify(state.archive));
    },
  },
};

export default ArchiveModule;
