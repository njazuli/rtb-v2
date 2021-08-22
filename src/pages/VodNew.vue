<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader :mainTitle="'VOD'" :currentPage="'VOD'" />
          </div>
        </div>
      </div>
    </div>
    <VodMasthead />

    <!-- ads -->
    <div class="row">
      <div class="col-12">
        <billboardBannerTop v-if="desktop"></billboardBannerTop>
        <mrecBannerTop v-if="mobile"></mrecBannerTop>
      </div>
    </div>

    <CategoryCarousel :obj="categories" />

    <!-- ads top -->
    <!-- <billboardBannerTop v-if="desktop"></billboardBannerTop>
    <mrecBannerTop v-if="mobile"></mrecBannerTop> -->

    <!-- trending -->
    <!-- <div class="container-fluid">
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
              @click="goTo(checkLink(item))"
            >
              <div class="item_img">
                <img
                  v-bind:src="item.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">
                <Trunquee :text="item.title" />
              </p>
            </div>
          </div>
        </div>
      </div> -->

    <!-- ads -->
    <!-- <div
        class="row my-2 pb-3 d-none d-md-flex justify-content-center align-items-center flex-column"
      >
        <div class="col-12 col-lg-10 col-xl-9">
          <img src="../assets/banner/kajian_pembelajaran_d.png" class="img-fluid" />
        </div>
      </div>-->
    <!-- ads mobile-->
    <!-- <div
        class="row my-2 pb-3 d-flex d-md-none justify-content-center align-items-center flex-column"
      >
        <div class="col-12">
          <img src="../assets/banner/kajian_pembelajaran_m.png" class="img-fluid" />
        </div>
      </div>-->

    <!-- Special Rails -->
    <!-- <div class=" px-3">
      <div class="row pt-3 pb-2" style="background:#292929;" v-if="showvod_mnn">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">{{ SpecialRailsTitle }}</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="vodcarousel">
            <div
              class="item"
              v-for="item_vod in vod_mnn"
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
      </div> -->

    <!-- ads mid -->

    <!-- Education -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].education"
      :datasource="'vod'"
      :rails="vod_each[0].education"
      :cat="'education'"
      :title="'Education'"
    ></VodRailLandscape>
    <!-- Children -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].children"
      :datasource="'vod'"
      :rails="vod_each[0].children"
      :cat="'children'"
      :title="'Children'"
    ></VodRailLandscape>
    <!-- Documentary -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].documentary"
      :datasource="'vod'"
      :rails="vod_each[0].documentary"
      :cat="'documentary'"
      :title="'Documentary'"
    ></VodRailLandscape>
    <!-- Drama -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].drama"
      :datasource="'vod'"
      :rails="vod_each[0].drama"
      :cat="'drama'"
      :title="'Drama'"
    ></VodRailLandscape>

    <!-- ads -->
    <div class="row">
      <div class="col-12">
        <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
        <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>
      </div>
    </div>

    <!-- Entertainment -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].entertainment"
      :datasource="'vod'"
      :rails="vod_each[0].entertainment"
      :cat="'entertainment'"
      :title="'Entertainment'"
    ></VodRailLandscape>
    <!-- Exclusives -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].exclusives"
      :datasource="'vod'"
      :rails="vod_each[0].exclusives"
      :cat="'exclusives'"
      :title="'Exclusives'"
    ></VodRailLandscape>

    <!-- Magazine -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].magazine"
      :datasource="'vod'"
      :rails="vod_each[0].magazine"
      :cat="'magazine'"
      :title="'Magazine'"
    ></VodRailLandscape>
    <!-- Variety -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].variety"
      :datasource="'vod'"
      :rails="vod_each[0].variety"
      :cat="'variety'"
      :title="'Variety'"
    ></VodRailLandscape>
    <!-- Religious -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].religious"
      :datasource="'vod'"
      :rails="vod_each[0].religious"
      :cat="'religious'"
      :title="'Religious'"
    ></VodRailLandscape>
    <!-- Special -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].special"
      :datasource="'vod'"
      :rails="vod_each[0].special"
      :cat="'special'"
      :title="'Special'"
    ></VodRailLandscape>
    <!-- Sports -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].sports"
      :datasource="'vod'"
      :rails="vod_each[0].sports"
      :cat="'sports'"
      :title="'Sports'"
    ></VodRailLandscape>
    <!-- Lifestyle -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].lifestyle"
      :datasource="'vod'"
      :rails="vod_each[0].lifestyle"
      :cat="'lifestyle'"
      :title="'Lifestyle'"
    ></VodRailLandscape>
    <!-- nostalgic -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].nostalgia"
      :datasource="'vod'"
      :rails="vod_each[0].nostalgia"
      :cat="'nostalgia'"
      :title="'Nostalgia'"
    ></VodRailLandscape>
    <!-- catchup -->
    <VodRailLandscape
      v-if="vod_each[0] && vod_each[0].catchup"
      :datasource="'vod'"
      :rails="vod_each[0].catchup"
      :cat="'catchup'"
      :title="'Catch Up'"
    ></VodRailLandscape>

    <!-- ads bottom -->
    <billboardbannerbottom v-if="desktop"></billboardbannerbottom>
    <mrecbannerbottom v-if="mobile"></mrecbannerbottom>

    <!-- news -->
    <!-- <VodRailLandscape
        v-if="news"
        :datasource="'news'"
        :rails="news"
        :cat="'news'"
        :title="'News'"
      ></VodRailLandscape>-->
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import Vue from 'vue'
import noimage from '../assets/noimage.png'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
// ads
import billboardBannerTop from '../components/ads/billboardBannerTop'
import mrecBannerTop from '../components/ads/mrecBannerTop'
import billboardBannerMiddle from '../components/ads/billboardBannerMiddle'
import mrecBannerMiddle from '../components/ads/mrecBannerMiddle'
import BillboardBannerBottom from '../components/ads/billboardBannerBottom'
import MrecBannerBottom from '../components/ads/mrecBannerBottom'
import VodMasthead from '../components/carousel/vodMasthead.vue'
import CategoryCarousel from '../components/categoryCarousel.vue'
export default {
  data: function() {
    return {
      vod: [],
      vod_mnn: [],
      vod_each: [],
      news: [],
      specials: [],
      trending: [],
      vod_episodes: [],
      noimage: noimage,
      mnnlink: '/play?scheme=205&p_type=true&id=1387&eps_id=',
      SpecialRailsId: '1387',
      SpecialRailsTitle: 'COVID-19: MOH Press Conference',
      showvod_mnn: true,
      categories: [
        'Education',
        'Children',
        'Documentary',
        'Drama',
        'Entertainment',
        'Exclusives',
        'Magazine',
        'Variety',
        'Religious',
        'Special',
        'Sports',
        'Lifestyle',
        'Nostalgia',
        'Catch Up'
      ],
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  components: {
    billboardBannerTop: billboardBannerTop,
    mrecBannerTop: mrecBannerTop,
    billboardBannerMiddle: billboardBannerMiddle,
    mrecBannerMiddle: mrecBannerMiddle,
    billboardbannerbottom: BillboardBannerBottom,
    mrecbannerbottom: MrecBannerBottom,
    BreadCrumbsHeader,
    VodMasthead,
    CategoryCarousel
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
            items: 2,
            stagePadding: 0,
            loop: false
          },
          991: {
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
            items: 2,
            nav: true,
            stagePadding: 0
          },
          991: {
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

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/500x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/500x0/' + item.data.images.title.path
        } else {
          imgurl =
            'https://cdn-rtb.glueapi.io/v1/content/' +
            item.id +
            '/image/300x0/images.title'
        }
      }

      return imgurl
    },
    filterNews() {
      var vm = this
      vm.news = this.$store.state.news_eps.data

      var store = []
      var imgurl
      vm.news.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.news = store
    },
    filterVodMixedFolder() {
      var vm = this
      vm.vod = this.$store.state.vodmixednews.data

      var store = []
      var itemsForMNN = []
      var imgurl
      vm.vod.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.vod = store

      // this.generateMNNCarousel(itemsForMNN);

      if (vm.vod) {
        this.filterBasedOnCategory()
      }
    },
    filterVodEpisode() {
      var store = []
      var itemsForMNN = []
      this.vod_episodes = this.$store.state.vodepisode.data
      //   this.vod_episodes.forEach(items => {
      //     if (items.data.program.id == this.SpecialRailsId) {
      //       itemsForMNN.push(items)
      //     }

      //     // if (items.data.program.id == "1332") {
      //     //   console.log(JSON.stringify(items, null, 2));
      //     // }
      //   })
      //   this.vod_mnn = itemsForMNN

      //   if (itemsForMNN.length > 0) {
      //     this.generateMNNCarousel(this.vod_mnn)
      //     this.showvod_mnn = true
      //   } else {
      //     this.showvod_mnn = false
      //   }
      // },
      // generateMNNCarousel(obj) {
      //   var vm = this
      //   var store = []
      //   vm.vod_mnn.forEach(item => {
      //     item['img_link'] = this.imgFiltering(item)
      //     store.push(item)
      //   })
      //   vm.vod_mnn = store
      //   Vue.nextTick(
      //     function() {
      //       vm.installOwlCarousel('#vodcarousel')
      //     }.bind(vm)
      //   )
      // },
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
        if (
          item.idSchema == '205' ||
          item.idSchema == '206' ||
          item.idSchema == '207' ||
          item.idSchema == '208' ||
          item.idSchema == '209'
        ) {
          store.push(item)
        }
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
    goToBanner(link) {
      this.$router.push(link)
    },
    checkLink(item) {
      var idSchema, check
      var id = item.id
      var title = item.data.title

      var link

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
      }

      return link
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    filterBasedOnCategory() {
      var obj = this.vod
      var categories = this.categories
      var each = {}
      // this.vod_each;
      obj.forEach(items => {
        var content_type = items.data.content_type

        if (content_type.length != 0) {
          content_type.forEach(items_cat => {
            for (var i = 0; i < categories.length; i++) {
              if (
                items_cat.title.en_US === categories[i] ||
                items_cat.title.en_US ===
                  this.convertStringToLower(categories[i]) ||
                items_cat.title.en_US ===
                  this.convertStringToLower(categories[i].replace(/\s/g, ''))
              ) {
                // console.log(this.convertStringToLower(categories[i].replace(/\s/g, "")));
                if (
                  each[
                    this.convertStringToLower(categories[i].replace(/\s/g, ''))
                  ]
                ) {
                  each[
                    this.convertStringToLower(categories[i].replace(/\s/g, ''))
                  ].push(items)
                } else {
                  each[
                    this.convertStringToLower(categories[i].replace(/\s/g, ''))
                  ] = [items]
                }
              }
            }
          })
        }
      })
      this.vod_each.push(each)
    },
    convertStringToLower(items) {
      var strings
      strings = items.toLowerCase()
      return strings
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
          // console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg)
        }
      })
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
    this.$store.dispatch('fetchNews', { self: this })
    this.$store.dispatch('fetchSpecials', { self: this })
    this.$store.dispatch('fetchTrending', { self: this })
    this.$store.dispatch('fetchVodEpisodes', { self: this })
  },
  mounted() {
    this.deviceCheck()
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
.pt-livetv {
  padding: 90px 0 0;
}
.breadCrumbsWrapper {
  padding: 30px;
}

@media only screen and (max-width: 768px) {
  .pt-livetv {
    padding: 8px 0 0;
  }
  .breadCrumbsWrapper {
    padding: 16px;
  }
}
</style>
