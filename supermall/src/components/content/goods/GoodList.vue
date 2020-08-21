<template>
    <div class="goodss">
        <good-list-item v-for="item in goods" :goodsitem="item"></good-list-item>
    </div>
</template>

<script>
    import GoodListItem from './GoodListItem'
    export default {
        name: "GoodList",
        components:{
            GoodListItem
        },
        props:{
            goods:{
                type:Array,
                default(){
                    return[]
                }
            }
        }
    }
</script>


<style scoped>
    .goodss{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }
</style>