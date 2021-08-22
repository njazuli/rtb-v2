<template>
  <div class="main-item-wrapper d-flex flex-column cursor-pointer">
    <div class="item_img" @click="mobile ? goTo(link) : ''">
      <img
        v-bind:src="image"
        @error="imageLoadError($event)"
        class="podcast-img"
      />
      <div class="latest-tag" v-if="latestTag">
        <span class="latest-text">NEW</span>
      </div>
      <div class="overlay">
        <div class=" h-100 w-100 d-flex align-items-end pt-podcast">
          <div class="w-100 d-flex flex-column">
            <div>
              <p v-if="description" class="mb-3 long-title text-left">
                {{ truncateString(description, 80) }}
              </p>
            </div>

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
      </div>
    </div>
    <p class="main-title text-left mb-1">
      {{ title }}
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import noimage from '../../assets/podcast-no-image.png'
export default {
  name: 'card-comp',
  props: ['image', 'latestTag', 'title', 'description', 'link'],
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
  padding-top: 100%;
  z-index: 20;
}
.item_img .podcast-img {
  background: 100%;
  height: 100%;
  object-fit: cover;
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
.long-title {
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
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

@media only screen and (min-width: 992px) {
  .main-item-wrapper:hover {
    transition: 0.5s all ease-in-out;
    z-index: 2000;
    max-width: 100%;
    max-height: 100%;
  }
  :not(.main-item-wrapper:hover) {
    z-index: 100;
  }
  .main-item-wrapper:hover .item_img {
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }
  .main-item-wrapper:hover .overlay {
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1;
    padding: 4px 12px 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 16%,
      rgba(205, 205, 205, 0) 150%
    );
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
