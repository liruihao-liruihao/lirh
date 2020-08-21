<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"  v-show="isTabFixed"></tab-control>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true" @pullingUp="pullingUp">
        <home-swiper :banners="banners" @swiperimgload="swiperimgload"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl" ></tab-control>
        <good-list :goods="showGoodsList"></good-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    </div>
</template>

<script>
    //子组件
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView  from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    //公共组件
    import NavBar from '../../components/common/navbar/NavBar'
    import  TabControl from '../../components/content/tabControl/TabControl'
    import GoodList from '../../components/content/goods/GoodList'
    import Scroll from '../../components/common/scroll/Scroll'
    import BackTop from '../../components/content/backTop/BackTop'
    //导入函数
    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    import {debounce} from '../../common/utils/utils'

    import {itemListenerMixin} from "../../common/mixin/mixin";

    export default {
        name: "Home",
        mixins:[itemListenerMixin],
        data(){
            return{
                banners:[],
                recommends:[],
                goods:{
                    'pop':{
                        page:0,
                        list:[]
                    },
                    'new':{
                        page:0,
                        list:[]
                    },
                    'sell':{
                        page:0,
                        list:[]
                    }
                },
                currentType:'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:1000
            }
        },
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()
        },
        deactivated(){
         this.saveY=this.$refs.scroll.getScrollY();
            console.log(this.saveY);
            this.$bus.$off('itemImageLoad',this.itemImgLister)
        },
        destroyed(){
            console.log('destroyed');
        },
        mounted(){
            // const  refresh=debounce(this.$refs.scroll.refresh,500)
            // //对监听的事件进行保存
            // this.itemImgLister=()=>{
            //     refresh()
            // }
            // this.$bus.$on('itemImageLoad',this.itemImgLister)


        },
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodList,
            Scroll,
            BackTop

        },
        //组件创建时执行，是一个回调函数
        created(){
            console.log('home create');
            //1、请求多个数据，异步操作promise
            this.getHomeMultidata()
            //2、请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')


        },
        methods:{
            /**
             * 事件监听相关方法
             */
            swiperimgload(){

              this.tabOffsetTop= this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop


            },
            tabClick(index){
                console.log(index);
                switch(index){
                    case 0:
                        this.currentType='pop'
                        break
                    case 1:
                        this.currentType='new'
                        break
                    case 2:
                        this.currentType='sell'
                        break

                }
                this.$refs.tabControl1.currentIndex=index
                this.$refs.tabControl.currentIndex=index
            },
            backClick(){
             //   console.log('scrolltop');
                this.$refs.scroll.scrollTo(0,0)
            },
            contentScroll(position){
                //1、判断backtop是否显示
                this.isShowBackTop=-position.y>1000
                //2、判断tabcontrol是否吸顶
                this.isTabFixed=-position.y>this.tabOffsetTop


            },
            pullingUp(){
                // console.log('1122上拉加载更多');
                this.getHomeGoods(this.currentType);

            },



        /**
         * 网络请求相关方法
         */
        getHomeMultidata(){
               getHomeMultidata().then(
                   res=>{
                       console.log(res);
                       this.banners=res.data.banner.list;
                       this.recommends=res.data.recommend.list;
                   }
               )},
           getHomeGoods(type){
                   const page=this.goods[type].page+1
                   getHomeGoods(type,page).then(res=>{
                       console.log(res);
                       this.goods[type].list.push(...res.data.list)
                       this.goods[type].page+=1

                       this.$refs.scroll.finishPullUp()
                   })
               }
           },
        computed:{
            showGoodsList(){
                return this.goods[this.currentType].list
            }

        }
    }
</script>

<style scoped>
    #home{
        /*padding-top: 44px ;*/
      height: 100vh;
    }
.home-nav{
    background-color: var(--color-tint);
    color:#fff;

    /*position:fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/

    /*z-index: 9;*/
}
.tab-control{
   /*position:sticky;*/
   /*top: 44px;*/
   /*z-index: 9;*/
  position: relative;
  z-index: 9;
 }

  .content{
    position:absolute;
    top: 44px;
    bottom: 49px;
    left:0;
    right: 0;
    /*height: calc(100% - 98px);*/
    /*height: 300px;*/
    overflow: hidden;
  }

</style>
