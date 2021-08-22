<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader
              :mainTitle="categoryTitle.toUpperCase()"
              :currentPage="titlesofview.toUpperCase()"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- <div class="row pt-3 pb-2" style="background:#313131;">
        <div class="col-12 text-left px-4">
          <div class="fullwidth d-flex flex-row justify-content-between">
            <span class="carousel_title" v-if="categoryTitle == 'nostalgic'">
              NOSTALGIA
            </span>
            <span class="carousel_title" v-else>
              {{ categoryTitle.toUpperCase() }}
            </span>
            <div @click="goTo(backlink)">
              <span class="carousel_more">BACK</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row pb-2">
        <div class="col-12 mt-3">
          <div class="fullwidth d-flex flex-row flex-wrap">
            <div
              class="col-6 col-md-4 col-lg-3 my-4 px-2"
              v-for="item in vod_each"
              :key="item.id"
              @click="goTo(checkLink(item))"
            >
              <div v-if="titlesofview == 'vod'">
                <vod-card
                  :image="imgFiltering(item)"
                  :title="formatString(item.longTitle)"
                  :description="item.data.description"
                  :link="checkLink(item)"
                  :category="item.data.content_type[0].title.en_US"
                />
              </div>
              <div v-else-if="titlesofview == 'podcast'">
                <PodcastCard
                  :image="imgFiltering(item)"
                  :title="formatString(item.longTitle)"
                  :description="item.data.description"
                  :link="checkLink(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import noimage from '../assets/noimage.png'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
import PodcastCard from '@/components/cards/podcastCard.vue'
import vodCard from '@/components/cards/vodCard.vue'
import axios from 'axios'
export default {
  name: 'viewall',
  data: function() {
    return {
      vod: [],
      vod_each: [],
      news: [],
      specials: [],
      podcast: [],
      titlesofview: this.$route.query.contenttype,
      categoryTitle: this.$route.query.cat,
      backlink: '',
      offset: 0
    }
  },
  components: {
    BreadCrumbsHeader,
    PodcastCard,
    vodCard
  },
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
    initPage() {
      // console.log(this.titlesofview);
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
    convertStringToLower(items) {
      var strings
      strings = items.toLowerCase()
      return strings
    },
    assignItems(obj, totalItem) {
      this.offset = this.offset + 50
      obj.forEach((items, index) => {
        var content_type
        if (this.titlesofview == 'vod') {
          content_type = items.data.content_type
        } else if (this.titlesofview == 'podcast') {
          content_type = items.data.category
        } else if (this.titlesofview == 'news') {
          content_type = items.data.content_type
        }

        var categories = this.$route.query.cat
        if (content_type.length != 0) {
          content_type.forEach(items_cat => {
            if (
              categories == items_cat.title.en_US ||
              categories == this.convertStringToLower(items_cat.title.en_US) ||
              categories ==
                this.convertStringToLower(
                  items_cat.title.en_US.replace(/\s/g, '')
                )
            ) {
              this.vod_each.push(items)
            }
          })
        }

        if (index == obj.length - 1) {
          var idSchema = ''
          if (this.titlesofview == 'vod') {
            idSchema = '205,207,209'
          } else if (this.titlesofview == 'podcast') {
            idSchema = '203'
          } else if (this.titlesofview == 'news') {
            idSchema = '205,207,209'
          }

          if (this.offset < totalItem) {
            this.getItems(idSchema, this.offset)
          }
        }
      })
    },
    getItems(idSchema, offset) {
      var link
      if (this.$route.query.contenttype == 'vod') {
        link = `https://rtb.glueapi.io/v1/content?idSchemas=${idSchema}&offset=${offset}&limit=50&format=json`
      } else if (this.$route.query.contenttype == 'podcast') {
        link = `https://rtb.glueapi.io/v1/content?idSchema=${idSchema}&offset=${offset}&limit=50&format=json`
      }

      try {
        axios.get(link).then(response => {
          if (response.data.data.length != 0) {
            this.assignItems(response.data.data, response.data.count)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    initializeContentForStart() {
      //check type of view all either vod or podcast
      //check type of category
      //choose card either vod or podcast card
      var offset = 0
      if (this.$route.query.contenttype == 'podcast') {
        this.getItems('203', offset)
      } else {
        this.getItems('205,207,209', offset)
      }
    }
  },
  beforeMount() {
    this.initializeContentForStart()
  },
  mounted() {
    setTimeout(
      function() {
        // this.filterBasedOnCategory()
      }.bind(this),
      1200
    )
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
  padding: 40px 0px;
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
.carousel_more {
  font-family: Sf-ui-medium;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1px;
  text-align: left;
  color: #fab900;
  cursor: pointer;
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
.fullwidth {
  min-width: 100% !important;
}
.each_box {
  width: calc(100% / 5);
  border-radius: 2px;
  height: 145px;
  z-index: 1;
  margin-bottom: 90px;
}
.each_box:hover {
  z-index: 100;
}
@media screen and (max-width: 991px) {
  .remove_m_p {
    padding: 0;
    margin: 0;
  }
  .each_box {
    width: calc(100% / 2);
    border-radius: 2px;
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
