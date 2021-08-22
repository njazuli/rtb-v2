<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader
              :mainTitle="'DISCLAIMER'"
              :currentPage="'DISCLAIMER'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mt-4 mx-3">
        <div class="col-12 text-left my-2 px-4">
          <p>
            All the information provided on this website is provided on an “as
            is” and “as available” basis and you agree that you use such
            information entirely at your own risk.
          </p>
          <p>
            The Government of His Majesty The Sultan and Yang Di-Pertuan of
            Brunei Darussalam (hereinafter referred to as “the Government”)
            gives no warranty and accepts no responsibility or liability for the
            accuracy or the completeness of the information and materials
            contained in this website. Under no circumstances will the
            Government be held responsible or liable in any way for any claims,
            damages, losses, expenses, costs or liabilities whatsoever
            (including, without limitation, any direct or indirect damages for
            loss of profits, business interruption or loss of information)
            resulting or arising directly or indirectly from your use of or
            inability to use this website or any websites linked to it, or from
            your reliance on the information and material on this website, even
            if the Government has been advised of the possibility of such
            damages in advance.
          </p>
          <p>
            This website also contains links to other internet sites. Such links
            are provided as an information service for the users of this
            website. As the Government has no control over third party sites,
            the user hereby acknowledges and agrees that Government is not held
            responsible or liable for any content or material on such sites. In
            providing such links,the Government does not in any way, expressly
            or implicitly, endorse the linked sites or resources or the
            respective contents thereof. The user further acknowledges and
            agrees that the Government shall not be responsible or liable,
            whether directly or indirectly, for any damages or loss caused or
            sustained by the user, in connection with any use or reliance on
            information or material obtained from third party sites.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// hls plugin for videojs6
// videojs

import BreadCrumbsHeader from '@/components/common/breadCrumbsHeader.vue'
export default {
  data: function() {
    return {}
  },
  components: {
    BreadCrumbsHeader
  }
}
</script>

<style scoped>
.pt-livetv {
  padding: 90px 0 0;
  min-height: 80vh;
}
.breadCrumbsWrapper {
  padding: 30px;
}

@media only screen and (max-width: 768px) {
  .pt-livetv {
    padding: 8px 0 0;
  }
  .breadCrumbsWrapper {
    padding: 16px;
  }
}
.bg {
  background: #292929;
  height: auto !important; /* cross-browser */
  height: 100%; /* cross-browser */
  /* margin-bottom: 120px; */
}
.bg_header {
  background: url('../assets/headerbg.png');
  background-size: cover;
}
.bg_text {
  font-family: Sf-ui-medium;
  font-size: 35px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 1.75px;
  text-align: center;
  color: #ffffff;
}
.channel_logo {
  padding: 40px 0px;
}
h4 {
  color: #fab900;
  font-family: Sf-ui-medium;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  text-align: center;
}
p {
  font-family: Sf-ui-medium;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.8;
  color: #cccccc;
  padding: 0 0 10px;
}
@media only screen and (max-width: 480px) {
  .carousel_title {
    font-size: 20px;
  }
  .items_title {
    font-size: 14px;
  }
  .bg_text {
    font-size: 30px;
  }
}
</style>
