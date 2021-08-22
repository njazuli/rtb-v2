<template>
  <div v-if="showModal">
    <div id="modal" class="modal-mask" transition="modal">
      <div class="modal-container">
        <div style="position:relative;">
          <div class="close_icon" @click="hide()">
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
          <div class="modal-header text-center">
            <h3>Share this video</h3>
          </div>
          <div class="modal-body">
            <social-sharing
              :url="url"
              :title="title"
              quote="RTBGO"
              hashtags="RTBGO"
              twitter-user="RTBGO"
              inline-template
            >
              <div class="share_div">
                <div
                  style="width:25%;display:inline-block;overflow:auto:float:left"
                  class="share_small_div"
                >
                  <network network="email">
                    <div
                      style="margin: 0 auto;width:50px;height:50px;padding:5px;background:white;border:1px solid #cccccc;border-radius:50%;"
                    >
                      <img src="../../assets/shareicon/email.png" style="width:100%;" />
                    </div>
                    <div style="width:100%;text-align:center;">
                      <span style="font-size:13px;text-align:center:width:100%;color:black;">Email</span>
                    </div>
                  </network>
                </div>

                <div
                  style="width:25%;display:inline-block;overflow:auto:float:left"
                  class="share_small_div"
                >
                  <network network="facebook">
                    <div
                      style="margin: 0 auto;width:50px;height:50px;padding:5px;background:white;border:1px solid #cccccc;border-radius:50%;"
                    >
                      <img src="../../assets/shareicon/fb.png" style="width:100%;" />
                    </div>
                    <div style="width:100%;text-align:center;">
                      <span
                        style="font-size:13px;text-align:center:width:100%;color:black;"
                      >Facebook</span>
                    </div>
                  </network>
                </div>

                <div
                  style="width:25%;display:inline-block;overflow:auto:float:left"
                  class="share_small_div"
                >
                  <network network="twitter">
                    <div
                      style="margin: 0 auto;width:50px;height:50px;padding:5px;background:white;border:1px solid #cccccc;border-radius:50%;"
                    >
                      <img src="../../assets/shareicon/twitter.png" style="width:100%;" />
                    </div>
                    <div style="width:100%;text-align:center;">
                      <span style="font-size:13px;text-align:center:width:100%;color:black;">Twitter</span>
                    </div>
                  </network>
                </div>

                <div
                  style="width:25%;display:inline-block;overflow:auto:float:left"
                  class="share_small_div"
                >
                  <network network="whatsapp">
                    <div
                      style="margin: 0 auto;width:50px;height:50px;padding:5px;background:white;border:1px solid #cccccc;border-radius:50%;"
                    >
                      <img src="../../assets/shareicon/whatsapp.png" style="width:100%;" />
                    </div>
                    <div style="width:100%;text-align:center;">
                      <span
                        style="font-size:13px;text-align:center:width:100%;color:black;"
                      >Whatsapp</span>
                    </div>
                  </network>
                </div>
              </div>
            </social-sharing>
            <div style="width:100%;margin-top:25px;text-align: center;">
              <div class="container" style="margin:0 auto;">
                <input type="text" class="input-field" v-model="message" />
                <button type="button" class="btn" @click="doCopy">
                  <img style="width:30px;" src="../../assets/shareicon/copylink.png" />
                </button>
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
import { bus } from "../../main";
export default {
  data() {
    return {
      showModal: false,
      message: "",
      share: [],
      url: "",
      title: ""
    };
  },
  methods: {
    show() {
      this.showModal = true;
      console.log("in");
    },
    hide() {
      this.showModal = false;
    },
    doCopy: function() {
      this.$copyText(this.message).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          console.log(e);
        }
      );
    }
  },
  created() {
    bus.$on("shareVar", data => {
      this.share = data;
      this.url = data.url;
      this.title = data.title;
      this.message = data.url;
    });
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
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header {
  padding: 5px;
  margin: 5px 0;
}
.modal-header h3 {
  margin-top: 0;
  color: #f1c40f;
  padding: 0;
  text-align: center;
}
.text-yellow {
  color: #f1c40f;
}
.text-black {
  color: black;
}
.modal-body {
  margin: 5px 0 0px;
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

.close_icon {
  position: absolute;
  top: -40px;
  right: -40px;
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .modal-container {
    width: 97%;
    padding: 15px;
  }

  .modal-body {
    padding: 0;
  }

  .close_icon {
    position: absolute;
    top: -30px;
    right: -25px;
    cursor: pointer;
  }

  .container {
    padding: 0;
    margin: 0 0 15px;
  }
}

/* Input field that looks like a button */
.input-field {
  width: 80%;
  display: inline-block;
  color: black;
  text-align: center;
  background-color: #cccccc;
  padding: 10px;
  border: none;
  cursor: pointer;
  outline: none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.input-field:hover {
  background-color: gray;
}

.share_div {
  width: 100%;
  margin: 0 auto;
}
.share_small_div {
  width: 25%;
  display: inline-block;
  overflow: auto;
  float: left;
}

span {
  outline: none;
}
</style>