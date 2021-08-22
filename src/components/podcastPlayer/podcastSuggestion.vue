<template>
  <div class="container-fluid px-2 px-md-3 position-relative section-padding">
    <div class="row align-items-center mb-2">
      <div class="col-7 text-left px-0">
        <div class="w-100">
          <span class="carousel_title">PODCAST Suggestion</span>
        </div>
      </div>
      <div class="col-5">
        <router-link :to="'/podcast/'">
          <div class="d-flex justify-content-end">
            <span class="carousel_more">View All</span>
          </div>
        </router-link>
      </div>
    </div>
    <div
      class="row mr-0 mr-lg-up latest-video-content"
      id="morePODCASTCarousel"
    >
      <div class="owl-carousel owl-theme" id="morepodcastcarousel">
        <div class="item" v-for="item_pod in podcast" :key="item_pod.id">
          <PodcastCard
            :image="item_pod.img_link"
            :latestTag="item_pod.shownewimage"
            :title="formatString(item_pod.longTitle)"
            :description="item_pod.data.description"
            :link="item_pod.redirect_url"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import PodcastCard from '../cards/podcastCard.vue'
export default {
  data: function() {
    return {
      podcast: []
    }
  },
  components: { PodcastCard },
  created: function() {
    this.$store.dispatch('fetchPodFolder', { self: this })
  },
  methods: {
    filterPodFolder() {
      //for latest video
      var vm = this
      vm.podcast = this.$store.state.podcast.data
      var store = []
      vm.podcast.forEach(item => {
        var timecompare = this.formatTimestamp(item.dateAvailability)
        var redirectLink = this.checkLink(item)
        item['img_link'] = this.imgFiltering(item)
        item['shownewimage'] = timecompare
        item['redirect_url'] = redirectLink
        store.push(item)
      })

      vm.podcast = store.slice(0, 8)

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#morepodcastcarousel')
        }.bind(vm)
      )
    },

    installOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
          '<span class="fa fa-chevron-left fa-lg"></span>',
          '<span class="fa fa-chevron-right fa-lg"></span>'
        ],
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            this.loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            nav: true,
            margin: 16,
            stagePadding: 60
          },
          480: {
            items: 1,
            nav: true,
            margin: 12,
            stagePadding: 60
          },
          600: {
            items: 3,
            nav: true,
            margin: 12,
            stagePadding: 20
          },
          768: {
            items: 3,
            stagePadding: 0,
            loop: true,
            margin: 14
          },
          992: {
            items: 5,
            stagePadding: 0,
            loop: true,
            margin: 12
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
          'https://rtb-images.glueapi.io/320x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/320x0/' + item.data.images.title.path
        } else {
          if (checkImgFeature) {
            imgurl =
              'https://rtb-images.glueapi.io/320x0/' +
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

    formatString(str) {
      var lower = str.toLowerCase()
      return lower
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  }
}
</script>

<style scoped>
.carousel_title {
  font-size: 22px;
  font-weight: bold;
  line-height: 22px;
  text-align: left;
  color: #fab900;
}
.carousel_more {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.19;
  text-align: left;
  color: #f9b91b;
}
.section-padding {
  margin: 20px 8px 8px;
  height: auto !important;
}
</style>

<style>
.latest-video-content .owl-theme .owl-stage-outer {
  overflow: hidden;
}

@media only screen and (min-width: 992px) {
  .latest-video-content .owl-theme .owl-stage-outer:hover {
    overflow: unset;
    max-height: 160px !important;
  }
}

#morePODCASTCarousel .owl-prev,
#morePODCASTCarousel .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#morePODCASTCarousel .owl-prev,
#morePODCASTCarousel .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#morePODCASTCarousel .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#morePODCASTCarousel .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#morePODCASTCarousel .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}

@media only screen and (max-width: 992px) {
  #morePODCASTCarousel .owl-prev,
  #morePODCASTCarousel .owl-next {
    top: 50px !important;
  }

  #morePODCASTCarousel .owl-prev,
  #morePODCASTCarousel .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #morePODCASTCarousel .owl-prev,
  #morePODCASTCarousel .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #morePODCASTCarousel .owl-prev,
  #morePODCASTCarousel .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #morePODCASTCarousel .owl-prev,
  #morePODCASTCarousel .owl-next {
    top: 25% !important;
  }
}
</style>
