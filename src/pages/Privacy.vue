<template>
  <div class="min-height-for-section mb_controller w-100 pt-livetv">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="w-100 breadCrumbsWrapper">
            <BreadCrumbsHeader
              :mainTitle="'PRIVACY POLICY'"
              :currentPage="'PRIVACY'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mt-4 mx-3">
        <div class="col-12 text-left my-2 pl-3">
          <h4 class="my-3">GOVERNMENT OF BRUNEI DARUSSALAM PRIVACY STATEM</h4>

          <p>
            1) This is a Government of His Majesty The Sultan and Yang
            Di-Pertuan of Brunei Darussalam website. Thank you for examining our
            privacy statement.
          </p>

          <p>
            2) If you are only browsing this website, we do not capture data
            that allows us to identify you individually.
          </p>

          <p>
            If you choose to make an application or send us an e-mail for which
            you provide us with personality identifiable data, we may share
            necessary data with other Government agencies, so as to serve you in
            a most efficient and effective way, unless such sharing is
            prohibited by legislation. We will NOT share your personal data with
            non-Government entities, except where such entities have been
            authorised to carry out specific Government services.
          </p>

          <p>
            3) For your convenience, we may also display to you data you had
            previously supplied us or other Government agencies. This will speed
            up the transaction and save the trouble of repeating previous
            submissions. Should the data be out-of-date, please supply us the
            latest data. We will retain your personal data only as necessary for
            the effective delivery of public services to you.
          </p>

          <p>
            4) To safeguard your personal data, all electronic storage and
            transmission of personal data are secured with appropriate security
            technologies.
          </p>

          <p>
            5) This site may contain links to non-Government sites whose data
            protection and privacy practices may differ from ours. We are not
            responsible for the content and privacy practices of these other
            websites and encourage you to consult the privacy notices of those
            sites.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
