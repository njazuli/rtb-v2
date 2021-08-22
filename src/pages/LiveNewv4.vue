<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader :mainTitle="'TV'" :currentPage="'TV'" />
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-lg-3 order-2 order-lg-1">
          <div
            class="w-100 list-div d-flex flex-row flex-lg-column align-items-center"
          >
            <div
              class="w-100 mx-2 mt-5 mx-lg-0 mt-lg-0 mb-lg-4 cursor-pointer"
              v-bind:class="{ active: player_id === item.id }"
              v-for="item in live_tv"
              :key="item.id"
              @click="itemClick(item)"
            >
              <div
                class="main-item-wrapper d-flex flex-column position-relative"
              >
                <div class="item_img">
                  <img
                    v-bind:src="item.img_link"
                    @error="imageLoadError($event)"
                    class="img-class"
                  />
                  <div class="live-tag">
                    <div class="mr-1">
                      <img src="@/assets/icon/live.png" class="live-tag-img" />
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="latest-text">LIVE</span>
                    </div>
                  </div>
                </div>
                <div class="now-playing-div" v-if="player_id === item.id">
                  <p class="mb-0 now-playing-title">Now Playing</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="w-100 d-none d-lg-flex">
            <img src="@/assets/adspace-halfpage.png" alt="" class="w-100" />
          </div> -->
        </div>
        <div class="col-12 col-lg-9 order-1 order-lg-2">
          <div class="w-100">
            <VideoPlayer :id="player_id" :type="'video'" />
          </div>
          <div
            class="w-100 d-flex flex-row mt-2 align-items-center justify-content-between"
          >
            <div class="d-flex flex-row align-items-center">
              <div class="small-logo mr-2 ">
                <img :src="small_icon" class="w-100" />
              </div>
              <div>
                <p class="mb-0 title">{{ title }}</p>
              </div>
            </div>

            <div class="px-2">
              <div
                class="sharebtndiv d-flex flex-row align-items-center"
                @click="openModal(channel_title)"
              >
                <span class="mr-2">Share</span>
                <img src="@/assets/icon/share.svg" />
              </div>
              <social ref="social"></social>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2 mt-lg-4">
        <div class="col-12">
          <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
          <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
import VideoPlayer from '@/components/players/videoPlayer.vue'
import social from '../components/popup/sharepopup'
import billboardBannerMiddle from '../components/ads/billboardBannerMiddle'
import mrecBannerMiddle from '../components/ads/mrecBannerMiddle'
import { bus } from '../main'
export default {
  data: function() {
    return {
      share: [],
      live_tv: [],
      player_id: this.$route.params.id ? this.$route.params.id : 0,
      initialization: false,
      active_obj: [],
      title: '',
      small_icon: '',
      channel_title: '',
      mobile: false,
      desktop: false
    }
  },
  components: {
    social,
    VideoPlayer,
    BreadCrumbsHeader,
    billboardBannerMiddle,
    mrecBannerMiddle
  },
  methods: {
    filterLiveTv() {
      this.live_tv = this.$store.state.live_tv.data

      var vm = this
      vm.live_tv = this.$store.state.live_tv.data
      var store = []
      vm.live_tv.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.live_tv = store

      vm.live_tv.sort(function(a, b) {
        return a.id - b.id
      })

      this.initialization = true
    },
    initializeFirstId() {
      this.setCurrentId(this.live_tv[0])
    },
    setCurrentId(item) {
      /* eslint-disable */
      console.log(item.id)
      this.player_id = parseInt(item.id)
      this.title = item.data.slogan
      this.small_icon = item.img_link
      this.channel_title = item.title
    },
    itemClick(item) {
      this.$router.push('/live/' + item.id)
    },
    getRelatedItems(current_id) {
      this.live_tv.forEach(item => {
        if (current_id == item.id) {
          this.setCurrentId(item)
        }
      })
    },
    openModal(channel_title) {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: channel_title
      }

      bus.$emit('shareVar', this.share)
      this.$refs.social.show()
    },
    deviceCheck() {
      if (this.$device.ipad) {
        this.tablet = true
      } else if (this.$device.mobile) {
        this.mobile = true
      } else {
        this.desktop = true
      }
    }
  },
  created() {
    this.$store.dispatch('fetchLiveTV', { self: this })
  },
  mounted() {
    this.deviceCheck()
    setTimeout(
      function() {
        if (!this.$route.params.id) {
          // get the first id
          this.initializeFirstId()
        } else {
          //directly set the active player object
          this.getRelatedItems(this.$route.params.id)
        }
      }.bind(this),
      800
    )
  },
  destroyed() {
    $('#vidBox').empty()
  }
}
</script>

<style scoped>
.min-height-for-section {
  /* min-height: 100vh; */
  padding-bottom: 80px;
}
.cursor-pointer {
  cursor: pointer;
}
.pt-livetv {
  padding-top: 90px;
}
.item_img {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
  z-index: 20;
  background: #eae7e5;
}
.item_img .img-class {
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
.live-tag {
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 2px 5px;
  background: #ff0000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
}
.live-tag .live-tag-img {
  width: 16px;
}
.latest-text {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.14;
  text-align: left;
  color: #ffffff;
}
.title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.17;
  letter-spacing: 0.36px;
  text-align: left;
  color: #fff;
}
.small-logo {
  width: 82px;
  border-radius: 4px;
  overflow: hidden;
}
.active {
  position: relative;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  width: 100%;
  border: 3px solid #fab900;
}
.active::before {
  content: '';
  position: absolute;
  top: 40%;
  right: -30px;
  z-index: 1;
  border: solid 15px transparent;
  border-left-color: #fab900;
}
.now-playing-div {
  padding: 4px 10px;
  background: #f9b91b;
  position: absolute;
  bottom: 0;
  right: 0;
  border-top-left-radius: 4px;
  display: flex;
  align-items: center;
}
.now-playing-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
  color: #292929;
  padding-top: 2px;
}
.sharebtndiv {
  cursor: pointer;
}
.sharebtndiv span {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  color: #facb43;
}
.sharebtndiv img {
  width: 20px;
}

@media only screen and (max-width: 992px) {
  .min-height-for-section {
    padding-bottom: 40px;
  }
  .list-div {
    max-width: 480px;
    margin: 0 auto;
  }
  .active::before {
    content: '';
    position: absolute;
    top: -25%;
    right: 45%;
    z-index: 1;
    border: solid 15px transparent;
    border-bottom-color: #fab900;
  }
}

@media only screen and (max-width: 768px) {
  .min-height-for-section {
    min-height: 70vh;
  }
  .pt-livetv {
    padding-top: 20px;
  }

  .live-tag {
    padding: 2px 4px;
    height: 16px;
  }
  .live-tag .live-tag-img {
    width: 12px;
  }
  .latest-text {
    font-size: 10px;
  }
  .title,
  .now-playing-title,
  .sharebtndiv span {
    font-size: 12px;
  }
  .small-logo {
    width: 42px;
  }
}
@media only screen and (max-width: 480px) {
  .active::before {
    top: -40%;
    right: 38%;
  }
  .sharebtndiv img {
    width: 16px;
  }
}
</style>
