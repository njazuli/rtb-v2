<template>
  <div id="app-layout" class="navbar-dark bg-dark">
    <navigation></navigation>
    <router-view />
    <stickyAds></stickyAds>
    <footers></footers>
    <survey ref="formfeed"></survey>
  </div>
</template>

<script>
import Navigation from '../components/header'
import Footers from '../components/footernew'
import Survey from '../components/popup/rtbgo_survey'
import stickyAds from '../components/main/sticky_ads'

export default {
  data: function() {
    return {
      showModal: false
    }
  },
  name: 'app-layout',
  components: {
    navigation: Navigation,
    footers: Footers,
    survey: Survey,
    stickyAds: stickyAds
  },
  methods: {
    getCookies() {
      var checkCookies = this.$cookie.get('survey')
      if (checkCookies === 'shown') {
        this.showModal = false
        console.log('nocookies')
      } else {
        this.setCookies()
        console.log('setcookies')
      }
    },
    setCookies() {
      this.$cookie.set('survey', 'shown', { expires: '4h' })
      this.openModal()
    },
    openModal() {
      this.$refs.formfeed.show()
    }
  },
  mounted() {
    setTimeout(function() {
      this.getCookies()
    }, 10000)
  }
}
</script>

<style></style>
