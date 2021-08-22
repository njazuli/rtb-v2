<template>
  <div id="app">
    <navigation></navigation>
    <router-view :key="$route.fullPath" />
    <!-- <leaderboardAds v-if="desktop" class="ads_div_mb_controller"></leaderboardAds> -->
    <!-- <tabletAds v-if="tablet"></tabletAds> -->
    <!-- <mrecAds v-if="mobile"></mrecAds> -->
    <!-- <stickyAds v-if="mobile"></stickyAds> -->
    <survey ref="formfeed"></survey>
    <footers></footers>
  </div>
</template>

<script>
/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navigation from './components/header'
import Footers from './components/footernew'
import Survey from './components/popup/rtbgo_survey'
export default {
  name: 'app',
  data: function() {
    return {
      showModal: false,
      tablet: false,
      mobile: false,
      desktop: false,
      updated: false
    }
  },
  components: {
    navigation: Navigation,
    footers: Footers,
    survey: Survey
  },
  methods: {
    getCookies() {
      var checkCookies = this.$cookie.get('survey')
      if (checkCookies === 'shown') {
        this.showModal = false
      } else {
        this.setCookies()
      }
    },
    setCookies() {
      this.$cookie.set('survey', 'shown', { expires: '4h' })
      this.openModal()
    },
    openModal() {
      this.$refs.formfeed.show()
    },
    deviceCheck() {
      if (this.$device.ipad) {
        this.tablet = true
      } else if (this.$device.mobile) {
        this.mobile = true
      } else {
        this.desktop = true
      }
    }
  },
  updated() {},
  mounted() {
    this.deviceCheck()
    setTimeout(
      function() {
        this.getCookies()
      }.bind(this),
      2000
    )
  }
}
</script>

<style>
@font-face {
  font-family: 'Sf-ui-ultralight';
  src: local('Sf-ui-ultralight'),
    url(./fonts/sf-ui-display-ultralight.otf) format('opentype');
}

@font-face {
  font-family: 'Sf-ui-medium';
  src: local('Sf-ui-medium'),
    url(./fonts/sf-ui-display-medium.otf) format('opentype');
}

@font-face {
  font-family: 'Sf-ui-bold';
  font-weight: bold;
  src: local('Sf-ui-bold'),
    url(./fonts/sf-ui-display-bold.otf) format('opentype');
}

html {
  min-height: 100%; /* make sure it is at least as tall as the viewport */
  position: relative;
  background: #191919;
}

* {
  font-family: 'Sf-ui-medium', sans-serif;
}
body {
  height: 100%;
}

.cursor-pointer {
  cursor: pointer;
}

#app {
  font-family: 'Sf-ui-medium', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
  background: #191919;
}
#nprogress .bar {
  background: #fab900 !important;
  border: 5px solid #fab900;
}
.container-fluid {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  /* overflow-y: hidden; don't show content that exceeds my height */
}
.heightcontroller {
  height: calc(100vh - 202px);
}
.mb_controller {
  width: 100%;
  /* margin-bottom: 80px; */
}
@media only screen and (min-width: 992px) {
  .mr-lg-up {
    margin-right: -15px !important;
  }
}

@media only screen and (max-width: 768px) {
  .mb_controller {
    margin-bottom: 0;
    margin-top: 48px;
  }
  .stick_nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 11;
  }
  .remove_m_p {
    padding: 0;
    margin: 0;
  }
}
@media only screen and (min-width: 768px) and (max-width: 974px) {
  .mb_controller {
    margin-bottom: 0;
  }
}

@media only screen and (min-width: 1440px) {
  .mb_controller {
    margin-bottom: 0px;
  }
  .ads_div_mb_controller {
    margin-bottom: 75px;
  }
}
</style>
