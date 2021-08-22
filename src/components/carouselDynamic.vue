<template>
    <carousel
    :autoplay="false"
    :nav="true"
    :items="1"
    :loop="true"
    :dots="false"
    :responsive="{0:{items:1,nav:true,stagePadding:0},600:{items:2,nav:true,stagePadding:50},768:{items:5,stagePadding:0,loop:false}}"
    >
    <div
        style="background:white;margin: 0px 10px;border-radius: 3px;padding: 5px;"
        v-for="item in carousel_data"
        :key="item.id"
        class="img-wrapper-masthead"
    >
        <router-link :to="{ path: '/radio/'+ item.id }">
        <img style="width:100%;" :src="item.image" />
        </router-link>
    </div>
    </carousel>
</template>
<script>
import carousel from "vue-owl-carousel";
export default {
    props: ['carousel_data']
}
</script>
<style>

</style>

