<template>
  <div
    class="w-100 p-3 main-bg d-flex justify-content-center carousel-main-height-wrapper"
  >
    <div
      class="container-fluid px-2 px-md-3 position-relative section-padding"
      :style="[hover && { 'z-index': '1111111 !important' }]"
    >
      <div class="row align-items-center mb-4">
        <div class="col-6 text-left px-0">
          <div class="w-100">
            <span class="carousel_title">{{ headerTitle }}</span>
          </div>
        </div>
        <div class="col-6">
          <router-link :to="'/vod/'">
            <div class="d-flex justify-content-end">
              <span class="carousel_more">View All</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row mr-0 mr-lg-up sponsor-video-content" id="sponsorRails">
        <div class="owl-carousel owl-theme" id="sponsorrails">
          <div
            class="item"
            v-for="item_vod in vod"
            :key="item_vod.id"
            @mouseover="mouseOver"
            @mouseout="mouseOver"
          >
            <vod-card
              :image="imgFiltering(item_vod)"
              :latestTag="formatTimestamp(item_vod.dateAvailability)"
              :title="formatString(item_vod.longTitle)"
              :description="item_vod.data.description"
              :link="checkLink(item_vod)"
              :category="item_vod.data.content_type[0].title.en_US"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import vodCard from '../cards/vodCard.vue'
export default {
  data: function() {
    return {
      vod: [],
      headerTitle: '',
      id: 3546,
      hover: false
    }
  },
  components: { vodCard },
  methods: {
    mouseOver: function() {
      this.hover = !this.hover
    },
    filterVodMixedFolder() {
      //for latest video
      var vm = this
      vm.vod = this.$store.state.vodmixednews.data
      var store = []
      vm.vod.forEach(item => {
        var timecompare = this.formatTimestamp(item.dateAvailability)
        var redirectLink = this.checkLink(item)
        item['img_link'] = this.imgFiltering(item)
        item['shownewimage'] = timecompare
        item['redirect_url'] = redirectLink
        store.push(item)
      })

      vm.vod = store.slice(0, 8)

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#sponsorrails')
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
            margin: 0,
            stagePadding: 0
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
    },

    constructList(obj) {
      var vm = this
      obj.splice(0, 8)
      obj.forEach((items, index) => {
        if (index < 8) {
          axios
            .get(
              `https://cdn-rtb.glueapi.io/v1/content/${items.id}?format=json`
            )
            .then(response => {
              vm.vod.push(response.data.data)
            })
        }
      })

      setTimeout(
        function() {
          Vue.nextTick(
            function() {
              vm.installOwlCarousel('#sponsorrails')
            }.bind(vm)
          )
        }.bind(this),
        400
      )
    },

    getSponsorRails() {
      var vm = this
      var rails_id = vm.id

      try {
        axios
          .get(`https://cdn-rtb.glueapi.io/v1/content/${rails_id}?format=json`)
          .then(response => {
            vm.headerTitle = response.data.data.data.title
            vm.constructList(response.data.data.data['program-episode'])
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
  beforeMount() {
    this.getSponsorRails()
  }
}
</script>

<style scoped>
.carousel-main-height-wrapper {
  height: 280px;
}
.main-bg {
  background: radial-gradient(
      circle,
      rgba(157, 157, 157, 0) 0%,
      rgba(0, 0, 0, 0.700717787114846) 54%
    ),
    url('../../assets/sponsor-bg-dummy.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
}
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
.sponsor-video-content .owl-theme .owl-stage-outer {
  overflow: hidden;
}

@media only screen and (min-width: 992px) {
  .sponsor-video-content .owl-theme .owl-stage-outer:hover {
    overflow: unset;
    max-height: 160px !important;
  }
}

#sponsorRails .owl-prev,
#sponsorRails .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#sponsorRails .owl-prev,
#sponsorRails .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#sponsorRails .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#sponsorRails .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#sponsorRails .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}

@media only screen and (max-width: 992px) {
  #sponsorRails .owl-prev,
  #sponsorRails .owl-next {
    top: 50px !important;
  }

  #sponsorRails .owl-prev,
  #sponsorRails .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #sponsorRails .owl-prev,
  #sponsorRails .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #sponsorRails .owl-prev,
  #sponsorRails .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #sponsorRails .owl-prev,
  #sponsorRails .owl-next {
    top: 25% !important;
  }
}
</style>
