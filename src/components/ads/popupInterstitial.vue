<template>
  <div class="container">
    <div class="row my-2 py-3 showdiv justify-content-center align-items-center flex-column">
      <div class="col-12 px-0">
        <dfp-slot
          path="/22163595876/RTBGo_Interstitial_Web"
          :size="[1, 1]"
          id="RTBGo_Interstitial_Web"
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
