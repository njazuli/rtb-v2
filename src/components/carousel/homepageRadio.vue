<template>
  <div class="container-fluid px-2 px-md-3 position-relative section-padding">
    <div class="row align-items-center mb-2">
      <div class="col-12 text-left px-0">
        <div class="w-100">
          <span class="carousel_title">Radio</span>
        </div>
      </div>
    </div>
    <div
      class="row mr-0 mr-lg-up latest-video-content"
      id="latestRadioCarousel"
    >
      <div class="owl-carousel owl-theme" id="latestradiocarousel">
        <div class="item" v-for="item_radio in radio" :key="item_radio.id">
          <radioCard :image="item_radio.img_link" :id="item_radio.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import radioCard from '../cards/radioCard.vue'
export default {
  data: function() {
    return {
      radio: []
    }
  },
  components: { radioCard },
  created: function() {
    this.$store.dispatch('fetchRadio', { self: this })
  },
  methods: {
    filterRadio() {
      //for latest video
      var vm = this
      vm.radio = this.$store.state.radio.data
      var store = []
      vm.radio.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.radio = store.slice(0, 8)

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#latestradiocarousel')
        }.bind(vm)
      )
    },

    installOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: false,
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
            loop: false,
            margin: 14
          },
          992: {
            items: 5,
            stagePadding: 0,
            loop: false,
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
  margin: 20px 8px 28px;
  height: auto !important;
}
</style>

<style>
.latest-video-content .owl-theme .owl-stage-outer {
  overflow: hidden;
}

#latestRadioCarousel .owl-prev,
#latestRadioCarousel .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#latestRadioCarousel .owl-prev,
#latestRadioCarousel .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#latestRadioCarousel .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#latestRadioCarousel .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#latestRadioCarousel .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}
@media only screen and (max-width: 992px) {
  #latestRadioCarousel .owl-prev,
  #latestRadioCarousel .owl-next {
    top: 50px !important;
  }

  #latestRadioCarousel .owl-prev,
  #latestRadioCarousel .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #latestRadioCarousel .owl-prev,
  #latestRadioCarousel .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #latestRadioCarousel .owl-prev,
  #latestRadioCarousel .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #latestRadioCarousel .owl-prev,
  #latestRadioCarousel .owl-next {
    top: 25% !important;
  }
}
</style>
