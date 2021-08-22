<template>
  <div class="mb_controller">
    <div class="bg p-0" style="width:100%;">
      <!-- <div class="col-md-12">
      <div class="row bg_header heightcontroller d-flex justify-content-center align-items-center">
        <div class="channel_logo">
          <span class="bg_text">COMING SOON</span>
        </div>
      </div>
      </div>-->
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="channel_logo">
            <span class="bg_text">PODCAST</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">NASIONAL</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="nasionalcarousel">
            <div
              class="item"
              v-for="item in nasionalarr[0]"
              :key="item.id"
              @click="goTo('/podcastplayer?id=' + item.id)"
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
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">PILIHAN</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="pilihancarousel">
            <div
              class="item"
              v-for="item in pilihanarr[0]"
              :key="item.id"
              @click="goTo('/podcastplayer?id=' + item.id)"
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
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">HARMONI</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="harmonicarousel">
            <div
              class="item"
              v-for="item in harmoniarr[0]"
              :key="item.id"
              @click="goTo('/podcastplayer?id=' + item.id)"
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
      <div class="row pt-3 pb-2" style="background:#292929;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">PELANGI</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="pelangicarousel">
            <div
              class="item"
              v-for="item in pelangiarr[0]"
              :key="item.id"
              @click="goTo('/podcastplayer?id=' + item.id)"
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
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">NUR ISLAM</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="nurislamcarousel">
            <div
              class="item"
              v-for="item in nurislamarr[0]"
              :key="item.id"
              @click="goTo('/podcastplayer?id=' + item.id)"
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
      noimage: noimage,
      radio: [],
      podcast: [],
      nasionalarr: [],
      harmoniarr: [],
      nurislamarr: [],
      pilihanarr: [],
      pelangiarr: []
    }
  },
  created: function() {
    this.$store.dispatch('fetchPodFolder', { self: this })
    this.$store.dispatch('fetchRadio', { self: this })
    // this.$store.dispatch("fetchPodEpisodes", { self: this });
  },
  methods: {
    imageLoadError(event) {
      event.target.src = noimage
    },
    goTo(link) {
      this.$router.push(link)
    },
    replaceByDefault(e) {
      e.target.src = noimage
    },
    filterPodFolder() {
      // this.podCast = this.$store.state.podcast.data;
      var vm = this
      vm.podcast = this.$store.state.podcast.data
      // Vue.nextTick(
      //   function() {
      //     vm.installOwlCarousel("#nasionalcarousel");
      //   }.bind(vm)
      // );
    },
    filterRadio() {
      // this.podCast = this.$store.state.podcast.data;
      this.radio = this.$store.state.radio.data
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
    filterItemsNasional() {
      var id = '4'
      var store = []
      // var imgurl = "";
      this.radio.forEach(item => {
        if (item.id == id) {
          // imgurl = "https://cdn-rtb.glueapi.io/v1/content/"+item.data.podcast[0].id+"/image/300x0/images.thumbnail";
          // item.data.podcast[0]['img_link'] = imgurl;
          var podcastArr = item.data.podcast

          podcastArr.forEach(item => {
            item['img_link'] = this.imgFiltering(item)
          })

          store.push(item.data.podcast)
        }
      })

      this.nasionalarr = store
      Vue.nextTick(
        function() {
          this.installOwlCarousel('#nasionalcarousel')
        }.bind(this)
      )
    },
    filterItemsHarmoni() {
      var id = '3'
      var store = []
      this.radio.forEach(item => {
        if (item.id == id) {
          var harmoniArr = item.data.podcast

          harmoniArr.forEach(item => {
            item['img_link'] = this.imgFiltering(item)
          })

          store.push(item.data.podcast)
        }
      })

      this.harmoniarr = store
      Vue.nextTick(
        function() {
          this.installOwlCarousel('#harmonicarousel')
        }.bind(this)
      )
    },
    filterItemsNurIslam() {
      var id = '5'
      var store = []
      this.radio.forEach(item => {
        if (item.id == id) {
          var Arr = item.data.podcast

          Arr.forEach(item => {
            item['img_link'] = this.imgFiltering(item)
          })

          store.push(item.data.podcast)
        }
      })

      this.nurislamarr = store
      Vue.nextTick(
        function() {
          this.installOwlCarousel('#nurislamcarousel')
        }.bind(this)
      )
    },
    filterItemsPelangi() {
      var id = '6'
      var store = []
      this.radio.forEach(item => {
        if (item.id == id) {
          var Arr = item.data.podcast

          Arr.forEach(item => {
            item['img_link'] = this.imgFiltering(item)
          })
          store.push(item.data.podcast)
        }
      })

      this.pelangiarr = store
      Vue.nextTick(
        function() {
          this.installOwlCarousel('#pelangicarousel')
        }.bind(this)
      )
    },
    filterItemsPilihan() {
      var id = '7'
      var store = []
      this.radio.forEach(item => {
        if (item.id == id) {
          var Arr = item.data.podcast

          Arr.forEach(item => {
            item['img_link'] = this.imgFiltering(item)
          })
          store.push(item.data.podcast)
        }
      })

      this.pilihanarr = store
      Vue.nextTick(
        function() {
          this.installOwlCarousel('#pilihancarousel')
        }.bind(this)
      )
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
    initializepageview() {
      var self = this
      console.log(this.$route.path)
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/page-view',
        contentType: 'application/json',
        data: JSON.stringify({
          href: this.$route.path,
          title: 'podcast',
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
  mounted() {
    setTimeout(
      function() {
        this.filterItemsNasional()
        this.filterItemsHarmoni()
        this.filterItemsNurIslam()
        this.filterItemsPelangi()
        this.filterItemsPilihan()
        this.initializepageview()
      }.bind(this),
      700
    )
  },
  computed: {
    // filteredItems() {
    //   return this.podcast.filter(item => {
    //     if (item.id == this.$route.params.id) {
    //       return item;
    //     }
    //   });
    // },
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
  font-size: 45px;
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
.pod_icon {
  width: 44px;
  height: 44px;
  background: #fab900;
  border-radius: 50%;
  display: flex;
  align-items: center;
}
.pod_icon_eps {
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
.eps_player_title {
  font-family: Sf-ui-medium;
  font-size: 25px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 0.5px;
  text-align: left;
  color: #e2a802;
  padding: 0;
  margin: 15px 0 3px;
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
  .pod_icon {
    width: 25px;
    height: 25px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
  }

  .pod_icon svg {
    width: 25px;
    height: 25px;
  }
  .pod_icon_eps {
    width: 40px;
    height: 40px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pod_icon_eps svg {
    width: 40px;
    height: 40px;
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
