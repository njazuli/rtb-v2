<template>
  <div>
    <div class="w-100 breadcrumbs-mobile">
      <div
        class="w-100 d-flex flex-row align-items-center justify-content-start mb-4"
      >
        <router-link :to="'/'" class="">
          <p class="mb-0 breadcrumbs text-white">Home</p>
        </router-link>
        <span class="text-white mx-2">/</span>
        <p class="mb-0 breadcrumbs text-yellow">{{ currentPage }}</p>
      </div>
    </div>
    <div class="w-100 px-2">
      <div class="item-header">
        <div
          class="w-100 d-flex flex-row justify-content-center align-items-center position-relative"
        >
          <div class="w-100" v-if="mainTitle">
            <p class="mb-0 item-header-title">{{ mainTitle }}</p>
          </div>
          <div class="breadcrumbsWrapper">
            <div
              class="w-100 d-flex flex-row align-items-center justify-content-center"
            >
              <router-link :to="'/'" class="">
                <p class="mb-0 breadcrumbs text-white">Home</p>
              </router-link>
              <span class="text-white mx-2">/</span>
              <p class="mb-0 breadcrumbs text-yellow">{{ currentPage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs-header',
  props: ['mainTitle', 'currentPage']
}
</script>

<style scoped>
.item-header {
  display: flex;
  justify-content: center;
}
.item-header-title {
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
  color: #facb43;
}
.breadcrumbs-mobile {
  display: none;
}
.breadcrumbsWrapper {
  position: absolute;
  right: 8px;
  display: flex;
  justify-content: flex-end;
}
.breadcrumbs {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  text-align: left;
}
.text-white {
  color: #e6e6e6;
}
.text-yellow {
  color: #facb43;
}

@media only screen and (max-width: 768px) {
  .breadcrumbs-mobile {
    display: flex;
    justify-content: flex-start;
  }
  .breadcrumbsWrapper {
    display: none;
  }
  .breadcrumbs {
    font-size: 12px;
  }
  .item-header-title {
    font-size: 20px;
  }
}
</style>
