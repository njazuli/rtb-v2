<template>
  <div
    class="container-fluid px-4 position-relative section-padding"
    :style="[hover && { 'z-index': '1111111 !important' }]"
  >
    <div class="row align-items-center mb-2">
      <div class="col-8 text-left px-0">
        <div class="w-100">
          <span class="carousel_landscape_title">{{
            title.toUpperCase()
          }}</span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="d-flex justify-content-end"
          v-if="showMore"
          @click="viewMore()"
        >
          <span class="carousel_more cursor-pointer">View All</span>
        </div>
      </div>
    </div>
    <div class="row mr-0 latest-video-content" id="landscapeVODCarousel">
      <div class="owl-carousel owl-theme" :id="titleCarousel">
        <div
          class="item"
          v-for="item_vod in rails"
          :key="titleCarousel + ' - ' + item_vod.id"
          @mouseover="mouseOver"
          @mouseout="mouseOver"
        >
          <vod-card
            :image="item_vod.img_link"
            :title="formatString(item_vod.longTitle)"
            :description="item_vod.data.description"
            :link="checkLink(item_vod)"
            :category="item_vod.data.content_type[0].title.en_US"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import noimage from '../../assets/noimage.png'
import vodCard from '../cards/vodCard.vue'
export default {
  name: 'rails-landscape',
  props: ['rails', 'title', 'datasource', 'cat'],
  data: function() {
    return {
      items: this.rails,
      titleCarousel: this.title.replace(/\s/g, '').toLowerCase(),
      noimage: noimage,
      showMore: false,
      contenttype: this.datasource,
      hover: false
    }
  },
  components: { vodCard },
  methods: {
    mouseOver: function() {
      this.hover = !this.hover
    },
    formatString(str) {
      var lower = str.toLowerCase()
      return lower
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    viewMore() {
      var itemToPass = this.items
      var contenttype = this.contenttype

      this.$router.replace(
        '/viewall?cat=' + this.cat + '&contenttype=' + contenttype
      )
    },
    goTo(link) {
      this.$router.push(link)
    },
    checkLink(item) {
      var idSchema
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
    checkIndexForMore() {
      var listlength = this.items
      if (listlength.length > 5) {
        this.showMore = true
      }
    },
    initializeContentForStart() {
      var vm = this
      var target = document.getElementById(vm.titleCarousel)
      setTimeout(
        function() {
          if (vm.titleCarousel) {
            Vue.nextTick(
              function() {
                vm.installOwlCarousel(target)
              }.bind(vm)
            )
          }
        }.bind(this),
        1000
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
            loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            nav: false,
            margin: 0,
            stagePadding: 0
          },
          480: {
            items: 1,
            nav: false,
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
    }
  },
  mounted() {
    this.checkIndexForMore()
  },
  beforeMount() {
    setTimeout(
      function() {
        this.initializeContentForStart()
      }.bind(this),
      1000
    )
  }
}
</script>

<style scoped>
.carousel_landscape_title {
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
  margin: 24px 12px 8px;
  height: auto !important;
}

@media only screen and (max-width: 768px) {
  .carousel_landscape_title {
    font-size: 16px !important;
    line-height: 20px;
  }
  .carousel_more {
    font-size: 12px !important;
  }
  .section-padding {
    margin: 16px 8px;
    overflow: hidden;
  }
}
</style>

<style>
#landscapeVODCarousel .owl-theme .owl-stage-outer {
  overflow: hidden;
}

@media only screen and (min-width: 992px) {
  #landscapeVODCarousel .owl-theme .owl-stage-outer:hover {
    overflow: unset;
  }

  #landscapeVODCarousel .owl-theme {
    height: 200px;
  }
}

#landscapeVODCarousel .owl-prev,
#landscapeVODCarousel .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#landscapeVODCarousel .owl-prev,
#landscapeVODCarousel .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#landscapeVODCarousel .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#landscapeVODCarousel .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#landscapeVODCarousel .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}

@media only screen and (max-width: 992px) {
  #landscapeVODCarousel .owl-prev,
  #landscapeVODCarousel .owl-next {
    top: 50px !important;
  }

  #landscapeVODCarousel .owl-prev,
  #landscapeVODCarousel .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #landscapeVODCarousel .owl-prev,
  #landscapeVODCarousel .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #landscapeVODCarousel .owl-prev,
  #landscapeVODCarousel .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #landscapeVODCarousel .owl-prev,
  #landscapeVODCarousel .owl-next {
    top: 25% !important;
  }
}
</style>
