<template>
  <footer class="footer page-footer font-small pt-3 pt-md-1 bg text-white px-4">
    <div class="container-fluid text-center">
      <!-- <div class="row">
        <div class="col-md-12 mt-md-0 mt-2">
          <div>
            <div style="width:22px;margin: 0 5px;display: inline-block;">
              <a href="https://www.facebook.com/rtb.bn" style="width:100%;" target="_blank">
                <img src="../assets/fb_icon.png" style="width:100%;" />
              </a>
            </div>
            <div style="width:22px;margin: 0 5px;display: inline-block;">
              <a href="https://www.instagram.com/rtb.bn/?hl=en" style="width:100%;" target="_blank">
                <img src="../assets/insta_icon.png" style="width:100%;" />
              </a>
            </div>
            <div style="width:22px;margin: 0 5px;display: inline-block;">
              <a href="https://www.youtube.com/rtbbn" style="width:100%;" target="_blank">
                <img src="../assets/youtube_icon.png" style="width:100%;" />
              </a>
            </div>
          </div>
        </div>
      </div>-->
      <div class="row">
        <div class="col-12 mt-md-0 mb-md-0 mb-3">
          <div
            class="row d-md-flex justify-content-md-center align-items-center pb-2"
          >
            <div
              class="col-12 col-md-8 hov d-md-flex justify-content-md-center align-items-center"
            >
              <div
                class="img-div text-center d-md-inline-block d-flex justify-content-center mb-2 mb-md-0"
              >
                <div class="img-box" style>
                  <img src="../assets/footer/RTB.png" style="width:100%" />
                </div>
              </div>

              <div
                class="pl-md-4 d-inline-block"
                style="width:auto;display:inline-block;"
              >
                <div class style="width:100%">
                  <a
                    href="http://www.rtb.gov.bn/Theme/Home.aspx"
                    target="_blank"
                    class="mr-md-2 cl4"
                  >
                    <span class="text_setting">Corporate Information</span>
                  </a>
                  <router-link :to="'/privacy'" class="mr-md-2 cl4">
                    <span class="text_setting">Privacy Policy</span>
                  </router-link>
                  <router-link :to="'/disclaimer'" class="mr-md-2 cl4">
                    <span class="text_setting">Disclaimer</span>
                  </router-link>
                  <router-link :to="'/terms'" class="mr-md-2 cl4">
                    <span class="text_setting">Terms of Use</span>
                  </router-link>
                  <!-- <a class="mr-md-2 cl4" @click="openModal" style="cursor:pointer;">
                    <span class="text_setting">Feedback</span>
                  </a>-->
                </div>
                <div class style="width:100%">
                  <span style="width:100%;" class="text_copyright">
                    ©️ 2020 Radio Televisyen Brunei. All Rights Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="row d-flex justify-content-center pb-2">
            
          </div>-->
        </div>
      </div>
    </div>
    <formfeed ref="formfeed"></formfeed>
    <div @click="openModal" class="float">
      <img src="../assets/icon/feedback.svg" />
    </div>
  </footer>
</template>

<script>
/* eslint-disable */
import formfeed from '../components/popup/form'
export default {
  data: function() {
    return {
      showModal: false
    }
  },
  components: { formfeed },
  methods: {
    openModal() {
      this.$refs.formfeed.show()
    } //executing the show method of child
  }
}
</script>

<style scoped>
.bg {
  background: #191919;
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
  background: #191919;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.texth3 {
  font-family: Sf-ui-medium;
  font-size: 16px;
  color: #f1c40f;
}
.text_setting {
  line-height: 1.6;
  font-size: 13px;
  color: #cccccc;
  text-align: left;
}
.text_copyright {
  font-size: 14px;
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
  width: calc(100% / 5);
  text-decoration: none;
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
}
@media only screen and (min-width: 1440px) {
  .footer {
    position: fixed;
  }
}

.float {
  position: fixed;
  right: 21px;
  bottom: 10%;
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
.float svg {
  width: 25px;
}

.my-float {
  margin-top: 22px;
}
</style>
