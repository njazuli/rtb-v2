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
            <span class="bg_text">NEWS</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div
        class="row mt-4 mx-md-3 mb-1 px-md-2 pt-1 pb-3 remove_m_p"
        style="border-bottom: 1px solid #fab900"
      >
        <span class="title_news_header">
          For more news article, visit
          <a
            href="http://www.rtbnews.rtb.gov.bn/SitePages/Home.aspx"
            target="_blank"
            >Official news website</a
          >
        </span>
      </div>
      <div
        class="row mt-4 mx-md-3 mb-1 px-md-2 py-1 remove_m_p"
        id="titleBox"
        ref="titleBox"
        v-for="news_items in filteredItems"
        :key="news_items.id"
      >
        <div class="remove_m_p news_icon">
          <div style="width:100%;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              style=" fill:#000000;"
            >
              <g id="surface1">
                <path
                  style=" "
                  d="M 0 7 L 0 39 L 50 39 L 50 7 Z M 2 9 L 48 9 L 48 37 L 2 37 Z M 20.625 16.59375 C 20.515625 16.59375 20.410156 16.632813 20.3125 16.6875 C 20.113281 16.800781 20 17.023438 20 17.25 L 20 29.96875 C 20 30.195313 20.117188 30.417969 20.3125 30.53125 C 20.410156 30.589844 20.515625 30.59375 20.625 30.59375 C 20.734375 30.59375 20.871094 30.589844 20.96875 30.53125 L 31.96875 24.15625 C 32.164063 24.042969 32.28125 23.820313 32.28125 23.59375 C 32.28125 23.367188 32.164063 23.175781 31.96875 23.0625 L 20.96875 16.6875 C 20.871094 16.632813 20.734375 16.59375 20.625 16.59375 Z M 10.8125 41 C 10.261719 41.050781 9.855469 41.542969 9.90625 42.09375 C 9.957031 42.644531 10.449219 43.050781 11 43 L 39 43 C 39.359375 43.003906 39.695313 42.816406 39.878906 42.503906 C 40.058594 42.191406 40.058594 41.808594 39.878906 41.496094 C 39.695313 41.183594 39.359375 40.996094 39 41 L 11 41 C 10.96875 41 10.9375 41 10.90625 41 C 10.875 41 10.84375 41 10.8125 41 Z "
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="col-10">
          <div
            style="width:auto;display: flex;align-items: center;"
            class="pl-3"
          >
            <span class="title_header">{{ news_items.title }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="!nodata"
        class="row mt-4 mx-md-3 mb-3 px-md-2 py-4 remove_m_p"
        style="background:#191919;"
      >
        <div class="col-12 col-md-12 col-lg-7">
          <div class="embed-responsive embed-responsive-16by9">
            <!-- <iframe
              :src="embed_url"
              class="embed-responsive-item"
              allowfullscreen
              id="vidBox"
              ref="vidBox"
            ></iframe>-->
            <div
              id="vidBox"
              class="player embed-responsive-item"
              ref="vidBox"
            ></div>
          </div>
          <div style="width:100%" class="mb-4 mb-sm-0">
            <p class="eps_player_title">{{ eps_title }}</p>
            <p
              v-if="eps_desc"
              class="eps"
              v-html="eps_desc.replace(/(?:\r\n|\r|\n|\n\n)/g, '<br />')"
            ></p>
            <div style="width:100%;" class="pt-3 mb-4 text-left">
              <!-- <AddThis publicId="ra-5d92d889385b2fe2"  v-if="childDataLoaded"/> -->
              <!-- <AddThis v-if="childDataLoaded"
                publicId="ra-5d92d889385b2fe2" 
                :data-url = this.$route.query.page
                :data-title = eps_title 
                :data-description = eps_desc
              /> -->
              <div class="sharebtn" @click="openModal()">
                <img src="../assets/sharebtn.png" />
                <span>Share</span>
              </div>
              <social ref="social"></social>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-12 col-lg-5">
          <div
            class="row remove_m_p d-block"
            style="background:#313131;overflow:auto;"
            v-bind:style="leftColStyles"
          >
            <div
              class="p-3 c-p d-flex justify-content-start align-items-center"
              style="width:100%;"
              v-for="items in filteredNewsEpisodes"
              :key="items.id"
              :class="{ active: active_id == items.id }"
              @click="playVid(items)"
              v-bind:style="epsColStyles"
            >
              <div>
                <div class="news_icon_eps">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    style=" fill:#000000;"
                  >
                    <g id="surface1">
                      <path
                        style=" "
                        d="M 0 7 L 0 39 L 50 39 L 50 7 Z M 2 9 L 48 9 L 48 37 L 2 37 Z M 20.625 16.59375 C 20.515625 16.59375 20.410156 16.632813 20.3125 16.6875 C 20.113281 16.800781 20 17.023438 20 17.25 L 20 29.96875 C 20 30.195313 20.117188 30.417969 20.3125 30.53125 C 20.410156 30.589844 20.515625 30.59375 20.625 30.59375 C 20.734375 30.59375 20.871094 30.589844 20.96875 30.53125 L 31.96875 24.15625 C 32.164063 24.042969 32.28125 23.820313 32.28125 23.59375 C 32.28125 23.367188 32.164063 23.175781 31.96875 23.0625 L 20.96875 16.6875 C 20.871094 16.632813 20.734375 16.59375 20.625 16.59375 Z M 10.8125 41 C 10.261719 41.050781 9.855469 41.542969 9.90625 42.09375 C 9.957031 42.644531 10.449219 43.050781 11 43 L 39 43 C 39.359375 43.003906 39.695313 42.816406 39.878906 42.503906 C 40.058594 42.191406 40.058594 41.808594 39.878906 41.496094 C 39.695313 41.183594 39.359375 40.996094 39 41 L 11 41 C 10.96875 41 10.9375 41 10.90625 41 C 10.875 41 10.84375 41 10.8125 41 Z "
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div class="pl-4 pl-md-3" style="width:auto;">
                <div style="width:100%;">
                  <p class="title_eps">{{ items.title }}</p>
                  <p class="eps">{{ items.data.duration | formatDuration }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- if no data -->
      <div
        v-if="nodata"
        class="row mt-4 mx-md-3 mb-3 px-md-2 py-4 remove_m_p"
        style="background:#191919;"
      >
        <div class="col-12">
          <span>No playback / video for now. </span>
        </div>
      </div>

      <div class="row mt-3 pt-4 remove_m_p" style="background:#313131;">
        <!-- news -->
        <div class="col-12 text-left px-4">
          <span class="carousel_title">MORE NEWS</span>
        </div>
        <div class="container-fluid my-3 px-4" id="homeradioCarousel">
          <div class="owl-carousel owl-theme" id="newscarousel">
            <div
              class="item"
              v-for="item_news in news"
              :key="item_news.id"
              @click="goTo('/newsplayer?id=' + item_news.id)"
            >
              <div class="item_img">
                <img
                  v-bind:src="item_news.img_link"
                  @error="imageLoadError($event)"
                />
              </div>
              <p class="items_title pl-1">{{ item_news.title }}</p>
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
import social from '../components/popup/sharepopup'
import { bus } from '../main'
export default {
  components: {
    social
  },
  data: function() {
    return {
      noimage: noimage,
      embed_url: '',
      active_id: '',
      eps_title: '',
      eps_desc: '',
      leftColStyles: {},
      epsColStyles: {},
      news_episodes: [],
      current_episodes: [],
      news: [],
      window: {
        width: 0,
        height: 0
      },
      childDataLoaded: false,
      nodata: false,
      share: [],
      url: ''
    }
  },
  created: function() {
    this.$store.dispatch('fetchNews', { self: this })
    this.$store.dispatch('fetchNewsEpisodes', { self: this })

    this.$nextTick(function() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    openModal() {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: this.eps_title
      }

      bus.$emit('shareVar', this.share)
      this.$refs.social.show()
    },
    goTo(link) {
      this.$router.push(link)
    },
    playVid(items) {
      // this.active_id = items.id;
      // this.eps_title = items.longTitle;
      // this.eps_desc = items.data.description;
      // this.embed_url =
      //   "https://rtb-player.glueapi.io/latest/p/" + items.id + "?skin=title";
      // this.PlayerInit(items.id);
      // this.initializecontentview();
      // this.initializepageview();

      this.$router.push(
        'newsplayer?id=' + this.$route.query.id + '&eps_id=' + items.id
      )
    },
    handleResize() {
      this.window.width = window.innerWidth
      var heightString = this.$refs.vidBox.clientHeight
      var result = heightString + 70 + 'px'
      var eps_result = (result - 70) / 3 + 'px'
      if (this.window.width <= '991') {
        Vue.set(this.leftColStyles, 'height', '300px')
      } else {
        Vue.set(this.leftColStyles, 'height', result)
        Vue.set(this.epsColStyles, 'height', eps_result)
      }
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
            this.settings.loop = false
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
    imageLoadError(event) {
      event.target.src = noimage
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

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#newscarousel')
        }.bind(vm)
      )
    },
    filterNewsEpisode() {
      this.news_episodes = this.$store.state.newsepisode.data
    },
    setInitialId() {
      this.$router.push('/newsplayer?id=' + this.news[0].id)
      // console.log(this.$route.query.id);
    },
    initializecontentview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/viewed',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          idContent: this.active_id, // Content ID from content api response
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
          title: 'newsplayer',
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
      // console.log("in player init");
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
      this.childDataLoaded = true
      this.initializecontentview()
      this.initializepageview()
    },

    setEpsInitialId() {
      if (this.current_episodes[0].id) {
        var first_id = this.current_episodes[0].id
        this.$router.push(
          'newsplayer?id=' + this.$route.query.id + '&eps_id=' + first_id
        )
      } else {
        this.nodata = true
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.handleResize()
    })

    if (!this.$route.query.id) {
      setTimeout(
        function() {
          this.setInitialId()
        }.bind(this),
        800
      )
    } else if (!this.$route.query.eps_id) {
      setTimeout(
        function() {
          this.setEpsInitialId()
        }.bind(this),
        1100
      )
    }
  },
  computed: {
    filteredItems() {
      return this.news.filter(item => {
        if (item.id == this.$route.query.id) {
          return item
        }
      })
    },
    filteredNewsEpisodes() {
      var val = []
      var eps_arr = this.news_episodes
      eps_arr.forEach(item => {
        if (item.data.news.id == this.$route.query.id) {
          val.push(item)
          this.current_episodes.push(item)
        }
      })

      val.forEach(item => {
        if (this.$route.query.eps_id == item.id) {
          this.eps_title = item.longTitle
          this.eps_desc = item.data.description
          this.active_id = item.id
          this.embed_url =
            'https://rtb-player.glueapi.io/latest/p/' + item.id + '?skin=title'
          this.PlayerInit(item.id)
        }
      })

      setTimeout(
        function() {
          // this.eps_title = val[0].longTitle;
          // this.eps_desc = val[0].data.description;
          // this.active_id = val[0].id;
          // this.PlayerInit(val[0].id);
          // this.embed_url =
          //   "https://rtb-player.glueapi.io/latest/p/" +
          //   val[0].id +
          //   "?skin=title";
          // this.initializecontentview();
          // this.initializepageview();
        }.bind(this),
        700
      )

      return val
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
.title_news_header {
  font-family: Sf-ui-medium;
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: 0.6px;
  text-align: left;
  color: #fab900;
}
.title_news_header a {
  color: #cccccc;
}
.title_news_header a:hover {
  color: #cccccc;
  outline: none;
  text-decoration: none;
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
.c-p {
  cursor: pointer;
}
.news_icon {
  width: 44px;
  height: 44px;
  background: #fab900;
  border-radius: 50%;
  display: flex;
  align-items: center;
}
.news_icon_eps {
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
  .news_icon {
    width: 25px;
    height: 25px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
  }

  .news_icon svg {
    width: 15px;
    height: 15px;
  }
  .news_icon_eps {
    width: 40px;
    height: 40px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .news_icon_eps svg {
    width: 30px;
    height: 30px;
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
