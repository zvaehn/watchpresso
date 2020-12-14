import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faArchive,
  faStopwatch,
  faTimes,
  faCoffee,
  faAdjust,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

library.add(
  faUserSecret,
  faArchive,
  faStopwatch,
  faTimes,
  faCoffee,
  faAdjust,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
