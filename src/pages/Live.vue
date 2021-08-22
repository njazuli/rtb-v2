<template>
  <div class="mb_controller" v-bind:style="epsColStyles">
    <div class="bg p-0" style="width:100%;">
      <div class="col-md-12">
        <div class="row bg_header d-flex justify-content-center align-items-center">
          <div class="channel_logo">
            <img src="../assets/sukmaindera.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center align-items-center my-3">
        <div class="col-md-7">
          <div class="embed-responsive embed-responsive-16by9">
            <!-- <video-player
            class="embed-responsive-item"
            :options="playerOptions"
            @ready="playerReadied"
            ></video-player>-->
            <!-- <iframe
              src="https://rtb-player.glueapi.io/latest/h/2"
              class="embed-responsive-item"
              allowfullscreen
            ></iframe>-->
            <div id="vidBox" class="player embed-responsive-item" ref="vidBox"></div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center align-items-center mt-4 mb-2 pb-4">
        <div class="col-md-12">
          <div class="channel_logo_bottom d-inline-block align-middle">
            <img class src="https://rtb-images.glueapi.io/300x0/live/rtb-sukmaindera-title.png" />
          </div>
          <span class="d-inline-block align-middle np_bottom pl-3">NOW PLAYING</span>
        </div>
      </div>
      <div class="row d-flex justify-content-center mb-4 pb-2">
        <!-- <AddThis publicId="ra-5d92d889385b2fe2"  v-if="childDataLoaded"/> -->
        <div class="col-12 d-flex justify-content-center pb-4">
          <!-- <AddThis v-if="childDataLoaded"
            publicId="ra-5d92d889385b2fe2" 
            :data-url = this.$route.query.page
            data-title = "RTB Sukmaindera"
          />-->
          <div class="sharebtn" @click="openModal()">
            <img src="../assets/sharebtn.png" />
            <span>Share</span>
          </div>
          <social ref="social"></social>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
// custom skin css
// import '../customplayertheme.css';
import videojs from "video.js";
window.videojs = videojs;
import Vue from "vue";
import social from "../components/popup/sharepopup";
import { bus } from "../main";
require("../../node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.js");
export default {
  data: function() {
    return {
      eps_title: "",
      childDataLoaded: false,
      epsColStyles: {},
      window: {
        height: 0
      },
      playerOptions: {
        // videojs and plugin options
        autoplay: "play",
        responsive: true,
        aspectRatio: "16:9",
        sources: [
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://rtb-channel.glue.live/smil:rtb1/playlist.m3u8?DVR"
          }
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: "../assets/sukmaindera.png"
      },
      share: [],
      url: "",
      showModal: false
    };
  },
  components: {
    social
  },
  methods: {
    openModal() {
      this.share = {
        url: window.location.origin + this.$route.fullPath,
        title: "RTB Sukmaindera"
      };

      bus.$emit("shareVar", this.share);
      this.$refs.social.show();
    },
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    },
    initializecontentview() {
      var self = this;
      $.ajax({
        type: "POST",
        url: "https://rtb.glueapi.io/report/viewed",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          idContent: "2", // Content ID from content api response
          contentTitle: "RTB Sukmaindera", // Content Longtitle from content api response
          site: "RTBGo"
        }),
        dataType: "json",
        success: function(data) {
          console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg);
        }
      });
    },
    initializepageview() {
      var self = this;
      $.ajax({
        type: "POST",
        url: "https://rtb.glueapi.io/report/page-view",
        contentType: "application/json",
        data: JSON.stringify({
          href: this.$route.path,
          title: "live",
          site: "RTBGo"
        }),
        dataType: "json",
        success: function(data) {
          console.log(data);
        },
        failure: function(errMsg) {
          console.log(errMsg);
        }
      });
    },
    handleResize() {
      this.window.height = window.innerHeight;
      // console.log(this.window.height);
      var minHeight = this.window.height - 140 + "px";
      Vue.set(this.epsColStyles, "min-height", minHeight);
    },
    PlayerInit(value) {
      // console.log("in player init");
      var target = document.getElementById("vidBox");
      var gluePlayer = new GluePlyr();
      gluePlayer.setup(value, {
        apiPath: "https://rtb.glueapi.io",
        target: target,
        poster:
          "https://rtb.glueapi.io/v1/content/" +
          value +
          "/image/1200x0/images.title?quality=100", //Replace with the id 413 with the id of the content
        site: "RTBGo",
        type: "video", // video or audio
        skin: false // false or title (Tile Skin is used for creating player with title image
      });

      window.gluePlayer = gluePlayer;
      this.childDataLoaded = true;
    }
  },
  mounted() {
    setTimeout(
      function() {
        this.initializecontentview();
        this.initializepageview();
        this.PlayerInit("2");
      }.bind(this),
      900
    );
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style scoped>
.bg {
  background: #292929;
  height: auto !important; /* cross-browser */
  height: 100%; /* cross-browser */
  /* margin-bottom: 103px; */
}
.bg_header {
  background: url("../assets/headerbg.png");
  background-size: cover;
}
.channel_logo {
  width: 186px;
  height: auto;
  padding: 20px 0px;
}
.channel_logo img {
  width: 100%;
}

.channel_logo_bottom {
  width: 100px;
}
.channel_logo_bottom img {
  width: 100%;
}
.np_bottom {
  font-size: 22px;
  color: #fab900;
  font-weight: 300;
}

/* @media only screen and (max-width: 768px) {
  .bg {
    margin-bottom: 60px;
  }
} */
</style>
