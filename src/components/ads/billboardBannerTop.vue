<template>
  <div class="container">
    <div class="row my-2 py-3 showdiv justify-content-center align-items-center flex-column">
      <div class="col-12 px-0">
        <dfp-slot
          path="/22163595876/RTBGo_WEB_BillboardBanner_970x250_Desktop_Top"
          :size="[970, 250]"
          id="RTBGo_WEB_BillboardBanner_970x250_Desktop_Top"
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
@media (min-width: 1000px) {
  .showdiv {
    display: flex;
  }
}
</style>
