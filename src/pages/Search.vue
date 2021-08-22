<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader :mainTitle="''" :currentPage="'Search'" />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-3">
      <div class="row searchinputstyle mx-2">
        <div
          class="searchicon d-flex justify-content-center align-items-center"
          style
        >
          <a href="#">
            <img src="../assets/top-menu/search-ico.png" />
          </a>
        </div>
        <!-- <div class="borderside d-flex justify-content-center align-items-start">
          <span>|</span>
        </div>-->
        <div
          class="inputbox pl-3 d-flex justify-content-center align-items-center"
        >
          <input
            v-model="searchinput"
            placeholder="Search"
            style="width:100%;"
            @input="searchRecord"
          />
        </div>
        <div
          class="closebutton d-flex justify-content-center align-items-center"
          @click="clearQuery()"
        >
          <span class="closeicon">X</span>
          <span class="close_text">Clear</span>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row px-2 mt-4" v-if="vodArr.length > 0">
        <div class="col-12">
          <p class="type-title text-yellow">VOD</p>
        </div>
        <div
          class="col-6 col-md-3 my-3"
          v-for="item_vod in vodArr"
          :key="item_vod.id"
          @click="goTo(checkLink(item_vod))"
        >
          <VodCard
            :image="imgFiltering(item_vod)"
            :title="formatString(item_vod.longTitle)"
            :description="item_vod.data.description"
            :link="checkLink(item_vod)"
            :category="item_vod.data.content_type[0].title.en_US"
          />
        </div>
      </div>

      <div class="row px-2 my-4" v-if="podcastArr.length > 0">
        <div class="col-12">
          <p class="type-title text-yellow">PODCAST</p>
        </div>
        <div
          class="col-6 col-md-3 my-3"
          v-for="item_pod in podcastArr"
          :key="item_pod.id"
          @click="goTo(checkLink(item_pod))"
        >
          <PodcastCard
            :image="imgFiltering(item_pod)"
            :title="formatString(item_pod.longTitle)"
            :description="item_pod.data.description"
            :link="checkLink(item_pod)"
          />
        </div>
      </div>
      <div
        class="row px-2 my-4"
        v-if="vodArr.length == 0 && podcastArr.length == 0"
      >
        <div class="col-12">
          <p class="type-title text-yellow">
            Sorry, no result found. Try different keyword.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import Vue from 'vue'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
import noimage from '../assets/noimage.png'
import axios from 'axios'
import VodCard from '../components/cards/vodCard.vue'
import PodcastCard from '../components/cards/podcastCard.vue'
export default {
  components: {
    BreadCrumbsHeader,
    VodCard,
    PodcastCard
  },
  data: function() {
    return {
      searchinput: '',
      searchArr: [],
      vodArr: [],
      podcastArr: [],
      timeout: null,
      noimage: noimage,
      offset: 0,
      epsColStyles: {},
      window: {
        height: 0
      }
    }
  },
  methods: {
    goTo(link) {
      this.$router.push(link)
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    clearQuery() {
      this.searchinput = ''
      this.vodArr = []
      this.podcastArr = []
      this.offset = 0
    },
    searchRecord() {
      clearTimeout(this.timeout)
      var vm = this
      this.timeout = setTimeout(function() {
        if (vm.searchinput) {
          const baseURI = `https://rtb.glueapi.io/v1/content?offset=${
            vm.offset
          }&limit=100&query=${vm.searchinput}`
          try {
            axios.get(baseURI).then(response => {
              if (response.data.data.length != 0) {
                vm.getResult(response.data.data, response.data.count)
              }
            })
          } catch (e) {
            console.log(e)
          }
        }
      }, 1000)
    },
    getResult(value, totalItem) {
      this.offset = this.offset + 100

      // new
      value.forEach((items, index) => {
        if (
          (items.idSchema == '205') |
          (items.idSchema == '207') |
          (items.idSchema == '209')
        ) {
          this.vodArr.push(items)
        } else if (items.idSchema == '203') {
          this.podcastArr.push(items)
        }

        if (index == value.length - 1) {
          this.searchRecord()
        }
      })

      var store = []
      var img_link
      // value.forEach((item, index) => {
      //   if (
      //     (item.idSchema == '202') |
      //     (item.idSchema == '203') |
      //     (item.idSchema == '205') |
      //     (item.idSchema == '207') |
      //     (item.idSchema == '209')
      //   ) {
      //     var idSchema = item.idSchema
      //     var id = item.id
      //     var title = item.data.title
      //     img_link = this.imgFiltering(item)

      //     var link
      //     if (idSchema == '202') {
      //       //radio
      //       link = '/radio/' + item.id
      //     } else if (idSchema == '203') {
      //       //pod
      //       link = '/podcastplayer?id=' + item.id
      //     } else if (idSchema == '204') {
      //       //pod episode
      //       link = '/podcastplayer?id=' + item.id
      //     } else if (item.idSchema == '205' || item.idSchema == '206') {
      //       //vod
      //       link =
      //         '/play?scheme=' +
      //         item.idSchema +
      //         '&p_type=true&id=' +
      //         item.id +
      //         '&eps_id='
      //     } else if (item.idSchema == '205') {
      //       //vod
      //       link =
      //         '/play?scheme=' +
      //         item.idSchema +
      //         '&p_type=true&id=' +
      //         item.id +
      //         '&eps_id='
      //     } else if (item.idSchema == '207') {
      //       //news
      //       link =
      //         '/play?scheme=' +
      //         item.idSchema +
      //         '&p_type=true&id=' +
      //         item.id +
      //         '&eps_id='
      //     } else if (item.idSchema == '208') {
      //       //vod
      //       link =
      //         '/play?scheme=' +
      //         item.idSchema +
      //         '&p_type=false&id=' +
      //         item.id +
      //         '&eps_id='
      //     } else if (item.idSchema == '209') {
      //       //news
      //       idSchema = '209'
      //       // console.log(JSON.stringify(item, null, 2));
      //       link = '/play?scheme=209&p_type=false&id=' + item.id + '&eps_id='
      //     }

      //     this.searchArr.push({
      //       idSchema: idSchema,
      //       id: id,
      //       title: title,
      //       path: link,
      //       img_url: img_link
      //     })
      //   }

      //   if (index == value.length - 1) {
      //     if (this.offset <= totalItem) {
      //       this.searchRecord()
      //     }
      //   }
      // })
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

    handleResize() {
      this.window.height = window.innerHeight
      var minHeight = this.window.height - 57 + 'px'
      Vue.set(this.epsColStyles, 'min-height', minHeight)
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.pt-livetv {
  padding: 90px 0 0;
  min-height: 80vh;
}
.breadCrumbsWrapper {
  padding: 30px;
}
.rtblogo {
  width: 120px;
}
.searchinputstyle {
  background: #313131;
  padding: 18px;
  border-radius: 4px;
}
.searchicon {
  width: 10%;
  padding: 0 10px;
}
.borderside {
  width: 2%;
}
.borderside span {
  color: #cccccc;
  font-size: 35px;
  font-weight: 500;
}
.inputbox {
  width: 80%;
}
.closebutton {
  width: 10%;
  cursor: pointer;
}
.closeicon {
  font-family: Sf-ui-medium;
  font-size: 16px;
  color: #fab900;
}
.close_text {
  font-family: Sf-ui-medium;
  font-size: 16px;
  color: #cccccc;
  margin-left: 10px;
}
input {
  background: #313131;
  border: none;
  color: #cccccc;
  height: 100%;
  outline: none;
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
.type-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.19;
  text-align: left;
}
.text-yellow {
  color: #facb43;
}
</style>
