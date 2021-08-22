<template>
  <div class="m-width">
    <div class="w-100">
      <div class="item-bg-div position-relative radio-masthead-content">
        <div
          class="owl-carousel owl-theme carousel-position"
          id="radiomasthead"
        >
          <div class="item" v-for="item_radio in radio" :key="item_radio.id">
            <div
              class="w-100 d-flex justify-content-center align-items-center flex-column"
            >
              <div class="item-img-wrapper">
                <img
                  v-bind:src="getRadioImgForMasthead(item_radio.slug)"
                  @error="imageLoadError($event)"
                />
              </div>
              <div>
                <p class="item-title mb-1 mt-3">{{ item_radio.data.title }}</p>
                <p
                  class="item-desc mb-0"
                  v-html="
                    item_radio.data.description.replace(
                      /(?:\r\n|\r|\n|\n\n)/g,
                      '<br />'
                    )
                  "
                ></p>
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
import Vue from 'vue'
export default {
  data: function() {
    return {
      radio: []
    }
  },
  methods: {
    filterRadio() {
      var vm = this
      vm.radio = this.$store.state.radio.data
      var store = []
      vm.radio.forEach(item => {
        item['img_link'] = this.mastheadImgFiltering(item)
        store.push(item)
      })

      vm.radio = store

      Vue.nextTick(
        function() {
          vm.generateRadioMastheadOwlCarousel('#radiomasthead')
        }.bind(vm)
      )
    },
    imageLoadError(event) {
      event.target.src = noimage
    },
    generateRadioMastheadOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: false,
        nav: false,
        dots: true,
        center: true,
        responsiveClass: true,
        margin: 0,
        stagePadding: 0,
        navText: [
          '<div class="border-nav"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
          '<div class="border-nav"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'
        ],
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            this.loop = false
          }
        },
        responsive: {
          0: {
            items: 1,
            margin: 0,
            nav: false
          },
          768: {
            nav: true
          }
        }
      })
    }
  },
  created: function() {
    this.$store.dispatch('fetchRadio', { self: this })
  },
  mounted() {}
}
</script>

<style scoped>
.m-width {
  max-width: 1600px;
  margin: 0 auto;
  overflow-x: hidden;
}
.ml-header {
  margin-left: 10%;
}

.text-white {
  color: #e6e6e6;
}
.text-yellow {
  color: #facb43;
}
.item-bg-div {
  background: radial-gradient(
      circle,
      rgba(157, 157, 157, 0) 0%,
      rgba(0, 0, 0, 0.700717787114846) 54%
    ),
    url('../../../assets/radio/radio-bg.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
  padding-top: 40%;
  width: 100%;
  height: 500px;
  z-index: 1;
}
.carousel-position {
  position: absolute;
  bottom: 20%;
  right: 5%;
  max-width: 600px;
}
.carousel-position:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  filter: blur(45px);
  width: 350px;
  height: 205px;
  border-radius: 40%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}
.carousel-position .item {
  cursor: pointer;
  position: relative;
  max-width: 100%;
  z-index: -1;
}

.item-img-wrapper {
  max-width: 480px;
  position: relative;
  width: 100%;
}

.item-title {
  font-size: 23px;
  font-weight: bold;
  line-height: 1.14;
  color: #ffffff;
}

.item-desc {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.14;
  color: #ffffff;
}
@media screen and (max-width: 768px) {
  .item-bg-div {
    height: 400px;
  }
  .carousel-position {
    max-width: 100%;
    right: unset;
  }
}
</style>
<style>
.radio-masthead-content .owl-theme .owl-dots {
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
}
.radio-masthead-content .owl-theme .owl-dots .owl-dot span {
  width: 22px;
  height: 5px;
  margin: 5px;
  background: #869791;
}
.radio-masthead-content .owl-theme .owl-dots .owl-dot.active span,
.radio-masthead-content .owl-theme .owl-dots .owl-dot:hover span {
  background: #fab92b;
}
.radio-masthead-content .owl-theme .owl-prev,
.radio-masthead-content .owl-theme .owl-next {
  position: absolute;
  color: inherit;
  background: rgba(0, 0, 0, 0);
  border: none;
  z-index: 100;
  top: 50%;
  transform: translateY(-50%);
  border-radius: none;
  width: 100px;
  outline: none;
}
.radio-masthead-content .owl-theme .owl-prev .border-nav,
.radio-masthead-content .owl-theme .owl-next .border-nav {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff;
  border-radius: 50%;
}
.radio-masthead-content .owl-theme .owl-prev .border-nav i {
  font-size: 2rem;
  color: #fab900;
  padding: 0 6px 0 4px;
}
.radio-masthead-content .owl-theme .owl-next .border-nav i {
  font-size: 2rem;
  color: #fab900;
  padding: 0 4px 0 8px;
}
.radio-masthead-content .owl-theme .owl-prev {
  left: 0;
  display: flex;
  justify-content: center;
}
.radio-masthead-content .owl-theme .owl-next {
  right: 0;
  display: flex;
  justify-content: center;
}
.radio-masthead-content .owl-theme .owl-nav [class*='owl-']:hover {
  background: unset !important;
}

@media screen and (max-width: 768px) {
  .radio-masthead-content .owl-theme .owl-dots {
    bottom: -30%;
  }
  .radio-masthead-content .owl-theme .owl-dots .owl-dot span {
    width: 16px;
    height: 3px;
    margin: 3px;
  }
}
</style>
