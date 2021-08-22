<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader
              :mainTitle="'PODCAST'"
              :currentPage="'PODCAST'"
            />
          </div>
        </div>
      </div>
    </div>
    <PodcastMasthead />
    <!-- ads top -->
    <billboardBannerTop v-if="desktop"></billboardBannerTop>
    <mrecBannerTop v-if="mobile"></mrecBannerTop>

    <div class="container-fluid">
      <!-- Culture -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].culture"
        :datasource="'podcast'"
        :rails="podcast_each[0].culture"
        :cat="'culture'"
        :title="'Culture'"
      ></RailLandscape>
      <!-- Drama -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].drama"
        :datasource="'podcast'"
        :rails="podcast_each[0].drama"
        :cat="'drama'"
        :title="'Drama'"
      ></RailLandscape>

      <!-- ads Middle -->
      <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
      <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>

      <!-- Entertainment -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].entertainment"
        :datasource="'podcast'"
        :rails="podcast_each[0].entertainment"
        :cat="'entertainment'"
        :title="'Entertainment'"
      ></RailLandscape>

      <!-- Infotainment -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].infotainment"
        :datasource="'podcast'"
        :rails="podcast_each[0].infotainment"
        :cat="'infotainment'"
        :title="'Infotainment'"
      ></RailLandscape>
      <!-- Religious -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].religious"
        :datasource="'podcast'"
        :rails="podcast_each[0].religious"
        :cat="'religious'"
        :title="'Religious'"
      ></RailLandscape>
      <!-- Special -->
      <RailLandscape
        v-if="podcast_each[0] && podcast_each[0].special"
        :datasource="'podcast'"
        :rails="podcast_each[0].special"
        :cat="'special'"
        :title="'Special'"
      ></RailLandscape>

      <!-- ads bottom -->
      <billboardbannerbottom v-if="desktop"></billboardbannerbottom>
      <mrecbannerbottom v-if="mobile"></mrecbannerbottom>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import Vue from 'vue'
import noimage from '../assets/podcast-no-image.png'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
// ads
import billboardBannerTop from '../components/ads/billboardBannerTop'
import mrecBannerTop from '../components/ads/mrecBannerTop'
import billboardBannerMiddle from '../components/ads/billboardBannerMiddle'
import mrecBannerMiddle from '../components/ads/mrecBannerMiddle'
import BillboardBannerBottom from '../components/ads/billboardBannerBottom'
import MrecBannerBottom from '../components/ads/mrecBannerBottom'
import PodcastMasthead from '../components/carousel/podcastMasthead.vue'

export default {
  data: function() {
    return {
      podcast: [],
      podcast_each: [],
      noimage: noimage,
      mnnlink: '/play?scheme=205&p_type=true&id=1387&eps_id=',
      categories: [
        'Culture',
        'Drama',
        'Entertainment',
        'Infotainment',
        'Religious',
        'Special'
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
    PodcastMasthead
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
      } else if (item.idSchema == '203') {
        //news
        idSchema = '209'
        // console.log(JSON.stringify(item, null, 2));
        link = '/podcastplayer?id=' + item.id
      } else if (idSchema == '204') {
        //pod episode
        link = '/podcastplayer?id=' + item.id
      }

      return link
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
    filterPodFolder() {
      var vm = this
      vm.podcast = this.$store.state.podcast.data

      var store = []
      var imgurl
      vm.podcast.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.podcast = store
      if (vm.podcast) {
        this.filterBasedOnCategory()
      }
    },
    goTo(link) {
      this.$router.push(link)
    },
    goToBanner(link) {
      this.$router.push(link)
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    filterBasedOnCategory() {
      var obj = this.podcast
      var categories = this.categories
      var each = {}
      // this.podcast_each;
      obj.forEach(items => {
        var content_type = items.data.category

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
      this.podcast_each.push(each)
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
    }
  },
  created: function() {
    this.$store.dispatch('fetchPodFolder', { self: this })
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
