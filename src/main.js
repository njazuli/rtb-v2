import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueAxios from './plugins/axios.js'
import store from './plugins/store/store'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import VModal from 'vue-js-modal'
import VueForm from 'vue-form'
import SocialSharing from 'vue-social-sharing'
import VueClipboard from 'vue-clipboard2'
import VueCookie from 'vue-cookie'
import VodRailLandscape from './components/rails/vod_rails_landscape'
import RailLandscape from './components/rails/rails_landscape'
import Trunquee from './components/trunquee.vue'
import VueScriptComponent from 'vue-script-component'
import device from 'vue-device-detector'
// ads component
// import LeaderboardAds from "./components/main/leaderboard_ads";
// import MrecAds from "./components/main/mrec_ads";
import DfpSlot from './components/main/DfpSlot'
import DfpForPopup from './components/main/DfpForPopup'
import '@/mixins/generalMixin'
// Tell Vue to use the plugin

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
Vue.use(SocialSharing)
Vue.use(VueCookie)
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueAxios)
Vue.use(
  VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */
)

Vue.use(VModal)
// Vue.use(VueMeta, {
//   refreshOnceOnNavigation: true
// })
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(device)
Vue.config.productionTip = false

// import component
Vue.component('VodRailLandscape', VodRailLandscape)
Vue.component('RailLandscape', RailLandscape)
Vue.component('DfpSlot', DfpSlot)
Vue.component('DfpForPopup', DfpForPopup)
// Vue.component("MrecAds", MrecAds);
Vue.component('VueScriptComponent', VueScriptComponent)
Vue.component('Trunquee', Trunquee)
Vue.filter('formatDuration', function(value) {
  if (value) {
    // return moment(String(value)).format("HH:mm:ss");
    return new Date(value * 1000).toISOString().substr(11, 8)
  }
})
export const bus = new Vue()
window.bus = bus
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
