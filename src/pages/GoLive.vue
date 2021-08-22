<template>
  <div class="mb_controller" v-bind:style="epsColStyles">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="header_title">
            <!-- <img src="../assets/sukmaindera.png" /> -->
            <!-- <img v-bind:src="channels.img_link" style="width:100%" /> -->
            <span class="bg_text">{{ channel_title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ads top -->
    <!-- <billboardBannerTop v-if="desktop"></billboardBannerTop>
    <mrecBannerTop v-if="mobile"></mrecBannerTop> -->

    <div class="container-fluid">
      <div class="row d-flex justify-content-center align-items-center my-3">
        <div class="col-md-7">
          <div class="embed-responsive embed-responsive-16by9">
            <div
              id="vidBox"
              class="player embed-responsive-item"
              ref="vidBox"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="row d-flex justify-content-center align-items-center mt-4 mb-2 pb-4"
      >
        <div class="col-md-12">
          <div class="channel_logo_bottom d-inline-block align-middle">
            <img class v-bind:src="thumbnail" />
          </div>
          <span class="d-inline-block align-middle np_bottom pl-3"
            >NOW PLAYING</span
          >
        </div>
      </div>
      <div class="row d-flex justify-content-center mt-2 mb-4">
        <div class="col-12 col-md-8">
          <p
            class="text-center eps"
            style="white-space: pre-line"
            v-html="desc.replace(/(?:\r\n|\r|\n|\n\n)/g, '<br />')"
          ></p>
        </div>
      </div>
      <div class="row d-flex justify-content-center mb-2 pb-2">
        <div class="col-12 d-flex justify-content-center pb-4">
          <div class="sharebtn" @click="openModal(channel_title)">
            <img src="../assets/sharebtn.png" />
            <span>Share</span>
          </div>
          <social ref="social"></social>
        </div>
      </div>

      <!-- ads bottom -->
      <billboardbannerbottom v-if="desktop"></billboardbannerbottom>
      <mrecbannerbottom v-if="mobile"></mrecbannerbottom>

      <!-- gpt ads -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
// custom skin css
// import '../customplayertheme.css';
import videojs from 'video.js'
window.videojs = videojs
import Vue from 'vue'
import social from '../components/popup/sharepopup'
import { bus } from '../main'
// ads
import billboardBannerTop from '../components/ads/billboardBannerTop'
import mrecBannerTop from '../components/ads/mrecBannerTop'
import billboardBannerMiddle from '../components/ads/billboardBannerMiddle'
import mrecBannerMiddle from '../components/ads/mrecBannerMiddle'
import BillboardBannerBottom from '../components/ads/billboardBannerBottom'
import MrecBannerBottom from '../components/ads/mrecBannerBottom'
export default {
  data: function() {
    return {
      eps_title: '',
      childDataLoaded: false,
      epsColStyles: {},
      window: {
        height: 0
      },
      share: [],
      live_tv: [],
      url: '',
      showModal: false,
      topheaderimg: '',
      thumbnail: '',
      channel_title: '',
      desc: '',
      sukmainderaID: 2,
      GoLiveId: 1229,
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  components: {
    social: social,
    billboardBannerTop: billboardBannerTop,
    mrecBannerTop: mrecBannerTop,
    billboardBannerMiddle: billboardBannerMiddle,
    mrecBannerMiddle: mrecBannerMiddle,
    billboardbannerbottom: BillboardBannerBottom,
    mrecbannerbottom: MrecBannerBottom
  },
  methods: {
    deviceCheck() {
      if (this.$device.ipad) {
        this.tablet = true
      } else if (this.$device.mobile) {
        this.mobile = true
      } else {
        this.desktop = true
      }
    },
    openModal(channel_title) {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: channel_title
      }

      bus.$emit('shareVar', this.share)
      this.$refs.social.show()

      //console.log("in");
    },
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options
      }
    },
    goTo(link) {
      this.$router.push(link)
    },
    initializecontentview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/viewed',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          idContent: '2', // Content ID from content api response
          contentTitle: 'RTB Sukmaindera', // Content Longtitle from content api response
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          //   console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg)
        }
      })
    },
    initializepageview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/page-view',
        contentType: 'application/json',
        data: JSON.stringify({
          href: this.$route.path,
          title: 'live',
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          //   console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg)
        }
      })
    },
    handleResize() {
      this.window.height = window.innerHeight
      // var minHeight = this.window.height - 140 + "px";
      var minHeight = this.window.height
      Vue.set(this.epsColStyles, 'min-height', minHeight)
    },
    PlayerInit(value) {
      var target = document.getElementById('vidBox')
      var gluePlayer = new GluePlyr()
      gluePlayer.setup(value, {
        apiPath: 'https://rtb.glueapi.io',
        target: target,
        poster:
          'https://rtb.glueapi.io/v1/content/' +
          value +
          '/image/1200x0/images.title?quality=100', //Replace with the id 413 with the id of the content
        site: 'RTBGo',
        type: 'video', // video or audio
        skin: false // false or title (Tile Skin is used for creating player with title image
      })

      window.gluePlayer = gluePlayer
      this.childDataLoaded = true

      this.live_tv.forEach(item => {
        if (item.id == value) {
          this.topheaderimg = this.imgFiltering(item)
          this.thumbnail = this.imgFiltering(item)
          this.channel_title = item.title
          this.desc = item.data.description
        }
      })
    },
    setInitialId() {
      this.$router.push('/live/' + this.live_tv[0].id)
      // console.log(this.$route.params.id);
    },
    installOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: false,
        nav: true,
        dots: false,
        margin: 10,
        responsiveClass: true,
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            this.settings.loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            nav: true,
            stagePadding: 0
          },
          600: {
            items: 2,
            nav: true,
            stagePadding: 0
          },
          768: {
            items: 5,
            stagePadding: 0,
            loop: false
          }
        }
      })
    },
    imgFiltering(item) {
      var imgurl
      //check if
      var checkThumbnail =
        item.data && item.data.images && item.data.images.thumbnail
      var checkTitle = item.data && item.data.images && item.data.images.title

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/300x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/300x0/' + item.data.images.title.path
        } else {
          imgurl =
            'https://cdn-rtb.glueapi.io/v1/content/' +
            item.id +
            '/image/300x0/images.title'
        }
      }

      return imgurl
    },
    filterLiveTv() {
      this.live_tv = this.$store.state.live_tv.data

      var vm = this
      vm.live_tv = this.$store.state.live_tv.data
      var store = []
      var imgurl
      vm.live_tv.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.live_tv = store

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#liveCarousel')
        }.bind(vm)
      )
    }
  },
  created() {
    this.$store.dispatch('fetchLiveTV', { self: this })
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    // peer5.destroy();
  },
  computed: {
    watchDataIn() {
      return this.$store.state.live_tv.data
    },
    initPeer() {
      // Our fancy notification (2).
      // peer5
      // peer5.destroy();
      // peer5.init();
      // peer5.isInitialized();
    }
  },
  watch: {
    watchDataIn(newCount, oldCount) {
      // Our fancy notification (2).
      if (newCount) {
        var liveArr = this.live_tv
        var idPlayer
        if (liveArr) {
          liveArr.forEach(item => {
            if (item.id == this.GoLiveId) {
              this.PlayerInit(item.id)
            }
          })
        }
      }
    }
  },
  mounted() {
    this.deviceCheck()
  }
}
</script>
<style scoped>
.bg {
  background: #292929;
  height: auto !important; /* cross-browser */
  height: 100%; /* cross-browser */
  /* margin-bottom: 103px; */
}
.bg_header {
  background: url('../assets/headerbg.png');
  background-size: cover;
}
.bg_text {
  font-family: Sf-ui-medium;
  font-size: 35px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1.75px;
  text-align: center;
  color: #ffffff;
}
.header_title {
  width: 100%;
  height: auto;
  padding: 20px 0px;
  text-align: center;
}
.channel_logo img {
  width: 100%;
}

.channel_logo_bottom {
  width: 100px;
}
.channel_logo_bottom img {
  width: 100%;
}
.np_bottom {
  font-size: 22px;
  color: #fab900;
  font-weight: 300;
}
.eps {
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #cccccc;
  padding: 0;
  margin: 0 0 3px;
}
/* @media only screen and (max-width: 768px) {
  .bg {
    margin-bottom: 60px;
  }
} */
</style>
