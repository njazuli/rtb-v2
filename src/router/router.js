/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// import vue file here
// import Layout from "../pages/Layout.vue";
import Home from '../pages/Home.vue'
// import Player from "../pages/Player.vue";
// import Live from "../pages/Live.vue";
import LiveNew from '../pages/LiveNew.vue'
import LiveNewv4 from '../pages/LiveNewv4.vue'
import GoLive from '../pages/GoLive.vue'
import Sukmaindera from '../pages/Sukmaindera.vue'
// import News from "../pages/News.vue";
// import Vod from "../pages/Vod.vue";
import VodNew from '../pages/VodNew.vue'
import Radio from '../pages/Radio.vue'
import RadioNEW from '../pages/RadioNew.vue'
import Disclaimer from '../pages/Disclaimer.vue'
import Terms from '../pages/Terms.vue'
import Privacy from '../pages/Privacy.vue'
// import Podcast from "../pages/Podcast.vue";
import PodcastNew from '../pages/PodcastNew.vue'
import PodcastPlayer from '../pages/PodcastPlayer.vue'
// import VodPlayer from "../pages/VodPlayer.vue";
import VodPlayerNew from '../pages/VodPlayerNew.vue'
import NewsPlayer from '../pages/NewsPlayer.vue'
import SpecialsPlayer from '../pages/SpecialsPlayer.vue'
import Search from '../pages/Search.vue'
import Viewall from '../pages/view_all.vue'
import Player from '../pages/Player.vue'

// new revamp ui link
import HomeNew from '../pages/HomeNew.vue'

Vue.use(Router)

const router = new Router({
  // linkActiveClass: "is-active", // active class for non-exact links.
  // linkExactActiveClass: "is-active", // active class for *exact* links.
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'home_new',
      component: HomeNew
    },
    // {
    //   path: "/live",
    //   name: "live",
    //   component: Live
    // },
    // {
    //   path: '/live/:id?',
    //   name: 'live',
    //   component: LiveNew
    // },
    {
      path: '/live/:id?',
      name: 'liveNewV4',
      component: LiveNewv4
    },
    {
      path: '/GoLIVE',
      name: 'GoLIVE',
      component: GoLive
    },
    {
      path: '/Sukmaindera',
      name: 'Sukmaindera',
      component: Sukmaindera
    },
    {
      path: '/radio/:id?',
      name: 'radio',
      component: Radio
    },
    {
      path: '/radio_new/:id?',
      name: 'radio_new',
      component: RadioNEW
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: Disclaimer
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    // {
    //   path: "/vod/:id?",
    //   name: "vod",
    //   component: Vod
    // },
    {
      path: '/vod',
      name: 'vod',
      component: VodNew
    },
    // {
    //   path: "/podcast/:id?",
    //   name: "podcast",
    //   component: Podcast
    // },
    {
      path: '/podcast',
      name: 'podcast',
      component: PodcastNew
    },
    {
      path: '/podcastplayer/',
      name: 'podcastplayer',
      component: PodcastPlayer,
      props: route => ({ id: route.id, eps_id: route.eps_id })
    },
    // {
    //   path: "/vodplayer/:id?",
    //   name: "vodplayer",
    //   component: VodPlayer
    {
      path: '/vodplayer/',
      name: 'vodplayer',
      component: VodPlayerNew,
      props: route => ({ id: route.id, eps_id: route.eps_id })
    },
    {
      // s -> for source(vod,special or news)
      // p_type -> player type true -> playlist or pe -> single
      path: '/play/',
      name: 'player',
      component: Player,
      props: route => ({
        scheme: route.scheme,
        p_type: route.p_type,
        id: route.id,
        eps_id: route.eps_id
      })
    },
    {
      path: '/newsplayer/',
      name: 'newsplayer',
      component: NewsPlayer,
      props: route => ({ id: route.id, eps_id: route.eps_id })
    },
    {
      path: '/special/:id?',
      name: 'special',
      component: SpecialsPlayer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/viewall/',
      name: 'viewall',
      component: Viewall,
      props: route => ({ cat: route.cat, contenttype: route.contenttype })
    }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
