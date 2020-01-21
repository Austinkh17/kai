import Vue from 'vue';
import MpvueRouterPatch from 'mpvue-router-patch';
import App from '@/App';
import store from '@/store';

Vue.use(MpvueRouterPatch);
Vue.config.productionTip = false;

wx.cloud.init({
	traceUser: true,
	env: 'test-ykh'
});

const app = new Vue({
	mpType: 'app',
	store,
	...App
});
app.$mount();
