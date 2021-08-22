<template>
    <div>
        <video-player class="embed-responsive-item" :options="playerOptions" @ready="playerReadied"></video-player>
    </div>
</template>
<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs
import videojs from "video.js";
window.videojs = videojs;

require("../../node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.js");
export default {
  data: function() {
    return {
      playerOptions: {
        // videojs and plugin options
        autoplay: "play",
        responsive: true,
        aspectRatio: '16:9',
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
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg"
      }
    };
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    }
  }
};
</script>
<style scoped>

</style>
