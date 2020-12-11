import { Module } from 'vuex';

import {
  DoseStore,
} from '@/types/dose';

const doseLocalStorageKey = 'watchpresso-dose';

const DoseModule: Module<DoseStore, unknown> = {
  state: {
    dose: 18,
  },

  getters: {
    getDose: (state: DoseStore) => state.dose,
  },

  actions: {
    setDose({ commit }, dose: number) {
      commit('SET_DOSE', dose);
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
  },

  mutations: {
    SET_DOSE: (state, dose: number) => {
      state.dose = dose;
      window.localStorage.setItem(doseLocalStorageKey, JSON.stringify(dose));
    },
  },
};

export default DoseModule;
