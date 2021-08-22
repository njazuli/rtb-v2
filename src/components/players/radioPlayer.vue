<template>
  <div>
    <div class="embed-responsive embed-responsive-16by9">
      <div id="vidBox" class="player embed-responsive-item" ref="vidBox"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerComponent',
  props: ['id', 'type'],
  methods: {
    initialize() {
      var target = document.getElementById('vidBox')
      this.initializePlayer(this.id, target, this.type)
    }
  },
  watch: {
    id: function(newVal) {
      var target = document.getElementById('vidBox')
      this.initializePlayer(newVal, target, this.type)
    }
  }
}
</script>

<style></style>
