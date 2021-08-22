<template>
  <div class="container-fluid px-2 px-md-3 position-relative section-padding">
    <div class="row align-items-center mb-2">
      <div class="col-6 text-left px-0">
        <div class="w-100">
          <span class="carousel_landscape_title">{{
            title.toUpperCase()
          }}</span>
        </div>
      </div>
      <div class="col-6">
        <div
          class="d-flex justify-content-end cursor-pointer"
          v-if="showMore"
          @click="viewMore()"
        >
          <span class="carousel_more">View All</span>
        </div>
      </div>
    </div>
    <div
      class="row mr-0 mr-lg-up latest-video-content"
      id="landscapePodcastCarousel"
    >
      <div class="owl-carousel owl-theme" :id="titleCarousel">
        <div
          class="item"
          v-for="item_vod in rails"
          :key="titleCarousel + ' - ' + item_vod.id"
        >
          <PodcastCard
            :image="item_vod.img_link"
            :title="formatString(item_vod.longTitle)"
            :description="item_vod.data.description"
            :link="checkLink(item_vod)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import noimage from '../../assets/podcast-no-image.png'
import PodcastCard from '../cards/podcastCard.vue'
export default {
  name: 'rails-landscape',
  props: ['rails', 'title', 'datasource', 'cat'],
  data: function() {
    return {
      items: this.rails,
      titleCarousel: this.title.replace(/\s/g, '').toLowerCase(),
      noimage: noimage,
      showMore: false,
      contenttype: this.datasource
    }
  },
  components: { PodcastCard },
  methods: {
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
        600
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
            margin: 10,
            stagePadding: 40
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
      2000
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
  margin: 24px 8px 8px;
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
  }
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

#landscapePodcastCarousel .owl-prev,
#landscapePodcastCarousel .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#landscapePodcastCarousel .owl-prev,
#landscapePodcastCarousel .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#landscapePodcastCarousel .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#landscapePodcastCarousel .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#landscapePodcastCarousel .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}

@media only screen and (max-width: 992px) {
  #landscapePodcastCarousel .owl-prev,
  #landscapePodcastCarousel .owl-next {
    top: 50px !important;
  }

  #landscapePodcastCarousel .owl-prev,
  #landscapePodcastCarousel .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #landscapePodcastCarousel .owl-prev,
  #landscapePodcastCarousel .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #landscapePodcastCarousel .owl-prev,
  #landscapePodcastCarousel .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #landscapePodcastCarousel .owl-prev,
  #landscapePodcastCarousel .owl-next {
    top: 25% !important;
  }
}
</style>
