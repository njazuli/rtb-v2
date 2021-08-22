<template>
  <div class="mb_controller bg">
    <div class="container-fluid px-0 min-height-for-section">
      <div class="w-100 d-flex flex-column align-content-between">
        <div>
          <div class="w-100 position-relative">
            <RadioMainCarousel />
            <div class="w-100 breadCrumbsWrapper">
              <BreadCrumbsHeader :mainTitle="'RADIO'" :currentPage="'Radio'" />
            </div>
          </div>
          <div class="row mt-2 mx-3">
            <div class="col-12">
              <HomepageRadio />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- ads -->
              <BillboardBannerBottom v-if="desktop"></BillboardBannerBottom>
              <MrecBannerBottom v-if="mobile"></MrecBannerBottom>
            </div>
          </div>
        </div>
        <div>
          <div class="w-100 player-position mt-4">
            <div class="playerWrapper w-100">
              <div class="playerAbsoluteDiv">
                <RadioPlayer :id="currentid" :type="'audio'" />
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
import RadioMainCarousel from '@/components/carousel/radio/radioMainCarousel'
import HomepageRadio from '@/components/carousel/homepageRadio.vue'
import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
import RadioPlayer from '@/components/players/radioPlayer.vue'
import BillboardBannerBottom from '../components/ads/billboardBannerBottom'
import MrecBannerBottom from '../components/ads/mrecBannerBottom'
import axios from 'axios'
export default {
  components: {
    RadioMainCarousel,
    HomepageRadio,
    BreadCrumbsHeader,
    RadioPlayer,
    BillboardBannerBottom,
    MrecBannerBottom
  },
  data: function() {
    return {
      id: this.$route.params.id,
      currentid: 0,
      radio: [],
      tablet: false,
      mobile: false,
      desktop: false
    }
  },
  beforeMount() {
    this.initializeContentForStart()
  },
  mounted() {
    this.deviceCheck()
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
    filterOtherFolderData(obj) {
      this.radio.push(obj)
      this.currentid = obj[0].id
    },
    async getRadioData() {
      try {
        axios
          .get(`https://rtb.glueapi.io/v1/content?idSchema=202&format=json`)
          .then(response => {
            this.filterOtherFolderData(response.data.data)
          })
      } catch (e) {
        console.log(e)
      }
    },
    initializeContentForStart() {
      if (this.id) {
        setTimeout(
          function() {
            this.currentid = this.id
            console.log('inhere' + this.currentid)
          }.bind(this),
          400
        )
      } else {
        this.getRadioData()
      }
      //get id from param
      //no param,thus initialize first item in radio list
    }
  }
}
</script>

<style scoped>
.breadCrumbsWrapper {
  position: absolute;
  top: 88px;
  z-index: 1;
}
.playerWrapper {
  height: 52px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.playerAbsoluteDiv {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .breadCrumbsWrapper {
    top: 10px;
  }
}
</style>
