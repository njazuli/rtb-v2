<template>
  <div class="w-100 d-flex flex-row my-4">
    <div class="container-fluid my-3">
      <div class="row mr-0 category-content" id="categorycarousel">
        <div class="owl-carousel owl-theme" :id="'categoryCarousel'">
          <div
            class="item"
            v-for="(item_cat, index) in category"
            :key="'cat  - ' + index"
          >
            <div
              class="item-cat cursor-pointer"
              @click="goTo(item_cat.link)"
              :class="item_cat.bg_color"
            >
              <span>{{ item_cat.name }}</span>
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
      category: [],
      colors: [
        'yellowbg',
        'redbg',
        'orangebg',
        'bluebg',
        'greenbg',
        'purplebg',
        'darkyellowbg',
        'darkredbg'
      ]
    }
  },
  props: ['obj'],
  methods: {
    initializeContentForStart() {
      var vm = this
      var catArray = vm.obj

      catArray.forEach((items, index) => {
        var link, random_color

        // const random_color = Math.floor(Math.random() * vm.colors.length)
        vm.colors.forEach((color, idx) => {
          if (index == idx) {
            random_color = color
          } else if (index > vm.colors.length) {
            random_color = vm.colors[index - 7]
          }
        })

        link =
          '/viewall?cat=' +
          vm.convertStringToLower(items.replace(/\s/g, '')) +
          '&contenttype=vod'
        vm.category.push({
          name: items,
          link: link,
          bg_color: random_color
        })

        if (index <= catArray.length - 1) {
          setTimeout(
            function() {
              Vue.nextTick(
                function() {
                  vm.installOwlCarousel('#categoryCarousel')
                }.bind(vm)
              )
            }.bind(this),
            600
          )
        }
      })

      // console.log(JSON.stringify(this.category, null, 2))
    },
    convertStringToLower(items) {
      var strings
      strings = items.toLowerCase()
      return strings
    },
    goTo(link) {
      this.$router.push(link)
    },
    installOwlCarousel: function(carousel) {
      $(carousel).owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
          '<span class="fa fa-chevron-left fa-lg"></span>',
          '<span class="fa fa-chevron-right fa-lg"></span>'
        ],
        onInitialize: function(event) {
          if ($('.owl-carousel .item').length <= 1) {
            loop = false
          }
        },
        responsive: {
          0: {
            items: 3,
            nav: false,
            margin: 10,
            stagePadding: 14
          },
          600: {
            items: 5,
            nav: true,
            margin: 12,
            stagePadding: 20
          },
          992: {
            items: 7,
            stagePadding: 14,
            loop: false,
            margin: 14
          }
        }
      })
    }
  },
  beforeMount() {
    this.initializeContentForStart()
  }
}
</script>

<style scoped>
.item {
  overflow: hidden;
}
.item-cat {
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
}
.item-cat span {
  position: absolute;
  height: 100%;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 22px;
  font-weight: bold;
  line-height: 1.18;
  display: flex;
  align-items: center;
}
.yellowbg {
  background-image: linear-gradient(316deg, #fdd935 99%, #7f6d1b);
}
.redbg {
  background-image: linear-gradient(314deg, #fe4a49, #720616 2%);
}
.orangebg {
  background-image: linear-gradient(316deg, #fb9039 100%, #7e481d 2%);
}
.bluebg {
  background-image: linear-gradient(315deg, #487afa 98%, #243d7d 2%);
}
.greenbg {
  background-image: linear-gradient(315deg, #1aaf9d, #126057);
}
.purplebg {
  background-image: linear-gradient(315deg, #9e15bf, #4f0b60);
}
.darkyellowbg {
  background-image: linear-gradient(315deg, #fab92b, #7d5d16);
}
.darkredbg {
  background-image: linear-gradient(to bottom, #fe4a49, #7f2525);
}
@media only screen and (max-width: 992px) {
  .item-cat span {
    font-size: 16px;
  }
}
@media only screen and (max-width: 768px) {
  .item-cat span {
    font-size: 14px;
  }
}
@media only screen and (max-width: 480px) {
  .item-cat span {
    font-size: 12px;
  }
}
</style>

<style>
#categorycarousel .owl-theme .owl-stage-outer {
  overflow: hidden;
}

@media only screen and (min-width: 992px) {
  #categorycarousel .owl-theme .owl-stage-outer:hover {
    overflow: unset;
  }

  #categorycarousel .owl-theme {
    height: 200px;
  }
}

#categorycarousel .owl-prev,
#categorycarousel .owl-next {
  max-height: 100px;
  top: 30px !important;
  width: 40px;
  position: absolute;
}

#categorycarousel .owl-prev,
#categorycarousel .owl-next {
  width: 50px !important;
  height: 50px !important;
}

#categorycarousel .owl-prev span,
.owl-next span {
  color: #fab900 !important;
}

#categorycarousel .owl-prev {
  left: -14px !important;
  background-image: linear-gradient(to right, #000000, rgba(0, 0, 0, 0));
}

#categorycarousel .owl-next {
  right: -14px !important;
  background-image: linear-gradient(to left, #000000, rgba(0, 0, 0, 0));
}

button:focus {
  outline: unset !important;
}

@media only screen and (max-width: 992px) {
  #categorycarousel .owl-prev,
  #categorycarousel .owl-next {
    top: 50px !important;
  }

  #categorycarousel .owl-prev,
  #categorycarousel .owl-next {
    width: 40px !important;
    height: 40px !important;
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  #categorycarousel .owl-prev,
  #categorycarousel .owl-next {
    top: 40px !important;
  }
}
@media only screen and (max-width: 600px) {
  #categorycarousel .owl-prev,
  #categorycarousel .owl-next {
    top: 32% !important;
  }
}
@media only screen and (max-width: 480px) {
  #categorycarousel .owl-prev,
  #categorycarousel .owl-next {
    top: 25% !important;
  }
}
</style>
