<template>
  <div class="mb_controller">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="channel_logo">
            <span class="bg_text">VOD</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- trending -->
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">TRENDING</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="trendingcarousel">
            <div
              class="item"
              v-for="item in trending"
              :key="item.id"
              @click="goTo('/vodplayer?id=' + item.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- vod -->
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">TV PROGRAMS</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="vodcarousel">
            <div
              class="item"
              v-for="item_vod in vod"
              :key="item_vod.id"
              @click="goTo('/vodplayer?id=' + item_vod.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_vod.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">{{ item_vod.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- news -->
      <!-- <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">NEWS</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="newsCarousel">
            <div
              class="item"
              v-for="item_news in news"
              :key="item_news.id"
              @click="goTo('/newsplayer/'+item_news.id)"
            >
              <div class="item_img">
                <img v-bind:src="noimage" />
              </div>
              <p class="items_title pl-1">{{item_news.title}}</p>
            </div>
          </div>
        </div>
      </div>-->

      <!-- specials -->
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">SPECIALS</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="specialsCarousel">
            <div
              class="item"
              v-for="item_specials in specials"
              :key="item_specials.id"
              @click="goTo('/special/' + item_specials.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_specials.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">{{ item_specials.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import Vue from 'vue'
import noimage from '../assets/noimage.png'
export default {
  data: function() {
    return {
      vod: [],
      news: [],
      specials: [],
      trending: [],
      noimage: noimage
    }
  },
  methods: {
    imageLoadError(event) {
      event.target.src = noimage
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
    installTrendingOwlCarousel: function(carousel) {
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
            items: 1,
            nav: true,
            stagePadding: 0
          },
          768: {
            items: 3,
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
    filterNews() {
      var vm = this
      vm.news = this.$store.state.news_eps.data
      // Vue.nextTick(
      //   function() {
      //     vm.installOwlCarousel("#newsCarousel");
      //   }.bind(vm)
      // );
    },
    filterVodFolder() {
      var vm = this
      vm.vod = this.$store.state.vod.data

      var store = []
      var imgurl
      vm.vod.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.vod = store
      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#vodcarousel')
        }.bind(vm)
      )
    },
    filterSpecials() {
      var vm = this
      vm.specials = this.$store.state.special.data
      var store = []
      var imgurl
      vm.specials.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.specials = store
      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#specialsCarousel')
        }.bind(vm)
      )
    },
    filterTrending() {
      var vm = this
      vm.trending = this.$store.state.trending.data

      var store = []
      var imgurl
      vm.trending.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.trending = store

      Vue.nextTick(
        function() {
          vm.installTrendingOwlCarousel('#trendingcarousel')
        }.bind(vm)
      )
    },
    goTo(link) {
      this.$router.push(link)
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    initializepageview() {
      var self = this
      // console.log(this.$route.path);
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/page-view',
        contentType: 'application/json',
        data: JSON.stringify({
          href: this.$route.path,
          title: 'vod',
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
    }
  },
  created: function() {
    this.$store.dispatch('fetchVodFolder', { self: this })
    this.$store.dispatch('fetchNews', { self: this })
    this.$store.dispatch('fetchSpecials', { self: this })
    this.$store.dispatch('fetchTrending', { self: this })
  },
  mounted() {
    if (!this.$route.params.id) {
      setTimeout(
        function() {
          this.initializepageview()
        }.bind(this),
        700
      )
    }
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
.p {
  padding: 0;
  margin: 0;
}
/* .bg_header {
  background: url("../assets/coming-soon-banner.png");
  background-size: cover;
} */
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
.channel_logo {
  padding: 20px 0px;
}
h4 {
  color: #fab900;
  font-family: Sf-ui-medium;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  text-align: center;
}
.title_header {
  font-family: Sf-ui-medium;
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 0.6px;
  text-align: left;
  color: #fab900;
}
.title_eps {
  width: 100%;
  font-family: Sf-ui-medium;
  font-size: 16px;
  line-height: 1.19;
  letter-spacing: 0.32px;
  text-align: left;
  color: #fab900;
  padding: 0;
  margin: 0 0 3px;
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
.c-p {
  cursor: pointer;
}
.vod_icon {
  width: 44px;
  height: 44px;
  background: #fab900;
  border-radius: 50%;
  display: flex;
  align-items: center;
}
.vod_icon_eps {
  width: 70px;
  height: 70px;
  background: #fab900;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  background: #292929;
}
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
@media screen and (max-width: 991px) {
  .remove_m_p {
    padding: 0;
    margin: 0;
  }
}
@media screen and (max-width: 768px) {
  .vod_icon {
    width: 25px;
    height: 25px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
  }

  .vod_icon svg {
    width: 15px;
    height: 15px;
  }
  .vod_icon_eps {
    width: 40px;
    height: 40px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vod_icon_eps svg {
    width: 30px;
    height: 30px;
  }
  .title_header {
    font-size: 20px;
  }
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
