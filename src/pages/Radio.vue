<template>
  <div class="mb_controller">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="channel_logo">
            <span class="bg_text">RADIO</span>
          </div>
        </div>
      </div>
    </div>
    <!-- v-for="items in filteredItems" :key="items.id" -->
    <div class="container-fluid" v-for="item in filteredItems" :key="item.id">
      <div class="row my-sm-3 mx-sm-4" style="margin:0 auto;">
        <div class="col-12 col-md-12 rem_mp">
          <div
            class="row d-flex justify-content-center align-items-center pb-2 rem_mp"
          >
            <div class="col-md-7 col-12 rem_mp">
              <div class="embed-responsive embed-responsive-16by9">
                <!-- <iframe :src="item.embed_link" class="embed-responsive-item" allowfullscreen></iframe> -->
                <div
                  id="vidBox"
                  class="player embed-responsive-item"
                  ref="vidBox"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center px-2 py-2 rem_mp"
          >
            <p
              class="text-white"
              style="white-space: pre-line"
              v-html="
                item.description.replace(/(?:\r\n|\r|\n|\n\n)/g, '<br />')
              "
            ></p>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center px-2 py-2 rem_mp"
          >
            <div class="col-12 d-flex justify-content-center">
              <!-- <AddThis v-if="childDataLoaded"
                publicId="ra-5d92d889385b2fe2" 
                :data-url = currenturl
                :data-title = eps_title 
                :data-description = item.description
              />-->
              <div class="sharebtn" @click="openModal()" v-if="childDataLoaded">
                <img src="../assets/sharebtn.png" />
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ads mid -->
      <!-- ads -->
      <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
      <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>

      <!-- radio -->
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE RADIO</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <!-- <div class="owl-carousel owl-theme" id="radiocarousel">
            <div
              class="item"
              v-for="item_radio in filterItem"
              :key="item_radio.id"
              @click="goTo('/radio/'+item_radio.id)"
            >
              <div class="item_img">
                <img v-bind:src="item_radio.image" />
              </div>
              <p class="items_title pl-1">{{item_radio.channel_title}}</p>
            </div>
          </div>-->
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
              style="margin: 0px 5px;border-radius: 3px;padding: 5px;"
              v-for="item in mastheads.response"
              :key="item.id"
              class="img-wrapper-masthead"
            >
              <router-link :to="{ path: '/radio/' + item.id }">
                <img style="width:100%;border-radius: 4px;" :src="item.image" />
              </router-link>
            </div>
          </carousel>
        </div>
      </div>
    </div>
    <social ref="social"></social>
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import Vue from 'vue'
import carousel from 'vue-owl-carousel'
import RadioService from '../static/json_dummy/radio.json'
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
      mastheads: RadioService,
      filterItem: RadioService.response,
      embed_url: '',
      eps_title: '',
      id_no: '',
      radio_img: '',
      currenturl: '',
      radio_details: '',
      childDataLoaded: false,
      share: [],
      url: '',
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  components: {
    carousel,
    social,
    billboardBannerTop: billboardBannerTop,
    mrecBannerTop: mrecBannerTop,
    billboardBannerMiddle: billboardBannerMiddle,
    mrecBannerMiddle: mrecBannerMiddle,
    billboardbannerbottom: BillboardBannerBottom,
    mrecbannerbottom: MrecBannerBottom
  },
  created: function() {
    // this.createCarousel(); //method1 will execute at pageload
    // this.$store.dispatch("fetchRadio", { self: this });
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
    openModal() {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: this.eps_title
      }
      // console.log("inpopupradio");
      bus.$emit('shareVar', this.share)
      this.$refs.social.show()
    },
    playRadio(value) {
      this.embed_url = value.embed_link
      this.radio_img = value.image
      this.radio_details = value.description
      this.PlayerInit(value.id)
      this.$router.push('/radio/' + value.id)
    },
    goTo(link) {
      this.$router.push(link)
    },
    installOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        nav: true,
        dots: false,
        margin: 10,
        responsiveClass: true,
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
    setInitialId() {
      this.$router.push('/radio/' + this.filterItem[0].id)
    },
    createCarousel() {
      var store = this.filterItem
      store.forEach(item => {
        var img_emb =
          'https://cdn-rtb.glueapi.io/v1/content/' +
          item.id +
          '/image/300x0/images.title?quality=100'
        var embed_link =
          'https://rtb-player.glueapi.io/latest/p/' + item.id + '?skin=title'
        item['img_url'] = img_emb
        item['embed_link'] = embed_link
      })
      var vm = this
      vm.filterItem = store

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#radiocarousel')
        }.bind(vm)
      )
    },
    initializecontentview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/viewed',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          idContent: this.id_no, // Content ID from content api response
          contentTitle: this.eps_title, // Content Longtitle from content api response
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          // console.log(data);
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
          title: 'radio',
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          // console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg)
        }
      })
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
        type: 'audio', // video or audio
        skin: 'title' // false or title (Tile Skin is used for creating player with title image
      })

      window.gluePlayer = gluePlayer

      this.currenturl = window.location.origin + '' + this.$route.path

      this.childDataLoaded = true
    }
  },
  computed: {
    filteredItems() {
      var items_onload = []
      this.filterItem.forEach(item => {
        if (item.id == this.$route.params.id) {
          this.eps_title = item.channel_title
          this.id_no = item.id_no
          items_onload.push(item)
        } else {
          if (item.id_no == this.$route.params.id) {
            this.$router.push('/radio/' + item.id)
          }
        }
      })

      setTimeout(
        function() {
          this.PlayerInit(items_onload[0].id_no)
          this.initializecontentview()
          this.initializepageview()
        }.bind(this),
        700
      )

      return items_onload
    },
    initPeer() {
      // Our fancy notification (2).
      // peer5
      // peer5.destroy();
      // peer5.init();
      // peer5.isInitialized();
    }
  },
  mounted() {
    this.deviceCheck()
    if (!this.$route.params.id) {
      setTimeout(
        function() {
          this.setInitialId()
          this.initializecontentview()
          this.initializepageview()
        }.bind(this),
        700
      )
    }
  },
  destroyed() {
    // peer5.destroy();
  }
}
</script>

<style scoped>
.bg {
  background: #292929;
  height: auto !important; /* cross-browser */
  height: 100%; /* cross-browser */
  /* margin-bottom: 120px; */
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
.radio_desc_div {
  background: white;
}
.channel_logo {
  width: 186px;
  height: auto;
  padding: 20px 0px;
}
.channel_logo_bottom img {
  width: 100%;
}
.item_img {
  width: 100%;
  /* border: 1px solid #fab900; */
  border-radius: 4px;
  overflow: hidden;
}
.item_img img {
  width: 100%;
  border-radius: 4px;
}
@media only screen and (max-width: 768px) {
  .bg {
    margin-bottom: 60px;
  }
  .rem_mp {
    padding: 0;
    margin: 0;
  }
}
a {
  cursor: pointer;
}
.img-wrapper-masthead {
  cursor: pointer;
}
</style>
<style>
#radioCarousel .owl-theme {
  position: relative;
}
#radioCarousel .owl-theme .owl-nav {
  position: absolute;
  top: -49px;
  right: 50px;
  height: 100%;
}
#radioCarousel .owl-theme .owl-nav [class*='owl-']:hover {
  text-shadow: 4px 4px 4px rgba(56, 56, 56, 0.9);
}

#radioCarousel .owl-theme .owl-nav [class*='owl-'] {
  color: rgba(0, 0, 0, 0);
  font-size: 14px;
  margin: 5px;
  padding: 4px 7px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
  border-radius: 3px;
}

#radioCarousel .owl-theme .owl-nav .owl-next {
  background: url('../assets/prev.png') no-repeat left center;
  right: -15px;
  position: absolute;
  top: -15px;
  height: 20px;
  width: 40px;
}

#radioCarousel .owl-theme .owl-nav .owl-prev {
  background: url('../assets/next.png') no-repeat left center;
  left: -15px;
  height: 20px;
  width: 54px;
  position: absolute;
  top: -15px;
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
}
</style>
