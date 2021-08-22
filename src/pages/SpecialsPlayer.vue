<template>
  <div class="mb_controller">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div
          class="row bg_header d-flex justify-content-center align-items-center"
        >
          <div class="channel_logo">
            <span class="bg_text">SPECIALS</span>
          </div>
        </div>
      </div>
    </div>
    <!-- v-for="items in filteredItems" :key="items.id" -->
    <div class="container-fluid" v-for="item in filteredItems" :key="item.id">
      <div class="row my-sm-3 mx-sm-4" style="margin:0 auto;">
        <div class="col-12 col-md-12 rem_mp">
          <div
            class="row d-flex justify-content-center align-items-center pb-2 rem_mp"
          >
            <div class="col-md-7 col-12 rem_mp">
              <div class="embed-responsive embed-responsive-16by9">
                <!-- <iframe :src="item.embed_url" class="embed-responsive-item" allowfullscreen></iframe> -->
                <div
                  id="vidBox"
                  class="player embed-responsive-item"
                  ref="vidBox"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center px-1 px-md-2 py-2"
          >
            <div class="col-12 text-center">
              <p class="eps_player_title">{{ item.data.title }}</p>
              <p
                v-if="item.data.description"
                class="eps"
                v-html="
                  item.data.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
                "
              ></p>
            </div>
          </div>
          <div
            class="row d-flex justify-content-center align-items-center px-2 py-2 rem_mp"
          >
            <div class="col-12 d-flex justify-content-center">
              <div class="sharebtn" @click="openModal()">
                <img src="../assets/sharebtn.png" />
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- specials -->
      <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE VIDEO</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="specialCarousel">
            <div
              class="item"
              v-for="item_special in special"
              :key="item_special.id"
              @click="goTo('/special/' + item_special.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_special.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">{{ item_special.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <social ref="social"></social>
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import Vue from 'vue'
import carousel from 'vue-owl-carousel'
import noimage from '../assets/noimage.png'
import social from '../components/popup/sharepopup'
import { bus } from '../main'
export default {
  data: function() {
    return {
      embed_url: '',
      special_img: '',
      special_details: '',
      eps_title: '',
      special: [],
      noimage: noimage,
      childDataLoaded: false,
      currenturl: '',
      share: [],
      url: '',
      showModal: false
    }
  },
  created: function() {
    // this.filteredItems(); //method1 will execute at pageload
    this.$store.dispatch('fetchSpecials', { self: this })
  },
  components: { carousel, social },
  methods: {
    openModal() {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: this.eps_title
      }

      bus.$emit('shareVar', this.share)
      this.$refs.social.show()
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    playRadio(value) {
      this.embed_url = value.embed_link
      this.special_img = value.image
      this.special_details = value.description
      this.$router.push('/special/' + value.id)
      this.PlayerInit(value.id)
    },
    goTo(link) {
      // console.log("in");
      this.$router.push(link)
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
    filterSpecials() {
      var vm = this
      vm.special = this.$store.state.special.data
      var store = []
      var imgurl
      vm.special.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.special = store
      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#specialCarousel')
        }.bind(vm)
      )
    },
    setInitialId() {
      this.$router.push('/special/' + this.special[0].id)
    },
    initializecontentview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/viewed',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          idContent: self.$route.params.id, // Content ID from content api response
          contentTitle: this.eps_title, // Content Longtitle from content api response
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
          title: 'special',
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
    },
    PlayerInit(value) {
      // console.log("in player init" + value);
      var target = document.getElementById('vidBox')
      var gluePlayer = new GluePlyr()
      gluePlayer.setup(value, {
        apiPath: 'https://rtb.glueapi.io',
        target: target,
        poster:
          'https://rtb.glueapi.io/v1/content/' +
          value +
          '/image/1200x0/images.thumbnail?quality=100', //Replace with the id 413 with the id of the content
        site: 'RTBGo',
        type: 'video', // video or audio
        skin: false // false or title (Tile Skin is used for creating player with title image
      })

      window.gluePlayer = gluePlayer
      this.currenturl = window.location.origin + '' + this.$route.path

      this.childDataLoaded = true
    }
  },
  computed: {
    filteredItems() {
      var items_onload = []
      this.special.forEach(item => {
        if (item.id == this.$route.params.id) {
          this.eps_title = item.longTitle
          this.url = window.location.origin + this.$route.fullPath
          var embed_link =
            'https://rtb-player.glueapi.io/latest/p/' + item.id + '?skin=title'
          item['embed_url'] = embed_link
          items_onload.push(item)
        }
      })

      setTimeout(
        function() {
          this.PlayerInit(items_onload[0].id)
          this.initializecontentview()
          this.initializepageview()
        }.bind(this),
        1000
      )

      return items_onload
    }
  },
  mounted() {
    if (!this.$route.params.id) {
      setTimeout(
        function() {
          this.setInitialId()
        }.bind(this),
        900
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
.radio_desc_div {
  background: white;
}
.eps {
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #cccccc;
  padding: 0;
  margin: 0 0 3px;
}
.eps_player_title {
  font-family: Sf-ui-medium;
  font-size: 25px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: #e2a802;
  padding: 0;
  margin: 15px 0 3px;
}
.channel_logo {
  width: 186px;
  height: auto;
  padding: 20px 0px;
}
.channel_logo_bottom img {
  width: 100%;
}
.carousel_title {
  font-family: Sf-ui-medium;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1px;
  text-align: left;
  color: #fab900;
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
@media only screen and (max-width: 768px) {
  .bg {
    margin-bottom: 60px;
  }
  .rem_mp {
    padding: 0;
    margin: 0;
  }
  .eps_player_title {
    margin: 4px 0 0;
  }
}
a {
  cursor: pointer;
}
.img-wrapper-masthead {
  cursor: pointer;
}
</style>
<style>
#specialCarousel .owl-theme {
  position: relative;
}
#specialCarousel .owl-theme .owl-nav {
  position: absolute;
  top: -49px;
  right: 50px;
  height: 100%;
}
#specialCarousel .owl-theme .owl-nav [class*='owl-']:hover {
  text-shadow: 4px 4px 4px rgba(56, 56, 56, 0.9);
}

#specialCarousel .owl-theme .owl-nav [class*='owl-'] {
  color: rgba(0, 0, 0, 0);
  font-size: 14px;
  margin: 5px;
  padding: 4px 7px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
  border-radius: 3px;
}

#specialCarousel .owl-theme .owl-nav .owl-next {
  background: url('../assets/prev.png') no-repeat left center;
  right: -15px;
  position: absolute;
  top: -15px;
  height: 20px;
  width: 40px;
}

#specialCarousel .owl-theme .owl-nav .owl-prev {
  background: url('../assets/next.png') no-repeat left center;
  left: -15px;
  height: 20px;
  width: 54px;
  position: absolute;
  top: -15px;
}

.pre-formatted {
  white-space: pre;
}
</style>
