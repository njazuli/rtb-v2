<template>
  <!-- <div v-if="showModal">
    <div id="modal" class="modal-mask" transition="modal">
      <div class="modal-container">
        <div style="position:relative;">
          <div
            style="position:absolute;top: -35px;right: -25px;cursor:pointer;"
            @click="hide()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f1c40f"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>

          <div class="modal-body">
            <div class="fullwidth">
              <div class="fullwidth">
                <div class="fullwidth my-2">
                  <img
                    src="../../assets/banner/app_promo_banner.jpg"
                    class="fullwidth"
                  />
                </div>
                <div
                  class="fullwidth d-flex flex-column justify-content-center"
                > -->
                  <!-- <p class="text-red text-bolder mb-1 main_title">
                    MAKLUMAN <br> GANGGUAN PERKHIDMATAN SIARAN RTBGo
                  </p>
                  <p class="announcement">
Siaran RTBGo akan mengalami gangguan pada <span class="text-bolder"><strong>Khamis, 6 Ogos 2020</strong></span> bermula jam <span class="text-bolder"><strong> 11.00 malam</strong></span>  sehingga kerja-kerja pemeliharaan selesai dilaksanakan. RTB ingin memohon maaf di atas segala kesulitan.
                  </p> -->
                  <!-- <a
                    href="https://www.surveymonkey.com/r/rtbgo"
                    target="_blank"
                    class="modal-default-button"
                  >-->
                  <!-- <a
                    href="https://www.surveymonkey.com/r/audiens2020"
                    target="_blank"
                    class="modal-default-button"
                    @click="hide()"
                  >
                    <span>Click Here</span>
                  </a> -->
                <!-- </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>-->
    <dfp-for-popup
        path="/22163595876/RTBGo_Interstitial_Web"
        :size="[1, 1]"
        id="RTBGo_Interstitial_Web"
        style="margin:0 auto;"
        v-if="showModal"
      />
</template>

<script>
/* eslint-disable */
// import PopupInterstitial from "../ads/popupInterstitial";
export default {
  data() {
    return {
      showModal: false,
      formstate: {},
      model: {
        name: "",
        email: "",
        comments: "",
      },
    };
  },
  components: {
    // popupInterstitial: PopupInterstitial
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
  },
  mounted(){
    this.$watch(
      "$refs.popupVisible.style",
      (new_value, old_value) => (console.log('changed'))
    );
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #f1c40f;
}
.text-yellow {
  color: #f1c40f;
}
.text-black {
  color: black;
}
.text-red {
  color: red;
}
.text-bolder {
  font-weight: 900;
}
.main_title {
  font-size: 26px;
}
.modal-body {
  margin: 10px 0 0px;
  padding: 10px 0px;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
  font-size: 16px;
  color: black;
  text-align: left;
}

.form-label > .form-control {
  margin-top: 0.5em;
}
.form-group label {
  text-align: left;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.modal-default-button {
  background: #f1c40f;
  color: white;
  border-radius: 4px;
  padding: 10px 25px;
  border: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
}
.modal-default-button span {
  font-size: 16px;
}
.required-field > label::after {
  content: "*";
  color: red;
  margin-left: 0.25rem;
}
.error {
  color: red;
}
.success {
  color: green;
}
.fullwidth {
  width: 100%;
}
.announcement {
  color: black;
  font-size: 16px;
  font-weight: 500;
}
.bolder {
  font-weight: 900;
}
@media screen and (max-width: 768px) {
  .modal-container {
    width: 90%;
    left: 50%;
  }
  .main_title {
    font-size: 18px;
  }
  .announcement {
    font-size: 13px;
  }
  .modal-default-button {
    padding: 8px 20px;
  }
  .modal-default-button span {
    font-size: 14px;
  }
}
</style>
