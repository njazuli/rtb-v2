<template>
  <div class="header-position bg" :class="{ 'navbar--hidden': !showNavbar }">
    <div class="container-fluid p-0">
      <nav class="navbar navbar-expand-md navbar-dark stick_nav p-0">
        <div class="logo_div_wrapper">
          <router-link
            :to="'/'"
            exact
            style="width:100%;"
            class="d-flex justify-content-center align-items-center"
          >
            <img class="logo-img" src="../assets/top-menu/logo-rbh-go.png" />
          </router-link>
        </div>

        <button
          class="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div
            class="col-12 col-sm-12 col-md-9 d-flex justify-content-md-start justify-content-center"
          >
            <ul class="navbar-nav col-12">
              <li
                class="nav-item d-flex align-items-center my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/'">HOME</router-link>
              </li>
              <!-- <li
                class="nav-item d-flex align-items-center my-md-0 my-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/GoLIVE/'"
                  >GoLIVE</router-link
                >
              </li> -->
              <li
                class="nav-item d-flex align-items-center my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/live'">TV</router-link>
              </li>
              <!-- <li
                class="nav-item d-flex align-items-center flex-md-row flex-column my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <a
                  class="nav-link dropdown-toggle"
                  style="width:100%;"
                  href="#"
                  id="navbarDropdownRadio"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >RADIO</a
                >
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownRadio"
                  style="background: #292929;"
                >
                  <div class="container">
                    <div class="row d-flex justify-content-center">
                      <div class="col-12">
                        <div
                          style="width:100%"
                          class="d-flex flex-sm-row flex-column flex-md-wrap justify-content-center"
                        >
                          <div
                            v-for="item in filterItem"
                            :key="item.id"
                            class="menu_hov_rad d-sm-block d-none"
                          >
                            <router-link
                              style="border:none;"
                              :to="'/radio/' + item.id"
                            >
                              <img v-bind:src="item.image" width="100%;" />
                            </router-link>
                          </div>

                          <div
                            v-for="item in filterItem"
                            :key="item.id + 'sm'"
                            class="menu_hov_rad d-block d-sm-none"
                          >
                            <router-link
                              style="border:none;"
                              class="d-flex justify-content-center"
                              :to="'/radio/' + item.id"
                            >
                              <span class="text-center">
                                {{ item.channel_title }}
                              </span>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li> -->
              <li
                class="nav-item d-flex align-items-center my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/radio_new/'"
                  >RADIO</router-link
                >
              </li>
              <li
                class="nav-item d-flex align-items-center my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/vod/'">VOD</router-link>
              </li>
              <li
                class="nav-item d-flex align-items-center my-md-0 mt-3"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link" :to="'/podcast/'"
                  >PODCAST</router-link
                >
              </li>
            </ul>
          </div>
          <div
            class="col-12 col-sm-12 col-md-3 my-4 my-md-0 pl-0 pl-md-2 d-flex justify-content-md-end justify-content-center"
            style="height:100%;"
          >
            <div class="d-flex justify-content-center align-items-center">
              <div
                class="search-icon d-flex align-items-center d-flex align-items-center"
                style="padding:0px;margin:0px 4px;"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link
                  class="icon"
                  :to="'/search'"
                  :class="{ 'none-active': activeid == '/search' }"
                  exact
                >
                  <img src="../assets/top-menu/search-ico.png" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// is-active
import RadioService from '../static/json_dummy/radio.json'
export default {
  data: function() {
    return {
      activeid: '',
      filterItem: RadioService.response,
      tv: [],
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  created: function() {
    this.setActiveId()
    this.$store.dispatch('fetchLiveTV', { self: this })
  },
  methods: {
    setActiveId() {
      this.activeid = this.$route.name
    },
    filterLiveTv() {
      var vm = this
      vm.tv = this.$store.state.live_tv.data
      var store = []
      var imgurl
      vm.tv.forEach(item => {
        item['img_link'] = this.imgFiltering(item)
        store.push(item)
      })

      vm.tv = store
    },
    imgFiltering(item) {
      var imgurl
      //check if
      var checkThumbnail =
        item.data && item.data.images && item.data.images.thumbnail
      var checkTitle = item.data && item.data.images && item.data.images.title

      if (checkThumbnail) {
        imgurl =
          'https://rtb-images.glueapi.io/200x0/' +
          item.data.images.thumbnail.path
      } else {
        if (checkTitle) {
          imgurl =
            'https://rtb-images.glueapi.io/200x0/' + item.data.images.title.path
        } else {
          imgurl =
            'https://cdn-rtb.glueapi.io/v1/content/' +
            item.id +
            '/image/200x0/images.title'
        }
      }

      return imgurl
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 90) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    this.setActiveId()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.header-position {
  position: fixed;
  width: 100%;
  z-index: 100 !important;
}
.bg {
  background: rgba(0, 0, 0, 0.4);
}
.bg:hover {
  background: rgba(0, 0, 0, 0.9);
  transition: 0.5s all ease-in-out;
}
a {
  color: #cccccc;
  font-family: Sf-ui-medium;
  font-size: 15px;
}
.nav_div {
  background: rgba(0, 0, 0, 0.3);
}
.nav-item {
  width: 90px;
  /* margin-right: 24px; */
  color: #cccccc;
  font-weight: 300;
}
.nav-item a {
  width: 100%;
}
.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
.collapse.in {
  display: block;
}
.nav_div {
  background: #191919;
}
svg {
  width: 100%;
}
.yellow_border_bottom {
  border-bottom: 1px solid #fab900;
}

.navbar-expand-lg .navbar-nav .nav-link {
  padding: 0;
}
.navbar-dark .navbar-nav .nav-link {
  color: #cccccc;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  padding: 25px 0;
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: #fab900;
}

.navbar-dark .navbar-nav .router-link-exact-active {
  color: #fab900;
  border-bottom: solid 2px #fab900;
}
.is-active {
  border-bottom: solid 2px #fab900;
}
.none-active {
  border: none;
  color: #fab900;
}
.navbar .navbar-toggler .icon-bar {
  color: #fab900 !important;
}
.custom-toggler.navbar-toggler {
  border-color: rgb(250, 185, 0);
  padding: 0.15rem 0.55rem;
  font-size: 1rem;
}
.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(250,185,0, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
.icon {
  width: 30px;
}
.icon img {
  width: 100%;
}
.menu_hov {
  width: 50%;
  padding: 5px;
}
.menu_hov_rad {
  width: 20%;
  padding: 5px;
}
.menu_hov_rad:hover {
  border: 2px solid rgba(250, 185, 0, 0.8);
  margin-left: -1px;
}
.menu_hov:hover {
  border: 2px solid rgba(250, 185, 0, 0.8);
  margin-left: -1px;
}
.logo_div_wrapper {
  width: 110px;
  margin: 0 10px 0;
}
.logo-img {
  width: 100px;
}
.search-icon {
  width: 21px;
}
@media only screen and (max-width: 990px) {
  .nav-item {
    width: 70px;
  }
  .logo_div_wrapper {
    width: 80px;
    margin: 0 5px 0;
  }
  .logo-img {
    width: 70px;
  }
}
@media only screen and (max-width: 767px) {
  .header-position {
    top: 0;
  }
  .bg {
    background: rgba(0, 0, 0, 1);
  }
  .nav-item {
    width: 100%;
  }
  .stick_nav {
    padding: 8px 16px !important;
    position: relative;
    top: unset;
    right: unset;
    left: unset;
  }
  .yellow_border_bottom_m {
    border-bottom: 1px solid #fab900;
  }
  .menu_hov {
    width: 100%;
    padding: 10px;
  }
  .menu_hov_rad {
    width: 100%;
    padding: 10px;
  }
  .dropdown-menu {
    width: 100%;
  }
  .logo-img {
    width: 100%;
  }
  .collapse {
    min-height: 100vh;
  }
  .navbar-dark .navbar-nav .nav-link {
    font-size: 14px;
    padding: 16px 0;
  }
}
@media only screen and (max-width: 480px) {
  .menu_hov:hover {
    border: 2px solid rgba(250, 185, 0, 0.8);
    margin-left: -1px;
    text-decoration: none;
  }
  .stick_nav {
    padding: 8px !important;
    position: relative;
    top: unset;
    right: unset;
    left: unset;
  }
}
</style>
