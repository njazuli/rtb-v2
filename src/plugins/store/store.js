/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios_http from 'axios'
import VueAxios from '../axios'

Vue.use(VueAxios)
Vue.use(Vuex)
const axios = axios_http
const store = new Vuex.Store({
  state: {
    masthead: [],
    radio_data: [],
    pod_folder: [],
    pod_episode: [],
    vod_folder: [],
    vod_episode: [],
    news: [],
    news_episode: [],
    specials_vod: [],
    trending: [],
    live_tv: [],
    featured: [],
    vodmixednews: [],
    vodmixednewseps: [],
    latest: []
  },
  mutations: {
    FETCH_VODMIXEDFOLDER(state, vodmixednews) {
      state.vodmixednews = vodmixednews
    },
    FETCH_VODMIXEDEPS(state, vodmixednewseps) {
      state.vodmixednewseps = vodmixednewseps
    },
    FETCH_MASTHEADS(state, mastheads) {
      state.mastheads = mastheads
    },
    FETCH_RADIO(state, radio) {
      state.radio = radio
    },
    FETCH_PODFOLDER(state, podcast) {
      state.podcast = podcast
    },
    FETCH_PODEPISODES(state, podcastepisode) {
      state.podcastepisode = podcastepisode
    },
    FETCH_VODFOLDER(state, vod) {
      state.vod = vod
    },
    FETCH_VODEPISODES(state, vodepisode) {
      state.vodepisode = vodepisode
    },
    FETCH_NEWS(state, news_eps) {
      state.news_eps = news_eps
    },
    FETCH_NEWSEPISODES(state, newsepisode) {
      state.newsepisode = newsepisode
    },
    FETCH_SPECIALS(state, special) {
      state.special = special
    },
    FETCH_TRENDING(state, trending) {
      state.trending = trending
    },
    FETCH_TV(state, live_tv) {
      state.live_tv = live_tv
    },
    FETCH_FEATURED(state, featured) {
      state.featured = featured
    },
    FETCH_LATEST(state, latest) {
      state.latest = latest
    }
  },
  actions: {
    fetchMastheads({ commit }, { self }) {
      try {
        axios.get('https://rtb.glueapi.io/v1/content').then(function(response) {
          this.masthead = response.data
          commit('FETCH_MASTHEADS', this.masthead)
          self.filterMasthead()
        })
      } catch (e) {
        console.log(e)
      }
    },
    fetchFeatured({ commit }, { self }) {
      try {
        axios
          .get(
            'https://cdn-rtb.glueapi.io/v1/content?isFeatured=1&sort=-dateFeature'
          )
          .then(response => {
            this.featured = response.data
            commit('FETCH_FEATURED', this.featured)
            self.filterFeatured()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchLatest({ commit }, { self }) {
      try {
        axios
          .get(
            'https://cdn-rtb.glueapi.io/v1/content?idSchemas=206,208,209&limit=10&&sort=-dateAvailability'
          )
          .then(response => {
            this.latest = response.data
            commit('FETCH_LATEST', this.latest)
            self.filterLatest()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchNews({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=207&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.news = response.data
            commit('FETCH_NEWS', this.news)
            self.filterNews()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchNewsEpisodes({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=208&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.news_episode = response.data
            commit('FETCH_NEWSEPISODES', this.news_episode)
            self.filterNewsEpisode()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchSpecials({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=209&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.specials_vod = response.data
            commit('FETCH_SPECIALS', this.specials_vod)
            self.filterSpecials()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchRadio({ commit }, { self }) {
      try {
        axios
          .get('https://rtb.glueapi.io/v1/content?idSchema=202&limit=1000')
          .then(response => {
            this.radio_data = response.data
            commit('FETCH_RADIO', this.radio_data)
            self.filterRadio()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchPodFolder({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=203&limit=300&sort=-dateAvailability'
          )
          .then(response => {
            this.pod_folder = response.data
            commit('FETCH_PODFOLDER', this.pod_folder)
            self.filterPodFolder()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchPodEpisodes({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=204&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.pod_episode = response.data
            commit('FETCH_PODEPISODES', this.pod_episode)
            self.filterPodEpisode()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchVodFolder({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=205&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.vod_folder = response.data
            commit('FETCH_VODFOLDER', this.vod_folder)
            self.filterVodFolder()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchVodMixedFolder({ commit }, { self }) {
      try {
        axios
          .get(
            'https://cdn-rtb.glueapi.io/v1/content?idSchemas=205,207,209&limit=300&sort=-dateAvailability'
          )
          .then(response => {
            this.vodmixednews = response.data
            commit('FETCH_VODMIXEDFOLDER', this.vodmixednews)
            self.filterVodMixedFolder()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchVodMixedEps({ commit }, { self }) {
      try {
        axios
          .get(
            'https://cdn-rtb.glueapi.io/v1/content?idSchemas=206,208,209&limit=10000&&sort=-data.episode_number/ns&include=title'
          )
          .then(response => {
            this.vodmixednewseps = response.data
            commit('FETCH_VODMIXEDEPS', this.vodmixednewseps)
            self.filterVodMixedEps()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchVodEpisodes({ commit }, { self }) {
      try {
        axios
          // .get(
          //   "https://cdn-rtb.glueapi.io/v1/content?idSchemas=206,208&limit=10000&sort=-dateAvailability"
          // )
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=206&limit=1000&sort=-data.episode_number/ns&include=title'
          )
          .then(response => {
            this.vod_episode = response.data
            commit('FETCH_VODEPISODES', this.vod_episode)
            self.filterVodEpisode()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchTrending({ commit }, { self }) {
      // popular api
      // https://rtb.glueapi.io/v1/content/sort/trending?limit=20&periodvalue=30
      //  "https://rtb.glueapi.io/v1/content/sort/popular?limit=40&idSchema=205&limit=1000&sort=-dateAvailability"
      //https://rtb.glueapi.io/v1/content/sort/popular?limit=40&periodtype=month&periodvalue=1&idSchema=205
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content/sort/trending?limit=20&periodvalue=30'
          )
          .then(response => {
            this.trending = response.data
            commit('FETCH_TRENDING', this.trending)
            self.filterTrending()
          })
      } catch (e) {
        console.log(e)
      }
    },
    fetchLiveTV({ commit }, { self }) {
      try {
        axios
          .get(
            'https://rtb.glueapi.io/v1/content?idSchema=201&limit=1000&sort=-dateAvailability'
          )
          .then(response => {
            this.live_tv = response.data
            commit('FETCH_TV', this.live_tv)
            self.filterLiveTv()
          })
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default store

// get("../../assets/json_dummy/masthead.json")
