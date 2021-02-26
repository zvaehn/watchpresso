import { Module } from 'vuex';

import {
  DoseStore,
} from '@/types/dose';

const doseLocalStorageKey = 'watchpresso-dose';
const ratioLocalStorageKey = 'watchpresso-ratio';
const grindLocalStorageKey = 'watchpresso-grind';

const DoseModule: Module<DoseStore, unknown> = {
  state: {
    dose: 18,
    ratio: 2,
    grind: 10,
  },

  getters: {
    getDose: (state: DoseStore) => state.dose,
    getRatio: (state: DoseStore) => state.ratio,
    getGrind: (state: DoseStore) => state.grind,
    getYield: (state: DoseStore) => (state.dose * state.ratio),
  },

  actions: {
    setDose({ commit }, dose: number) {
      commit('SET_DOSE', dose);
    },
    setRatio({ commit }, ratio: number) {
      commit('SET_RATIO', ratio);
    },
    setGrind({ commit }, grind: number) {
      commit('SET_GRIND', grind);
    },
    initializeDose({ commit }) {
      const localDose = localStorage.getItem(doseLocalStorageKey);

      if (localDose) {
        try {
          const dose = JSON.parse(localDose);

          if (dose) {
            commit('SET_DOSE', dose);
          }
        } catch (e) {
          localStorage.removeItem(doseLocalStorageKey);
        }
      }
    },
    initializeRatio({ commit }) {
      const localRatio = localStorage.getItem(ratioLocalStorageKey);

      if (localRatio) {
        try {
          const ratio = JSON.parse(localRatio);

          if (ratio) {
            commit('SET_RATIO', ratio);
          }
        } catch (e) {
          localStorage.removeItem(ratioLocalStorageKey);
        }
      }
    },
    initializeGrind({ commit }) {
      const localGrind = localStorage.getItem(grindLocalStorageKey);

      if (localGrind) {
        try {
          const grind = JSON.parse(localGrind);

          if (grind) {
            commit('SET_GRIND', grind);
          }
        } catch (e) {
          localStorage.removeItem(grindLocalStorageKey);
        }
      }
    },
  },

  mutations: {
    SET_DOSE: (state, dose: number) => {
      state.dose = dose;
      window.localStorage.setItem(doseLocalStorageKey, JSON.stringify(dose));
    },
    SET_RATIO: (state, ratio: number) => {
      state.ratio = ratio;
      window.localStorage.setItem(ratioLocalStorageKey, JSON.stringify(ratio));
    },
    SET_GRIND: (state, grind: number) => {
      state.grind = grind;
      window.localStorage.setItem(grindLocalStorageKey, JSON.stringify(grind));
    },
  },
};

export default DoseModule;
