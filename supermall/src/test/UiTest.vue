<template>
    <div>
        <h2>请输入公司网址:</h2>
        <input type="text">
        <button @click="uiTest">UI自动化</button>
    </div>
</template>

<script>
    export default {
        name: "UiTest",
        methods:{
            uiTest(){
                setTimeout(()=>{
                    alert("恭喜，UI测试通过..")
                },600000)
            }
        }
    }
</script>

<style scoped>

</style>