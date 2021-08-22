<template>
  <div class="container">
    <div class="row my-2 py-3 showdiv justify-content-center align-items-center flex-column">
      <div class="col-12 px-0">
        <dfp-slot
          path="/229445249/DWTag-DFPNew_RTB_Go_Web_Billboard_970x250_Tablet_040520"
          :size="[970, 250]"
          id="div-gpt-ad-1588588742797-0"
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
@media only screen and (device-width: 768px) {
  /* For general iPad layouts */
  .showdiv {
    display: flex;
  }
}

@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
  /* For portrait layouts only */
  .showdiv {
    display: flex;
  }
}

@media only screen and (min-device-width: 481px) and (max-device-width: 1366px) and (orientation: landscape) {
  /* For landscape layouts only */
  .showdiv {
    display: flex;
  }
}
</style>
