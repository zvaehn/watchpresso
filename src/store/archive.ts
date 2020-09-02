import { Module } from 'vuex';

import {
  ArchiveStore,
  TimeEntryInterface,
} from '@/types/archive';

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
  },

  mutations: {
    ADD_ARCHIVE_ITEM: (state, time: TimeEntryInterface) => {
      state.archive.push(time);
    },
    DELETE_ARCHIVE_ITEM: (state, time: TimeEntryInterface) => {
      const imageIndex = state.archive.findIndex(
        (el: TimeEntryInterface) => el.id === time.id,
      );

      if (imageIndex >= 0) {
        state.archive.splice(imageIndex, 1);
      }
    },
    CLEAR_ARCHIVE: (state) => {
      state.archive = [];
    },
  },
};

export default ArchiveModule;
