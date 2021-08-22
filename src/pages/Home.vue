<template>
  <div class="mb_controller">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="channel_logo">
            <img src="../assets/rtb-go-header-img.png" />
          </div>
        </div>
      </div>
    </div>

    <!-- masthead -->
    <div class="pt-3 pb-2 fullwidth d-flex justify-content-center">
      <div class="col-12 my-3 px-4 main-content">
        <div class="owl-carousel owl-theme" id="mastheadcar">
          <div
            class="item"
            v-for="item_featured in featured"
            :key="item_featured.id"
            @click="goTo(checkLink(item_featured))"
          >
            <div class="item_img">
              <img
                v-bind:src="item_featured.img_link"
                @error="imageLoadError($event)"
              />
            </div>
          </div>
        </div>
        <div class="owl-theme">
          <div class="owl-controls d-md-block d-none">
            <div class="custom-nav owl-nav"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- masthead ends -->

    <!-- <div class="container-fluid"> -->
    <!-- ads -->
    <!-- <div
        class="row my-2 pb-3 d-none d-sm-flex justify-content-center align-items-center flex-column"
      >
        <div class="col-12 col-md-9 col-xl-8" @click="goToBanner(mnnlink)">
          <img src="../assets/banner/app_promo_d.jpg" class="img-fluid" />
        </div>
      </div> -->

    <!-- ads mobile -->

    <!-- <div class="container-fluid"> -->
    <!-- ads -->
    <!-- <div
        class="row my-2 pb-3 d-none d-sm-flex justify-content-center align-items-center flex-column"
      >
        <div class="col-12 col-md-9 col-xl-8" @click="goToBanner(mnnlink)">
          <img src="../assets/banner/app_promo_d.jpg" class="img-fluid" />
        </div>
      </div> -->

    <!-- ads mobile -->
    <!-- <div
        class="row my-2 pb-3 d-flex d-sm-none justify-content-center align-items-center flex-column"
      >
        <div class="col-12" @click="goToBanner(mnnlink)">
          <img src="../assets/banner/app_promo_m.jpg" class="img-fluid" />
        </div>
      </div> -->

    <!-- ads top -->
    <billboardBannerTop v-if="desktop"></billboardBannerTop>
    <mrecBannerTop v-if="mobile"></mrecBannerTop>

    <!-- latest video -->
    <div class="container-fluid">
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">LATEST VIDEO</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="latestcarousel">
            <div
              class="item"
              v-for="item_vod in latest"
              :key="item_vod.id"
              @click="goTo(checkLink(item_vod))"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_vod.img_link"
                  @error="imageLoadError($event)"
                />
                <div
                  v-if="item_vod.shownewimage"
                  style="position:absolute;top:0;right:0;padding:0px 10px 3px;background:#fab92b;border-radius:4px;"
                >
                  <span style="color:#292929;font-weight:500;font-size:11px;"
                    >NEW</span
                  >
                </div>
              </div>
              <p class="items_title pl-1" v-if="item_vod.data.program">
                <Trunquee
                  :text="item_vod.data.program.title + '-' + item_vod.title"
                />
              </p>
              <p class="items_title pl-1" v-else-if="!item_vod.data.program">
                <Trunquee :text="item_vod.title" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ads -->
    <!-- <div
        class="row my-2 pb-3 d-none d-md-flex justify-content-center align-items-center flex-column"
      >
        <div class="col-12 col-md-9 col-xl-8" @click="goToBanner(mnnlink)">
          <img
            src="../assets/banner/2019-ncov-reduce-risk-d.png"
            class="img-fluid"
          />
        </div>
      </div> -->

    <!-- ads mobile -->
    <!-- <div
        class="row my-2 pb-3 d-flex d-sm-none justify-content-center align-items-center flex-column"
      >
        <div class="col-12" @click="goToBanner(mnnlink)">
          <img
            src="../assets/banner/2019-ncov-reduce-risk-m.png"
            class="img-fluid"
          />
        </div>
      </div> -->

    <!-- ads mid -->
    <!-- ads -->
    <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
    <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>

    <div class="container-fluid">
      <div class="row mt-3 pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE RADIO</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <carousel
            :autoplay="false"
            :nav="true"
            :items="1"
            :loop="true"
            :dots="false"
            :responsive="{
              0: { items: 1, nav: true, stagePadding: 0 },
              600: { items: 2, nav: true, stagePadding: 0 },
              768: { items: 5, stagePadding: 0, loop: false }
            }"
          >
            <div
              style="margin: 0px 5px;border-radius: 4px;padding: px;"
              v-for="item in mastheads.response"
              :key="item.id"
              class="img-wrapper-masthead"
            >
              <router-link
                :to="{ path: '/radio/' + item.id }"
                style="border-radius: 4px;"
              >
                <img style="width:100%;border-radius: 4px;" :src="item.image" />
              </router-link>
            </div>
          </carousel>
        </div>
      </div>
      <!-- radio -->
      <!-- <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE RADIO</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="radiocarousel">
            <div
              class="item"
              v-for="item_radio in radio"
              :key="item_radio.id"
              @click="goTo('/radio/'+item_radio.id)"
            >
              <div class="item_img">
                <img v-bind:src="item_radio.img_url" />
              </div>
              <p class="items_title pl-1">{{item_radio.title}}</p>
            </div>
          </div>
        </div>
      </div>-->

      <!-- vod -->
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE VOD</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="vodcarousel">
            <div
              class="item"
              v-for="item_vod in vod"
              :key="item_vod.id"
              @click="goTo(checkLink(item_vod))"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_vod.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">
                <Trunquee :text="item_vod.title" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- podcast -->
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE PODCAST</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="podcarousel">
            <div
              class="item"
              v-for="item_pod in podCast"
              :key="item_pod.id"
              @click="goTo('/podcastplayer?id=' + item_pod.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_pod.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">
                <Trunquee :text="item_pod.title" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ads -->
    <!-- close for now -->
    <!-- <div class="row my-2 pb-3 d-flex justify-content-center align-items-center flex-column">
        <div class="col-12 col-md-10 col-lg-8 col-xl-7">
          <div class="d-none d-sm-flex full_width justify-content-center banner_mnn">
            <img src="../assets/banner/promo_d.jpg" class="full_width" />
          </div>
          <div class="d-flex d-sm-none full_width justify-content-center banner_mnn">
            <img src="../assets/banner/promo_m.jpg" class="full_width" />
          </div>
        </div>
      </div>-->

    <!-- ads -->
    <!-- <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-5 col-lg-6 col-xl-7">
          <div
            class="full_width d-flex justify-content-center banner_mnn"
            id="adsfromgoogle"
          ></div>
        </div>
      </div> -->

    <!-- ads bottom -->
    <billboardbannerbottom v-if="desktop"></billboardbannerbottom>
    <mrecbannerbottom v-if="mobile"></mrecbannerbottom>
  </div>
</template>
<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
// custom skin css
// import '../customplayertheme.css';
import Vue from 'vue'
import carousel from 'vue-owl-carousel'
import videojs from 'video.js'
window.videojs = videojs
import RadioService from '../static/json_dummy/radio.json'
import noimage from '../assets/noimage.png'
require('../../node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.js')

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
      mastheads: RadioService,
      podCast: [],
      vod: [],
      radio: [],
      latest: [],
      featured: [],
      mnnlink: '',
      splink: '/live/1229',
      limit: 7,
      playerOptions: {
        // videojs and plugin options
        // autoplay: "play",
        responsive: true,
        aspectRatio: '16:9',
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://rtb-channel.glue.live/smil:rtb1/playlist.m3u8?DVR'
          }
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: '../assets/sukmaindera.png'
      },
      noimage: noimage,
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  components: {
    carousel: carousel,
    carouselOne: carousel,
    billboardBannerTop: billboardBannerTop,
    mrecBannerTop: mrecBannerTop,
    billboardBannerMiddle: billboardBannerMiddle,
    mrecBannerMiddle: mrecBannerMiddle,
    billboardbannerbottom: BillboardBannerBottom,
    mrecbannerbottom: MrecBannerBottom
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options
      }
    },
    playRadio(value) {
      this.$router.push('/radio/' + value.id)
    },
    goTo(link) {
      this.$router.push(link)
    },
    goToBanner(link) {
      this.$router.push(link)
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
            this.loop = false
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
    installOwlCarouselForMasthead: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: false,
        nav: false,
        center: true,
        navText: [
          '<i class="fa fa-angle-left" aria-hidden="true"></i>',
          '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        navContainer: '.main-content .custom-nav',
        dots: false,
        margin: 10,
        responsiveClass: true,
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            this.loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            nav: false,
            stagePadding: 0,
            center: true
          },
          600: {
            items: 1,
            nav: false,
            stagePadding: 0,
            loop: true,
            center: false
          },
          768: {
            items: 1,
            stagePadding: 200,
            margin: 10,
            loop: true,
            nav: true
          },
          990: {
            items: 1,
            stagePadding: 330,
            margin: 10,
            loop: true,
            nav: true
          },
          1920: {
            items: 5,
            stagePadding: 0,
            loop: true,
            nav: true
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
      var checkImgFeature =
        item.data && item.data.images && item.data.images.feature

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/500x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/500x0/' + item.data.images.title.path
        } else {
          if (checkImgFeature) {
            imgurl =
              'https://rtb-images.glueapi.io/500x0/' +
              item.data.images.feature.path
          } else {
            imgurl =
              'https://cdn-rtb.glueapi.io/v1/content/' +
              item.id +
              '/image/300x0/images.title'
          }
        }
      }
      return imgurl
    },
    imgFilteringForMasthead(item, size) {
      var imgurl
      //check if
      var checkThumbnail =
        item.data && item.data.images && item.data.images.thumbnail
      var checkTitle = item.data && item.data.images && item.data.images.title
      var checkImgFeature =
        item.data && item.data.images && item.data.images.feature

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/' +
          size +
          'x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/' +
            size +
            'x0/' +
            item.data.images.title.path
        } else {
          if (checkImgFeature) {
            imgurl =
              'https://rtb-images.glueapi.io/' +
              size +
              'x0/' +
              item.data.images.feature.path
          } else {
            imgurl =
              'https://cdn-rtb.glueapi.io/v1/content/' +
              item.id +
              '/image/' +
              size +
              'x0/images.title'
          }
        }
      }
      return imgurl
    },
    checkLink(item) {
      var idSchema, check
      var id = item.id
      var title = item.data.title

      var link

      // console.log(JSON.stringify(item,null,2));

      if (item.idSchema == '205' || item.idSchema == '206') {
        //vod
        link =
          '/play?scheme=' +
          item.idSchema +
          '&p_type=true&id=' +
          item.id +
          '&eps_id='
      } else if (item.idSchema == '205') {
        //vod
        link =
          '/play?scheme=' +
          item.idSchema +
          '&p_type=true&id=' +
          item.id +
          '&eps_id='
      } else if (item.idSchema == '207') {
        //news
        link =
          '/play?scheme=' +
          item.idSchema +
          '&p_type=true&id=' +
          item.id +
          '&eps_id='
      } else if (item.idSchema == '208') {
        //vod
        link =
          '/play?scheme=' +
          item.idSchema +
          '&p_type=true&id=' +
          item.id +
          '&eps_id='
      } else if (item.idSchema == '209') {
        //news
        idSchema = '209'
        // console.log(JSON.stringify(item, null, 2));
        link = '/play?scheme=209&p_type=false&id=' + item.id + '&eps_id='
      } else if (item.idSchema == '203') {
        //news
        idSchema = '209'
        // console.log(JSON.stringify(item, null, 2));
        link = '/podcastplayer?id=' + item.id
      } else if (item.idSchema == '204') {
        //pod episode
        // get main podcast id id=382&eps_id=385
        var podcast_id = item.data.podcast.id
        link = '/podcastplayer?id=' + podcast_id + '&eps_id=' + item.id
        // console.log(link);
      }

      return link
    },
    filterVodMixedFolder() {
      var vm = this
      vm.vod = this.$store.state.vodmixednews.data

      var store = []
      var imgurl
      vm.vod.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      // vm.vod = store;
      vm.vod = store.slice(0, 15)
      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#vodcarousel')
        }.bind(vm)
      )
    },
    filterFeatured() {
      var vm = this
      vm.featured = this.$store.state.featured.data

      var store = []
      var imgurl

      vm.featured.forEach(item => {
        if (
          (item.idSchema == '202') |
          (item.idSchema == '203') |
          (item.idSchema == '204') |
          (item.idSchema == '205') |
          (item.idSchema == '206') |
          (item.idSchema == '207') |
          (item.idSchema == '208') |
          (item.idSchema == '209')
        ) {
          var idSchema = item.idSchema
          var id = item.id
          var title = item.data.title

          var link
          if (idSchema == '202') {
            //radio
            link = '/radio/' + item.id
          } else if (idSchema == '203') {
            //pod
            link = '/podcastplayer?id=' + item.id
          } else if (idSchema == '204') {
            //pod episode
            link = '/podcastplayer?id=' + item.id
          } else if (idSchema == '205') {
            //vod
            link = '/vodplayer?id=' + item.id
          } else if (idSchema == '206') {
            //vod episode
            link = '/vodplayer?id=' + item.id
          } else if (idSchema == '207') {
            //news
            // link = "/newsplayer?id=" + item.id;
            link = '/vodplayer?id=' + item.id
          } else if (idSchema == '208') {
            //news episode
            // link = "/newsplayer?id=" + item.id;
            link = '/vodplayer?id=' + item.id
          } else if (idSchema == '209') {
            //specials
            link = '/special/' + item.id
          }

          item['img_link'] = this.imgFilteringForMasthead(item, 800)
          item['link'] = link
          store.push(item)
        }
      })

      vm.featured = store

      Vue.nextTick(
        function() {
          vm.installOwlCarouselForMasthead('#mastheadcar')
        }.bind(vm)
      )
    },
    filterPodFolder() {
      // this.podCast = this.$store.state.podcast.data;
      var vm = this
      vm.podCast = this.$store.state.podcast.data

      var store = []
      var imgurl
      vm.podCast.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      // vm.podCast = store;
      vm.podCast = store.slice(0, 15)
      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#podcarousel')
        }.bind(vm)
      )
    },

    filterLatest() {
      //for latest video
      var vm = this
      vm.latest = this.$store.state.latest.data

      var store = []
      var imgurl
      vm.latest.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        var timecompare = this.formatTimestamp(item.dateAvailability)
        item['shownewimage'] = timecompare
        store.push(item)
      })

      vm.latest = store.slice(0, 25)

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#latestcarousel')
        }.bind(vm)
      )
    },

    imageLoadError(event) {
      event.target.src = noimage
    },
    initializepageview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/page-view',
        contentType: 'application/json',
        data: JSON.stringify({
          href: self.$route.path,
          title: 'home',
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          console.log(data)
        },
        failure: function(errMsg) {
          console.log(errMsg)
        }
      })
    },
    formatTimestamp(dt) {
      var result
      var t = new Date(dt)
      var dtplustwo =
        t.getFullYear() +
        '-' +
        (t.getMonth() + 1) +
        '-' +
        (t.getDate() + 2) +
        ' 00:00'
      dtplustwo = new Date(dtplustwo).getTime()
      // console.log(t);
      var today = new Date()
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate() +
        ' 00:00'

      var twodays =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        (today.getDate() + 2) +
        ' 00:00'
      var from = new Date(date).getTime() //today
      var twodaysafter = new Date(twodays).getTime() //twodaysfromtodaay
      if (dtplustwo >= from && dtplustwo <= twodaysafter) {
        result = true
      } else {
        result = false
      }

      return result
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
  created: function() {
    this.$store.dispatch('fetchVodMixedFolder', { self: this })
    this.$store.dispatch('fetchPodFolder', { self: this })
    // this.$store.dispatch("fetchVodMixedEps", { self: this });
    this.$store.dispatch('fetchFeatured', { self: this })
    this.$store.dispatch('fetchLatest', { self: this })
  },
  mounted() {
    this.deviceCheck()
    setTimeout(
      function() {
        this.initializepageview()
        this.PlayerInit('2')
      }.bind(this),
      200
    )
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
.channel_logo {
  width: 220px;
  height: auto;
  padding: 20px 0px 0;
}
.channel_logo img {
  width: 100%;
}
/* .items_title {
  padding-top: 10px;
  font-family: Sf-ui-medium;
  font-size: 16px;
  line-height: 1.19;
  letter-spacing: 0.32px;
  text-align: left;
  color: #cccccc;
} */
.item {
  cursor: pointer;
}
.item .item_img {
  width: 100%;
  /* border: 1px solid #fab900; */
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
}
.item .item_img img {
  /* width: 100%;
  border-radius: 4px;
  overflow: hidden; */
  background: 100%;
  width: 120%;
  height: auto;
  overflow: hidden;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
}
.channel_logo_bottom {
  width: 100px;
}
.channel_logo_bottom img {
  width: 100%;
}
.banner_mnn {
  cursor: pointer;
}
.np_bottom {
  font-size: 20px;
  color: #fab900;
  font-weight: 300;
}
.text_title {
  font-family: Sf-ui-medium;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1.25px;
  text-align: left;
  color: #fbcb43;
}
</style>
<style>
.carousel_title {
  font-family: Sf-ui-medium;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1px;
  text-align: left;
  color: #fab900;
}
.items_title {
  padding-top: 10px;
  font-family: Sf-ui-medium;
  font-size: 16px;
  line-height: 1.19;
  letter-spacing: 0.32px;
  text-align: left;
  color: #cccccc;
}
.item {
  cursor: pointer;
}
.text_title {
  font-family: Sf-ui-medium;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1.25px;
  text-align: left;
  color: #fbcb43;
}
.carousel_title {
  font-family: Sf-ui-medium;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1px;
  text-align: left;
  color: #fab900;
}
#homeradioCarousel .owl-theme {
  position: relative;
}
#homeradioCarousel .owl-theme .owl-nav {
  position: absolute;
  top: -41px;
  right: 30px;
  height: 100%;
  outline: none;
}
#homeradioCarousel .owl-theme .owl-nav [class*='owl-']:hover {
  text-shadow: 4px 4px 4px rgba(56, 56, 56, 0.9);
  outline: none;
}

#homeradioCarousel .owl-theme .owl-nav [class*='owl-'] {
  color: rgba(0, 0, 0, 0);
  font-size: 14px;
  margin: 5px 0;
  padding: 4px 7px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  outline: none;
}

#homeradioCarousel .owl-theme .owl-nav .owl-next {
  background: url('../assets/next.png') no-repeat center center;
  left: 0;
  position: absolute;
  top: -15px;
  height: 20px;
  width: 30px;
  text-decoration: none;
  outline: none;
}

#homeradioCarousel .owl-theme .owl-nav .owl-prev {
  background: url('../assets/prev.png') no-repeat center center;
  right: 0;
  height: 20px;
  width: 30px;
  position: absolute;
  top: -15px;
  text-decoration: none;
  outline: none;
}

/* vod */
#homevodCarousel .owl-theme {
  position: relative;
}
.main-content {
  position: relative;
}
.main-content .owl-theme .custom-nav {
  position: absolute;
  top: 0%;
  left: 0;
  right: 0;
  height: 101%;
  border-radius: none;
}
.main-content .owl-theme .custom-nav .owl-prev,
.main-content .owl-theme .custom-nav .owl-next {
  position: absolute;
  height: 100%;
  color: inherit;
  background: rgba(0, 0, 0, 0);
  border: none;
  z-index: 100;
  top: -15px;
  border-radius: none;
  width: 100px;
  outline: none;
}
/* .main-content .owl-theme .custom-nav .owl-prev:hover,
.main-content .owl-theme .custom-nav .owl-next:hover {
  background: rgba(56, 56, 56, 0.62);
} */
.main-content .owl-theme .custom-nav .owl-prev i,
.main-content .owl-theme .custom-nav .owl-next i {
  font-size: 5.5rem;
  color: #fab900;
  padding: 0 10px;
}
.main-content .owl-theme .custom-nav .owl-prev {
  left: 0;
}
.main-content .owl-theme .custom-nav .owl-next {
  right: 0;
}
.owl-theme .owl-nav [class*='owl-']:hover {
  background: unset;
}
.main-content
  .owl-theme
  .owl-stage-outer
  .owl-stage
  .owl-item:not(.center)
  > div {
  opacity: 0.25;
  z-index: 5;
}
.full_width {
  width: 100%;
}
@media only screen and (max-width: 480px) {
  .carousel_title {
    font-size: 20px;
  }
  .items_title {
    font-size: 14px;
  }
  .bg_text {
    font-size: 30px;
  }
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}
@media only screen and (max-width: 768px) {
  .main-content
    .owl-theme
    .owl-stage-outer
    .owl-stage
    .owl-item:not(.center)
    > div {
    opacity: 1;
    z-index: 5;
  }

  .main-content .owl-theme .custom-nav {
    display: none;
  }
}

@media only screen and (max-width: 1028px) {
  .main-content .owl-theme .custom-nav .owl-prev,
  .main-content .owl-theme .custom-nav .owl-next {
    position: absolute;
    height: 100%;
    color: inherit;
    background: rgba(0, 0, 0, 0);
    border: none;
    z-index: 100;
    top: -15px;
    border-radius: none;
    width: 60px;
    padding: 0 10px;
  }
  .main-content .owl-theme .custom-nav .owl-prev:hover,
  .main-content .owl-theme .custom-nav .owl-next:hover {
    background: rgba(0, 0, 0, 0);
  }
  .main-content .owl-theme .custom-nav .owl-nav [class*='owl-']:hover {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    text-decoration: none;
  }
  .main-content .owl-theme .custom-nav .owl-prev i,
  .main-content .owl-theme .custom-nav .owl-next i {
    font-size: 2.5rem;
    color: #fab900;
    padding: 0 5px;
  }
}

/* ----------- iPhone 4 and 4S ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Portrait */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8 ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* ----------- iPhone 6+, 7+ and 8+ ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Portrait */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Landscape */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* ----------- iPhone X ----------- */

/* Portrait and Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
  .fullwidth {
    width: 100%;
  }
  .full_width {
    width: 100%;
  }
}

.truncate {
  white-space: nowrap; /* IE6 needs any width */
  overflow: hidden; /* "overflow" value must be different from  visible"*/
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
}
</style>
