<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader
              :mainTitle="''"
              :currentPage="'VOD / ' + eps_title"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div
        class="row mt-4 mx-md-3 mb-3 px-md-2 py-4 remove_m_p"
        style="background:#191919;"
      >
        <div class="col-12 col-md-12 col-lg-7">
          <div class="embed-responsive embed-responsive-16by9">
            <div
              id="vidBox"
              class="player embed-responsive-item"
              ref="vidBox"
            ></div>
          </div>
        </div>
        <div class="col-12 col-md-12 col-lg-5">
          <div class="w-100 mb-4 mb-sm-0" ref="vidDetails">
            <p v-if="eps_title" class="eps_player_title mt-3 mb-3">
              {{ eps_title }}
            </p>
            <p
              v-if="eps_desc"
              class="eps mb-2"
              v-html="eps_desc.replace(/(?:\r\n|\r|\n|\n\n)/g, '<br />')"
            ></p>
            <div style="width:100%;" class="pt-3 mb-3">
              <div class="sharebtn" @click="openModal()">
                <img src="../assets/sharebtn.png" />
                <span>Share</span>
              </div>
              <social ref="social"></social>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row my-4 pb-4 px-2 px-md-4 justify-content-center justify-content-md-start"
        v-if="vod_episodes_related.length > 0"
      >
        <div class="col-12">
          <p class="mainEpsTitle text-left">More Episodes</p>
        </div>
        <div
          class="col-6 col-md-4 col-lg-3 my-3"
          v-for="(items, index) in vod_episodes_related"
          :key="items ? items.id : 'none' + index"
        >
          <VodCard
            :image="imgFiltering(items)"
            :latestTag="formatTimestamp(items.dateAvailability)"
            :title="formatString(items.longTitle)"
            :description="items.data.description"
            :link="checkLink(items)"
            :category="items.data.content_type[0].title.en_US"
          />
        </div>
      </div>
      <!-- ads mid -->
      <!-- ads -->
      <billboardBannerMiddle v-if="desktop"></billboardBannerMiddle>
      <mrecBannerMiddle v-if="mobile"></mrecBannerMiddle>

      <VodPlayerSuggestion />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
import noimage from '../assets/noimage.png'
import social from '../components/popup/sharepopup'
import { bus } from '../main'
import axios from 'axios'
// ads
import billboardBannerTop from '../components/ads/billboardBannerTop'
import mrecBannerTop from '../components/ads/mrecBannerTop'
import billboardBannerMiddle from '../components/ads/billboardBannerMiddle'
import mrecBannerMiddle from '../components/ads/mrecBannerMiddle'
import BillboardBannerBottom from '../components/ads/billboardBannerBottom'
import MrecBannerBottom from '../components/ads/mrecBannerBottom'
import VodPlayerSuggestion from '../components/vodplayer/vodPlayerSuggestion.vue'
import VodCard from '../components/cards/vodCard.vue'

export default {
  components: {
    social,
    billboardBannerTop: billboardBannerTop,
    mrecBannerTop: mrecBannerTop,
    billboardBannerMiddle: billboardBannerMiddle,
    mrecBannerMiddle: mrecBannerMiddle,
    billboardbannerbottom: BillboardBannerBottom,
    mrecbannerbottom: MrecBannerBottom,
    BreadCrumbsHeader,
    VodPlayerSuggestion,
    VodCard
  },
  data: function() {
    return {
      embed_url: '',
      active_id: '',
      eps_title: '',
      eps_desc: '',
      leftColStyles: {},
      epsColStyles: {},
      schema: this.$route.query.scheme,
      playlist_list: this.$route.query.p_type,
      id: this.$route.query.id,
      eps_id: this.$route.query.eps_id,
      vod: [],
      vod_related: [],
      vod_episodes: [],
      vod_episodes_related: [],
      showepisodelist: true,
      window: {
        width: 0,
        height: 0
      },
      share: [],
      url: '',
      childDataLoaded: false,
      showModal: false,
      program_title: '',
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  created: function() {
    this.$store.dispatch('fetchVodMixedFolder', { self: this })

    this.$nextTick(function() {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    $('#vidBox').empty()
    // peer5.destroy();
  },
  methods: {
    deviceCheck() {
      if (this.$device.ipad) {
        this.tablet = true
      } else if (this.$device.mobile) {
        this.mobile = true
      } else {
        this.desktop = true
      }
    },
    openModal() {
      this.share = {
        url: this.url,
        title: this.eps_title
      }

      bus.$emit('shareVar', this.share)
      this.$refs.social.show()
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    goTo(link) {
      this.$router.push(link)
    },
    checkLink(item) {
      var idSchema, check
      var id = item.id
      var title = item.data.title

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
      }

      return link
    },
    formatString(str) {
      var lower = str.toLowerCase()
      return lower
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    playVid(items) {
      var newschema

      if (items.idSchema == '206') {
        newschema = '205'
        this.$router.push(
          '/play?scheme=' +
            newschema +
            '&p_type=true&id=' +
            this.$route.query.id +
            '&eps_id=' +
            items.id
        )
      } else if (items.idSchema == '208') {
        newschema = '207'
        this.$router.push(
          '/play?scheme=' +
            newschema +
            '&p_type=true&id=' +
            this.$route.query.id +
            '&eps_id=' +
            items.id
        )
      }
    },
    handleResize() {
      this.window.width = window.innerWidth
      var heightString = this.$refs.vidBox.clientHeight
      var vidDetailsString = this.$refs.vidDetails.clientHeight
      var result = heightString + vidDetailsString + 'px'
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
          'https://rtb-images.glueapi.io/500x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/500x0/' + item.data.images.title.path
        } else {
          if (checkImgFeature) {
            imgurl =
              'https://rtb-images.glueapi.io/500x0/' +
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
    filterVodMixedFolder() {
      var vm = this
      vm.vod = this.$store.state.vodmixednews.data

      var store = []
      var imgurl
      vm.vod.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })
      vm.vod_related = store.slice(0, 7)

      Vue.nextTick(
        function() {
          vm.installOwlCarousel('#vodcarousel')
        }.bind(vm)
      )
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
          //console.log(data);
        },
        failure: function(errMsg) {
          //console.log(errMsg);
        }
      })
    },
    initializepageview() {
      var self = this
      $.ajax({
        type: 'POST',
        url: 'https://rtb.glueapi.io/report/page-view',
        contentType: 'application/json',
        data: JSON.stringify({
          href: this.$route.path,
          title: 'vodplayer',
          site: 'RTBGo'
        }),
        dataType: 'json',
        success: function(data) {
          // console.log(data);
        },
        failure: function(errMsg) {
          // console.log(errMsg);
        }
      })
    },
    PlayerInit(value) {
      //   console.log("in player init");
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
        skin: 'title' // false or title (Tile Skin is used for creating player with title image
        // ads: {
        //   enabled: true,
        //   tagUrl:
        //     'https://pubads.g.doubleclick.net/gampad/ads?iu=/22163595876/RTBGo_Web_Video&description_url=https%3A%2F%2Fwww.rtbgo.bn%2F&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
        //   contentType: 'ondemand',
        //   cmsid: 'glue',
        //   vid: value
        // }
      })

      window.gluePlayer = gluePlayer
      this.childDataLoaded = true
    },
    filteredGetProgramTitle() {
      var checkshemafailed = false
      this.vod.filter(item => {
        if (item.idSchema == this.schema) {
          if (item.id == this.id) {
            if (this.eps_id) {
              this.PlayerInit(this.eps_id)
              this.program_title = item.data.title

              this.active_id = this.eps_id
              this.url = window.location.origin + this.$route.fullPath

              this.vod_episodes.forEach(item => {
                if (item.id == this.eps_id) {
                  this.eps_desc = item.data.description
                  this.eps_title = item.data.title
                }
              })
            } else {
              var eps_id
              if (this.schema == '205') {
                //vod
                // console.log(JSON.stringify(item, null, 2));
                eps_id = item.data['program-episode'][0].id
                this.PlayerInit(item.data['program-episode'][0].id)
                this.program_title = item.data.title
                // this.eps_title = item.data["program-episode"][0].title;
                // this.eps_desc = item.data.description;
                // this.active_id = item.data["program-episode"][0].id;
                this.url = window.location.origin + this.$route.fullPath
              } else if (this.schema == '207') {
                //news
                eps_id = item.data['news-episode'][0].id
                this.PlayerInit(item.data['news-episode'][0].id)
                this.program_title = item.data['news-episode'][0].title
                // this.eps_title = item.data.longTitle;
                // this.eps_desc = item.data.description;
                // this.active_id = item.data["news-episode"][0].id;
                this.url = window.location.origin + this.$route.fullPath
              } else if (this.schema == '209') {
                //news
                this.PlayerInit(item.id)
                this.program_title = item.data.title
                this.eps_title = item.longTitle
                this.eps_desc = item.data.description
                this.active_id = item.id
                this.url = window.location.origin + this.$route.fullPath
              }

              if (this.schema == '205' || this.schema == '207') {
                this.vod_episodes.forEach(item => {
                  if (item.id == eps_id) {
                    // console.log(JSON.stringify(item, null, 2));
                    this.eps_title = item.data.title
                    this.eps_desc = item.data.description
                    this.active_id = eps_id
                  }
                })
              }
            }
          }
        } else {
          checkshemafailed = true
        }
      })

      if (checkshemafailed === true) {
        this.vod_episodes.filter(item => {
          if (item.idSchema == this.schema) {
            if (item.id == this.id) {
              var check
              if (this.schema == '206') {
                //vod
                check = item.data && item.data.program && item.data.program.id
              } else if (this.schema == '208') {
                //news
                // console.log(JSON.stringify(item, null, 2));
                check = item.data && item.data.news && item.data.news.id
              }

              if (check) {
                if (this.schema == '206') {
                  //vod
                  //   console.log(JSON.stringify(item, null, 2));
                  this.$router.push(
                    '/play?scheme=205&p_type=true&id=' +
                      item.data.program.id +
                      '&eps_id=' +
                      item.id
                  )
                  //   this.PlayerInit(item.id);
                  //   this.program_title = item.data.program.title;
                } else if (this.schema == '208') {
                  //news
                  this.PlayerInit(item.id)
                  this.program_title = item.data.news.title
                  this.eps_title = item.longTitle
                  this.active_id = item.id
                  this.eps_desc = item.data.description
                }
              }
            }
          }
        })
      }

      if (this.active_id && this.eps_desc) {
        this.initializecontentview()
        this.initializepageview()
      }
    },
    generateEpisodeListFor() {
      var check
      var store = []
      this.vod_episodes.filter(item => {
        if (this.schema == '205') {
          //vod
          check = item.data && item.data.program && item.data.program.id
        } else if (this.schema == '207') {
          //news
          check = item.data && item.data.news && item.data.news.id
        }

        if (check) {
          if (this.schema == '205') {
            //vod
            if (item.data.program.id == this.id) {
              store.push(item)
            }
          } else if (this.schema == '207') {
            //news
            if (item.data.news.id == this.id) {
              store.push(item)
            }
          }
        }
      })

      this.vod_episodes_related.push(store)
    },

    filterFolderData(obj) {
      if (obj.data['program-episode'] && obj.data['program-episode'][0]) {
        this.getFirstContentData(obj.data['program-episode'][0].id)
        if (obj.data['program-episode']) {
          this.getEpsListContentData(obj.data['program-episode'])
        }
      } else {
        this.setFirstIditems(obj)
        if (obj.data.program) {
          this.getContentOtherFolderData(obj.data.program.id)
        } else if (obj.data.news) {
          this.getContentOtherFolderData(obj.data.news.id)
        }
      }

      //for other episode list
    },

    setFirstIditems(obj) {
      this.PlayerInit(obj.id)
      this.program_title = obj.title
      this.active_id = obj.id
      this.url = window.location.origin + this.$route.fullPath
      this.eps_desc = obj.data.description
      this.eps_title = obj.title

      if (this.active_id && this.eps_desc) {
        this.initializecontentview()
        this.initializepageview()
      }
    },

    filterOtherFolderData(obj) {
      if (obj.data['program-episode']) {
        this.getEpsListContentData(obj.data['program-episode'])
      } else if (obj.data['news-episode']) {
        this.getEpsListContentData(obj.data['news-episode'])
      }
    },

    async getContentOtherFolderData(value) {
      try {
        axios
          .get(`https://cdn-rtb.glueapi.io/v1/content/${value}?format=json`)
          .then(response => {
            this.filterOtherFolderData(response.data.data)
          })
      } catch (e) {
        console.log(e)
      }
    },

    async getContentFolderData(value) {
      try {
        axios
          .get(`https://cdn-rtb.glueapi.io/v1/content/${value}?format=json`)
          .then(response => {
            this.filterFolderData(response.data.data)
          })
      } catch (e) {
        console.log(e)
      }
    },

    async getEpsListContentData(list) {
      let vm = this
      let promises = []

      list.forEach(function(items) {
        const myUrl = `https://cdn-rtb.glueapi.io/v1/content/${
          items.id
        }?format=json`
        promises.push(axios.get(myUrl))
      })

      Promise.all(promises).then(function(results) {
        results.forEach(function(response, index) {
          const res = response.data.data
          if (res) {
            vm.vod_episodes_related.push(response.data.data)
          }

          if (index == results.length - 1) {
            vm.vod_episodes_related.sort(function(a, b) {
              return b.id - a.id
            })
          }
        })
      })
    },

    async getDirectContentData(value) {
      axios
        .get(`https://cdn-rtb.glueapi.io/v1/content/${value}?format=json`)
        .then(response => {
          this.filterFolderData(response.data.data)
        })
    },

    async getFirstContentData(value) {
      axios
        .get(`https://cdn-rtb.glueapi.io/v1/content/${value}?format=json`)
        .then(response => {
          this.setFirstIditems(response.data.data)
        })
    },

    async initializeContentForStart() {
      if (this.playlist_list) {
        if (this.eps_id) {
          this.getDirectContentData(this.eps_id)
        } else {
          this.getContentFolderData(this.id)
        }
      } else {
        this.getFirstContentData(this.id)
      }

      //first skali check for p_type, klu true, ada playlist, klu false, untuk schema yg history
      //second,if p_type true, check plk eps_id,klu ada,direct ke eps id,klu xde,call general,get the first one
      //third, set this.vod and this.vod_episode
    }
  },
  beforeMount() {
    this.initializeContentForStart()
  },
  mounted() {
    this.deviceCheck()
    this.$nextTick(function() {
      this.handleResize()
    })
  },
  computed: {
    initPeer() {
      // Our fancy notification (2).
      // peer5
      // peer5.destroy();
      // peer5.init();
    }
  }
}
</script>

<style scoped>
.mb_controller {
  margin-bottom: 80px;
}
.pt-livetv {
  padding: 90px 0 90px;
}
.breadCrumbsWrapper {
  padding: 30px;
}
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
.mainEpsTitle {
  font-size: 25px;
  font-weight: bold;
  line-height: 1.2;
  color: #fab900;
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

  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  text-align: center;
}
.title_header {
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 0.6px;
  text-align: left;
  color: #fab900;
}
.title_eps {
  width: 100%;

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
.vod_icon {
  width: 44px;
  height: 44px;
  background: #fab900;
  border-radius: 50%;
  display: flex;
  align-items: center;
}
.vod_icon_eps {
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
  z-index: 1;
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
  .vod_icon {
    width: 25px;
    height: 25px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
  }

  .vod_icon svg {
    width: 15px;
    height: 15px;
  }
  .vod_icon_eps {
    width: 40px;
    height: 40px;
    background: #fab900;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vod_icon_eps svg {
    width: 30px;
    height: 30px;
  }
  .title_header {
    font-size: 20px;
  }

  .pt-livetv {
    padding: 8px 0 0;
  }
  .breadCrumbsWrapper {
    padding: 16px;
  }
}

.sharebtn {
  width: 150px;
  background: #fab900;
  border-radius: 4px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.sharebtn img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.sharebtn span {
  color: white;
  font-size: 16px;
}
</style>
<style>
.sharebtn {
  width: 150px;
  background: #fab900;
  border-radius: 4px;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.sharebtn img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.sharebtn span {
  color: white;
  font-size: 16px;
}
</style>
