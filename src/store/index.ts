import Vue from 'vue';
import Vuex from 'vuex';

import { BaseState } from '@/types';
import ArchiveModule from './archive';
import DoseModule from './dose';

Vue.use(Vuex);

export default new Vuex.Store<BaseState>({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ArchiveModule,
    DoseModule,
  },
});
