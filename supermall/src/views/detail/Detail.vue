<template>
    <div id="detail">
        <detail-navBar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-navBar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from '../../components/content/goods/GoodList'
    import DetailBottomBar from './childComps/DetailBottomBar'

    import Scroll from '../../components/common/scroll/Scroll'


    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";

    import {itemListenerMixin,backTopMixin} from "../../common/mixin/mixin";
    import  {debounce} from "../../common/utils/utils";


    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar
        },
        mixins:[
            itemListenerMixin,
            backTopMixin
        ],
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                getTopY:null

            }
        },
        // updated(){
        //     this.themeTopYs=[];
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // },
        created(){
            this.iid=this.$route.params.iid
            getDetail(this.iid).then(res=>{
                console.log(res);
                const data=res.result
                this.topImages=data.itemInfo.topImages
                //3、获取商品信息
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                console.log('goods:::',this.goods);
                // //4、获取店铺信息
                 this.shop=new Shop(data.shopInfo);;
                //5、获取商品详情数据
                this.detailInfo=data.detailInfo;
                //6、获取参数信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

                //7、获取评论信息
                this.commentInfo=data.rate.cRate ? data.rate.list[0] :{};

                //下一帧，数据渲染完会回调里面的函数，
                //dom被渲染完了，但里面的图片并未加载完，所以此时获取到的数据依旧不对
                //offsetTop获取到的值不对的问题，都是图片问题
                // this.$nextTick(()=>{
                //         this.themeTopYs=[];
                //         this.themeTopYs.push(0);
                //         this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                //         this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                //         this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // })




            })
            //8、请求推荐数据
            getRecommend().then((res)=>{
                // console.log(res);
                this.recommends=res.data.list
            });
            this.getTopY=debounce(()=>{
                        this.themeTopYs=[];
                        this.themeTopYs.push(0);
                        this.themeTopYs.push(this.$refs.params.$el.offsetTop -44);
                        this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44);
                        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44);
                        this.themeTopYs.push(Number.MAX_VALUE);
            },300)
        },
        methods:{
            addToCart(){
                const product={}
                product.image=this.topImages[0];
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.newPrice;
                product.iid=this.iid;

                this.$store.commit('addCart',product);

            },
            imageLoad(){
                this.$refs.scroll.refresh()
                this.getTopY()

            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
            },
            contentScroll(position){
                console.log('--');
                const positionY=-position.y
                let length=this.themeTopYs.length
                for (let i = 0; i <length-1 ; i++) {
                    if (this.currentType!==i&&(positionY > this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
                        this.currentIndex=i;
                        this.$refs.nav.currentIndex=this.currentIndex
                    }
                }

                this.isShowBackTop=-position.y>1000


            }
        },
        mounted(){
            // const refresh=debounce(this.$refs.scroll.refresh,500)
            // this.itemImgLister=()=>{
            //     refresh()
            // }
            // this.$bus.$on('itemImageLoad', this.itemImgLister)


        },
        destroyed(){
            this.$bus.$off('itemImageLoad',this.itemImgLister)
        }
    }
</script>

<style scoped>
#detail{
    position: relative;
    z-index:9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index:9;
    background-color: #fff;
}
    .content{
        height: calc(100% - 44px - 49px);
    }
</style>