<template>
  <footer class="footer page-footer font-small pt-3 pb-4 bg text-white px-4">
    <div class="container-fluid text-center">
      <div class="row align-items-center">
        <div class="col-12 col-lg-12 col-xl-5 order-2 order-xl-1">
          <div class="row d-flex align-items-center">
            <div class="col-12 col-xl-2 mb-3 mb-xl-0">
              <div class="w-100 d-flex justify-content-center">
                <div class="img-box" style>
                  <img src="../assets/footer/RTB.png" style="width:100%" />
                </div>
              </div>
            </div>
            <div class="col-12 col-xl-10">
              <div class="lists-of-links px-2">
                <div
                  class="w-100 mb-3 mb-sm-1 d-flex flex-column flex-sm-row justify-content-center"
                >
                  <a
                    href="http://www.rtb.gov.bn/Theme/Home.aspx"
                    target="_blank"
                    class="mx-md-2 cl4"
                  >
                    <span class="text_setting">Corporate Information</span>
                  </a>
                  <router-link :to="'/privacy'" class="mx-md-2 cl4">
                    <span class="text_setting">Privacy Policy</span>
                  </router-link>
                  <router-link :to="'/disclaimer'" class="mx-md-2 cl4">
                    <span class="text_setting">Disclaimer</span>
                  </router-link>
                  <router-link :to="'/terms'" class="mx-md-2 cl4">
                    <span class="text_setting">Terms of Use</span>
                  </router-link>
                </div>
                <div class="w-100">
                  <span class="w-100 text_copyright">
                    2021 © Copyright Radio Television Brunei. All Rights
                    Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-12 col-xl-7 order-1 order-xl-2">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-12 col-xl-5 mb-3 mb-xl-0">
              <div
                class="w-100 d-flex flex-row justify-content-center align-items-center"
              >
                <p class="mb-0 footer-text mr-1">Follow Us :</p>
                <div class="d-flex flex-row">
                  <a href="https://www.facebook.com/rtb.bn" class="social-link">
                    <img src="../assets/icon/Icon-Facebook.svg" />
                  </a>
                  <a
                    href="https://twitter.com/rtb_bn?lang=en"
                    class="social-link"
                  >
                    <img src="../assets/icon/Icon-twitter.svg" />
                  </a>
                  <a
                    href="https://www.instagram.com/rtb.bn/?hl=en"
                    class="social-link"
                  >
                    <img src="../assets/icon/Icon-insta.svg" />
                  </a>
                  <a href="https://www.youtube.com/rtbbn" class="social-link">
                    <img src="../assets/icon/Icon-youtube.svg" />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12 col-xl-7 mb-3 mb-xl-0">
              <div
                class="w-100 d-flex flex-row justify-content-center align-items-center"
              >
                <p class="mb-0 footer-text mr-1">Download App:</p>
                <div class="d-flex flex-row">
                  <a href="" class="appstore-link">
                    <img src="../assets/icon/ios.png" alt="" />
                  </a>
                  <a href="" class="appstore-link">
                    <img src="../assets/icon/android.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <formfeed ref="formfeed"></formfeed>
    <div
      @click="openModal"
      class="float"
      :style="{ bottom: lastScrollPosition }"
    >
      <img src="../assets/icon/feedback.svg" />
    </div>
    <div
      @click="goToTop"
      class="float-to-top"
      :style="{ bottom: lastScrollPosition }"
      v-if="displayToTop"
    >
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  </footer>
</template>

<script>
/* eslint-disable */
import formfeed from '../components/popup/form'
export default {
  data: function() {
    return {
      showModal: false,
      lastScrollPosition: 0,
      displayToTop: false
    }
  },
  components: { formfeed },
  methods: {
    openModal() {
      this.$refs.formfeed.show()
    }, //executing the show method of child
    homePage() {
      if (this.$route.path == '/' || this.$route.path == '/home') {
        return true
      } else {
        return false
      }
    },
    goToTop() {
      $('html, body').animate({ scrollTop: 0 }, 'fast')
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      const totalHeight = document.body.offsetHeight - 1000

      if (totalHeight == currentScrollPosition) {
        console.log('currentScrollPosition' + currentScrollPosition)
        console.log('total height' + document.body.offsetHeight)
        this.lastScrollPosition = '102px'
      } else {
        this.lastScrollPosition = '10px'
      }

      if (currentScrollPosition > 150) {
        this.displayToTop = true
      } else {
        this.displayToTop = false
      }

      // if (currentScrollPosition < 0) {
      //   return
      // }
      // if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 90) {
      //   return
      // }
      // this.showNavbar = currentScrollPosition < this.lastScrollPosition
      // this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.bg {
  background: #000000;
  z-index: 11;
}
svg {
  width: 100%;
}
h1 {
  color: #f1c40f;
  font-size: 14px;
}
ul {
  padding: 0;
  list-style-type: none;
}
.pl_10 {
  padding-left: 10px;
}
.img-box {
  width: 90px;
}
span {
  line-height: 1;
}
.border-top {
  border-top: 1px black solid;
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
.texth3 {
  font-family: Sf-ui-medium;
  font-size: 16px;
  color: #f1c40f;
}
.text_setting {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.43;
  color: #ffffff;
}
.text_copyright {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.43;
  color: #ffffff;
}
.hov a span:hover {
  color: #f1c40f;
  text-decoration: none;
}
.remove_m_p {
  padding: 0;
  margin: 0;
}
.cl4 {
  width: auto;
  text-decoration: none;
}
.lists-of-links {
  width: auto;
}
.justify-content-even {
  justify-content: space-evenly;
}
.footer-text {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.17;
  color: #fab900;
}
.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
}
.social-link svg {
  height: 19px;
}
.appstore-link {
  width: calc(100% / 2);
  max-width: 140px;
  margin: 0 4px;
}
.appstore-link img {
  width: 100%;
}
.float-to-top {
  position: fixed;
  right: 92px;
  bottom: 120px;
  background-color: #fbcb43;
  color: black;
  border-radius: 50%;
  text-align: center;
  z-index: 111111111;
  cursor: pointer;
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.float-to-top i {
  position: relative;
  font-size: 2rem;
}
.float {
  position: fixed;
  right: 21px;
  bottom: 120px;
  background-color: #fbcb43;
  color: black;
  border-radius: 50%;
  text-align: center;
  z-index: 111111112;
  cursor: pointer;
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.float svg {
  width: 25px;
}

.my-float {
  margin-top: 22px;
}
@media only screen and (max-width: 1200px) {
  .footer {
    position: relative;
  }
  .float {
    bottom: 4%;
  }
}
@media only screen and (max-width: 767px) {
  .footer {
    position: relative;
  }
  .img-div {
    width: 100%;
  }
  .cl4 {
    display: inline-block;
    width: 100%;
    text-decoration: none;
  }
  .footer-text {
    font-size: 12px;
  }
  .social-link {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .social-link img {
    height: 10px;
  }
  .appstore-link {
    max-width: 90px;
  }
  .float {
    right: 10px;
    width: 45px;
    height: 45px;
  }
  .float svg {
    width: 14px;
  }
  .float img {
    width: 24px;
  }
  .float-to-top {
    right: 60px;
    width: 45px;
    height: 45px;
  }
  .float-to-top i {
    font-size: 1.4rem;
  }
}
@media only screen and (min-width: 1440px) {
  .footer {
    /* position: fixed; */
  }
}
</style>
