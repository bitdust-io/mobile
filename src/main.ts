import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import application from '@/services/application.service';
import '@/assets/scss/styles.scss';
// Font Awesome Icons
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Buefy from 'buefy';

Vue.config.productionTip = false;

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon'
});

new Vue({
    router,
    store,
    render: h => h(App),
    created: () => application.bootstrap()
}).$mount('#app');
