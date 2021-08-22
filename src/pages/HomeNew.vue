<template>
  <div class="mb_controller h-100 bg">
    <mastheadCarousel />

    <div class="position-relative main-list-wrapper">
      <div class="main-list-section d-flex justify-content-center flex-column">
        <homepageVodCarousel />
        <HomepageLatestPodcast />
        <HomepageSponsorRails />
        <homepageRadio />
        <homepageMoreVod />
        <homepagePodcast />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import mastheadCarousel from '@/components/carousel/homepageMainCarousel'
import HomepageVodCarousel from '../components/carousel/homepageVodCarousel.vue'
import HomepageRadio from '../components/carousel/homepageRadio.vue'
import HomepageMoreVod from '../components/carousel/homepageMoreVod.vue'
import HomepagePodcast from '../components/carousel/homepagePodcast.vue'
import HomepageSponsorRails from '../components/carousel/homepageSponsorRails.vue'
import HomepageLatestPodcast from '../components/carousel/homepageLatestPodcast.vue'
export default {
  data: function() {
    return {}
  },
  components: {
    mastheadCarousel: mastheadCarousel,
    homepageVodCarousel: HomepageVodCarousel,
    homepageRadio: HomepageRadio,
    homepageMoreVod: HomepageMoreVod,
    homepagePodcast: HomepagePodcast,
    HomepageSponsorRails,
    HomepageLatestPodcast
  },
  methods: {},
  created: function() {},
  mounted() {}
}
</script>

<style scoped>
.main-list-wrapper {
  display: flex;
  justify-content: center;
  max-width: 1440px;
  padding: 0 3%;
  margin-bottom: 8rem;
}
.main-list-section {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
@media only screen and (max-width: 992px) {
  .main-list-section {
    overflow: unset;
  }
}
@media only screen and (max-width: 768px) {
  .mb_controller {
    margin-top: 56px;
  }

  .main-list-wrapper {
    margin-top: 24px;
  }
  .main-list-section {
    margin: -4% auto 0;
  }
}
</style>
<style>
.mb_controller {
  overflow: hidden;
  max-width: 1440px;
  margin: 0 auto;
}
.bg {
  background: #191919;
}
#latestVODCarousel .owl-prev span,
.owl-next span {
  color: #fff;
}

#latestVODCarousel .owl-prev span:hover,
#latestVODCarousel .owl-next span:hover {
  color: #8199a3;
}

#latestVODCarousel .owl-prev,
#latestVODCarousel .owl-next {
  position: absolute;
  top: 0;
  height: 100%;
}

#latestVODCarousel .owl-prev {
  left: 7px;
}

#latestVODCarousel .owl-next {
  right: 7px;
}
</style>
