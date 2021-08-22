<template>
  <div class="main-item-wrapper d-flex flex-column cursor-pointer">
    <div class="item_img" @click="mobile ? goTo(link) : ''">
      <img v-bind:src="image" @error="imageLoadError($event)" />
      <div class="latest-tag" v-if="latestTag">
        <span class="latest-text">NEW</span>
      </div>
    </div>
    <p class="main-title text-left mb-1">
      {{ truncateString(title, 70) }}
    </p>

    <div class="overlay">
      <p v-if="category" class="category-title text-left mb-1 p-0">
        {{ truncateString(category, 70) }}
      </p>
      <p v-if="description" class="mb-3 long-title text-left">
        {{ truncateString(description, 70) }}
      </p>
      <div class="w-100 d-flex justify-content-between flex-row">
        <div class="custom-btn" @click="goTo(link)">
          <div
            class="w-100 d-flex flex-row align-items-center justify-content-center"
          >
            <img src="@/assets/icon/play-icon.svg" class="btn-icon" />
            <span class="ml-1"> Play now</span>
          </div>
        </div>
        <div class="share-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import noimage from '../../assets/noimage.png'
export default {
  name: 'card-comp',
  props: ['image', 'latestTag', 'title', 'description', 'link', 'category'],
  data: function() {
    return {
      mobile: false,
      window: {
        width: 0
      }
    }
  },
  methods: {
    imageLoadError(event) {
      event.target.src = noimage
    },
    goTo(link) {
      this.$router.push(link)
    },

    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
    handleResizeforCard() {
      this.window.width = window.innerWidth

      if (this.window.width >= 992) {
        this.mobile = false
      } else {
        this.mobile = true
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResizeforCard)
    this.handleResizeforCard()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResizeforCard)
  }
}
</script>

<style scoped>
.item_img {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%;
  z-index: 1;
}
.item_img img {
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
.main-item-wrapper .overlay {
  display: none;
}

.latest-tag {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 3px 5px;
  background: #fab92b;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.latest-text {
  color: #292929;
  font-weight: bold;
  font-size: 11px;
  line-height: 1.14;
  text-align: left;
  color: #292929;
}
.main-title {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
}
.category-title {
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  color: #fab900;
}
.long-title {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.17;
  color: #ffffff;
}
.custom-btn {
  background: #fab92b;
  border: none;
  border-radius: 4px;
  color: #000000;
  font-size: 10px;
  line-height: 16px;
  padding: 2px 6px;
  max-width: 105px;
}
.btn-icon {
  width: 10px !important;
}
.main-item-wrapper {
  z-index: 1;
}
@media only screen and (min-width: 992px) {
  .main-item-wrapper:hover {
    transition: 0.3s all ease-in-out;
    transform: translateY(-8%) scale(1.1);
    z-index: 2000;
    background: #423c3c;
    max-width: 100%;
    max-height: 100%;
  }
  .main-item-wrapper:hover .item_img {
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }
  .main-item-wrapper:hover .main-title {
    padding: 4px 12px 0;
  }
  .main-item-wrapper:hover .overlay {
    display: block;
    padding: 4px 12px 16px;
  }
}
@media only screen and (max-width: 992px) {
  .custom-btn {
    max-width: 150px;
    font-size: 10px;
    padding: 4px 8px;
    height: 32px;
  }
  .btn-icon {
    width: 10px !important;
  }
}
@media only screen and (max-width: 480px) {
  .custom-btn {
    max-width: 100px;
    font-size: 10px;
    padding: 4px 0;
    height: 24px;
  }
  .btn-icon {
    width: 10px !important;
  }
}
</style>
