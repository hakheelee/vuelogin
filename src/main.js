import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mixins from './mixins';
import vue3GoogleLogin from 'vue3-google-login';

createApp(App)
    .use(store)
    .use(router)
    .mixin(mixins)
    .use(vue3GoogleLogin, {
        clientId: '1067312245238-k0ijcrs00pkja3psil6dmeuh0pte5bkq.apps.googleusercontent.com'
    })
    .mount('#app');

window.Kakao.init('33d8c15972efdd0260e97b12ff581cd9'); // 앱키 : javascript 발급 받은 앱키
