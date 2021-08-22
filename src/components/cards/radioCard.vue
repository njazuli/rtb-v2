<template>
  <router-link :to="{ path: '/radio_new/' + id }">
    <div class="main-item-wrapper d-flex flex-column cursor-pointer">
      <div class="item_img">
        <img
          v-bind:src="image"
          @error="imageLoadError($event)"
          class="img-class"
        />
        <div class="live-tag">
          <div class="mr-1">
            <img src="@/assets/icon/live.png" class="live-tag-img" />
          </div>
          <div class="d-flex align-items-center">
            <span class="latest-text">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import noimage from '../../assets/noimage.png'
export default {
  name: 'radio-card-comp',
  props: ['image', 'id'],
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
    }
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
  z-index: 20;
}
.item_img .img-class {
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

.live-tag {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 3px 5px;
  background: #ff0000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
}
.live-tag .live-tag-img {
  width: 16px;
}
.latest-text {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.14;
  text-align: left;
  color: #ffffff;
}
.main-title {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
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
@media only screen and (min-width: 992px) {
  .main-item-wrapper:hover {
    transition: 0.5s all ease-in-out;
    transform: translateY(-10%) scale(1.1);
    z-index: 2000;
    background: #423c3c;
    max-width: 100%;
    max-height: 100%;
  }
  :not(.main-item-wrapper:hover) {
    z-index: 100;
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
