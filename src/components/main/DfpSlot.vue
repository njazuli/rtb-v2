<template>
  <div :id="id" class="d-flex justify-content-center"></div>
</template>
<script>
export default {
  name: "DfpSlot",
  props: { size: Array, path: String, id: String },
  beforeCreate() {
    if (process.browser) {
      window.googletag = window.googletag || {cmd: []};

      window.googletag.cmd.push(() => {
        window.googletag.destroySlots();
      });
    }
  },
  mounted() {
    const { path, size, id } = this;
    window.googletag.cmd.push(() => {
      window.googletag
        .defineSlot(path, size, id)
        .addService(window.googletag.pubads())
        .setCollapseEmptyDiv(true);
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
      window.googletag.pubads().refresh();
      window.googletag.display(id);
    });
  }
};
</script>