import Vue from 'vue'
import noimage from '../assets/noimage.png'
/* eslint-disable */
Vue.mixin({
  methods: {
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    imageLoadError(event) {
      event.target.src = noimage
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
    mastheadImgFiltering(item) {
      var imgurl
      //check if
      var checkThumbnail =
        item.data && item.data.images && item.data.images.thumbnail
      var checkTitle = item.data && item.data.images && item.data.images.title
      var checkImgFeature =
        item.data && item.data.images && item.data.images.feature

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/240x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/240x0/' + item.data.images.title.path
        } else {
          if (checkImgFeature) {
            imgurl =
              'https://rtb-images.glueapi.io/240x0/' +
              item.data.images.feature.path
          } else {
            imgurl =
              'https://cdn-rtb.glueapi.io/v1/content/' +
              item.id +
              '/image/240x0/images.title'
          }
        }
      }
      return imgurl
    },
    imgFiltering(item) {
      var imgurl
      //check if
      var checkThumbnail =
        item.data && item.data.images && item.data.images.thumbnail
      var checkTitle = item.data && item.data.images && item.data.images.title

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/300x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/300x0/' + item.data.images.title.path
        } else {
          imgurl =
            'https://cdn-rtb.glueapi.io/v1/content/' +
            item.id +
            '/image/300x0/images.title'
        }
      }

      return imgurl
    },
    getRadioImgForMasthead(title) {
      switch (title) {
        case 'pilihan':
          return '../assets/radio/Pilihan.png'
        case 'pelangi':
          return '../assets/radio/Pelangi.png'
        case 'nurislam':
          return '../assets/radio/NurIslam.png'
        case 'nasional':
          return '../assets/radio/Nasional.png'
        case 'harmoni':
          return '../assets/radio/Harmoni.png'
      }
    },
    initializePlayer(value, target, type) {
      console.log('value' + value)
      var gluePlayer = new GluePlyr()
      gluePlayer.setup(value, {
        apiPath: 'https://rtb.glueapi.io',
        target: target,
        poster:
          'https://rtb.glueapi.io/v1/content/' +
          value +
          '/image/1200x0/images.title?quality=100', //Replace with the id 413 with the id of the content
        site: 'RTBGo',
        type: type, // video or audio
        skin: 'title' // false or title (Tile Skin is used for creating player with title image
      })

      window.gluePlayer = gluePlayer

      this.currenturl = window.location.origin + '' + this.$route.path

      this.childDataLoaded = true
    },
    convertTimestamp(time) {
      var date = new Date(time)
      return date.getTime()
    },
    formatTimestamp(dt) {
      var result
      var t = new Date(dt)
      var dtplustwo =
        t.getFullYear() +
        '-' +
        (t.getMonth() + 1) +
        '-' +
        (t.getDate() + 2) +
        ' 00:00'
      dtplustwo = new Date(dtplustwo).getTime()
      // console.log(t);
      var today = new Date()
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate() +
        ' 00:00'

      var twodays =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        (today.getDate() + 2) +
        ' 00:00'
      var from = new Date(date).getTime() //today
      var twodaysafter = new Date(twodays).getTime() //twodaysfromtodaay
      if (dtplustwo >= from && dtplustwo <= twodaysafter) {
        result = true
      } else {
        result = false
      }

      return result
    },
    formatString(str) {
      var lower = str.toLowerCase()
      return lower
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  }
})
