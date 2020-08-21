<template>
    <div>
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imgLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper, SwiperItem} from '../../../components/common/swiper'
    export default {
        name: "HomeSwiper",
        data(){
            return {
                isLoad:false
            }
        },
        props:{
            banners:{
                type:Array,
                dafault(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem

        },
        methods:{
            imgLoad(){
                console.log('---');

                if (!this.isLoad){
                    this.$emit('swiperimgload')
                    this.isLoad=true
                }
            }
        }
    }
</script>

<style scoped>

</style>