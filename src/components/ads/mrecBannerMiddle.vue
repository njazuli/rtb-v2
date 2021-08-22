<template>
  <div class="container">
    <div class="row my-2 py-3 showdiv justify-content-center align-items-center flex-column">
      <div class="col-12 px-0">
        <dfp-slot
          path="/22163595876/RTBGo_WEB_MRECBanner_300x250_Mobile_Middle"
          :size="[300, 250]"
          id="RTBGo_WEB_MRECBanner_300x250_Mobile_Middle"
          style="margin:0 auto;"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.stickyads {
  position: sticky;
  bottom: 0;
  margin: 0 auto;
  background: red;
}
.showdiv {
  display: none;
}
@media (max-width: 576px) {
  .showdiv {
    display: flex;
  }
}
</style>
