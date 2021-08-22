<template>
  <div class="container-fluid p-0 position-relative">
    <div class="w-100 masthead-content">
      <div class="owl-carousel owl-theme" id="vodmasthead">
        <div
          class="item"
          v-for="item_trending in trending"
          :key="item_trending.id"
        >
          <div class="item_img">
            <img
              v-bind:src="item_trending.img_link"
              @error="imageLoadError($event)"
            />
          </div>
          <div class="bg-overlay w-100 h-100">
            <div class="container-fluid pl-details">
              <div class="row h-100 align-items-end">
                <div class="col-8">
                  <div class="w-100 details-container d-flex flex-column">
                    <p
                      class="main-title mb-1 mb-md-2"
                      v-if="item_trending.data.title"
                    >
                      <!-- <Trunquee :text="item_trending.data.title" :speed="120" /> -->
                      {{ truncateString(item_trending.data.title, 30) }}
                    </p>
                    <p
                      class="desc mb-2 mb-md-4"
                      v-if="item_trending.data.description"
                    >
                      <span class="d-none d-md-block">{{
                        truncateString(item_trending.data.description, 120)
                      }}</span>
                      <span class="d-block d-md-none">{{
                        truncateString(item_trending.data.description, 80)
                      }}</span>
                    </p>
                    <div
                      class="custom-btn"
                      @click="goTo(checkLink(item_trending))"
                    >
                      <div
                        class="w-100 d-flex flex-row align-items-center justify-content-center"
                      >
                        <img
                          src="@/assets/icon/play-icon.svg"
                          class="btn-icon"
                        />
                        <span class="ml-2"> Play now</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-4 px-0">
                  <div
                    v-if="item_trending.data.content_type"
                    class="h-100 d-flex justify-content-end align-items-end"
                  >
                    <div class="category-section">
                      <p class="mb-0 category-text">
                        {{ item_trending.data.content_type[0].title['en_US'] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

export default {
  data: function() {
    return {
      trending: []
    }
  },
  created: function() {
    this.$store.dispatch('fetchTrending', { self: this })
  },
  methods: {
    filterTrending() {
      var vm = this
      vm.trending = this.$store.state.trending.data

      var store = []

      vm.trending.forEach(item => {
        if (
          item.idSchema == '205' ||
          item.idSchema == '206' ||
          item.idSchema == '207' ||
          item.idSchema == '208' ||
          item.idSchema == '209'
        ) {
          item['img_link'] = this.imgFilteringForMasthead(item, 600)
          store.push(item)
        }
      })

      vm.trending = store
      Vue.nextTick(
        function() {
          vm.installOwlCarouselForMasthead('#vodmasthead')
        }.bind(vm)
      )
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
    goTo(link) {
      this.$router.push(link)
    },
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
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

    installOwlCarouselForMasthead: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: false,
        nav: false,
        center: true,
        navText: [
          '<div class="border-nav"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
          '<div class="border-nav"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'
        ],
        navContainer: '.masthead-content .custom-nav',
        dots: false,
        margin: 0,
        responsiveClass: true,
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            this.loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            stagePadding: 0,
            margin: 0,
            loop: true,
            nav: true
          },
          768: {
            items: 1,
            stagePadding: 0,
            margin: 0,
            loop: true,
            nav: false
          },
          990: {
            items: 1,
            stagePadding: 180,
            margin: 0,
            loop: true,
            nav: true
          },
          1200: {
            items: 1,
            stagePadding: 250,
            margin: 0,
            loop: true,
            nav: true
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
  position: relative;
}
.item .item_img {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-top: 50.25%;
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(25, 25, 25, 0.12222) 5%,
    rgba(25, 25, 25, 0.911111) 22%
  );
  mask-image: linear-gradient(
    to top,
    rgba(25, 25, 25, 0.12222) 5%,
    rgba(25, 25, 25, 0.911111) 22%
  );
}
.item .item_img img {
  background: 100%;
  width: 100%;
  height: auto;
  overflow: hidden;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
}
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.74) 31.22%,
    rgba(0, 0, 0, 0.001) 93%
  );
}
.pl-details {
  padding: 2rem !important;
}
.details-container {
  max-width: 575px;
}

.main-title {
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  text-align: left;
  color: #ffffff;
}
.desc {
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
.custom-btn {
  background: #fab92b;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 14px;
  line-height: 16px;
  padding: 10px 20px;
  max-width: 150px;
}
.btn-icon {
  width: 15px !important;
}

.category-section {
  padding: 10px 21px;
  background: rgba(0, 0, 0, 0.6);
  border-left: 2px solid #f9b92b;
  margin: 60% 0 0 0;
}
.category-text {
  font-size: 19px;
  font-weight: bold;
  line-height: 1.21;
  text-align: left;
  color: #f9b91b;
}
@media only screen and (max-width: 992px) {
  .main-title {
    font-size: 18px;
  }
  .desc {
    font-size: 12px;
    line-height: 20px;
  }
  .custom-btn {
    max-width: 150px;
    font-size: 12px;
    padding: 8px 14px;
    height: 32px;
  }
  .btn-icon {
    width: 12px !important;
  }
  .category-section {
    padding: 6px 12px;
  }
  .category-text {
    font-size: 11px;
    line-height: 1.21;
  }
}
@media only screen and (max-width: 768px) {
  .item .item_img {
    width: 100%;
    padding-top: 55.25%;
  }
  .pl-details {
    padding: 22px !important;
  }
  .details-container {
    max-width: unset;
  }
}
@media only screen and (max-width: 480px) {
  .main-title {
    font-size: 16px;
  }
  .desc {
    line-height: 16px;
    font-size: 10px;
  }
  .custom-btn {
    max-width: 100px;
    font-size: 10px;
    padding: 4px 0;
    height: 24px;
  }
  .btn-icon {
    width: 10px !important;
  }
  .pl-details {
    padding: 16px !important;
  }
}
</style>
<style>
#vodmasthead .owl-item.active.center {
  border-left: 3px solid #fab92b;
}
.masthead-content
  > #vodmasthead
  .owl-stage-outer
  .owl-stage
  .owl-item:not(.center)
  > div {
  transform: scale(0.95);
}
</style>
