<template>
    <div class="m-wrap-16">
    <div style="width: 40%">

        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/service')" content="编辑服务"></el-page-header>
        </div>

        <sub-comp></sub-comp>
    </div>
    </div>
</template>

<script>
    import subComp from '@/views/Goods/Service/SubComp.vue'

    export default {
        name: "Edit",
        components: {
            subComp
        },
    }
</script>

<style scoped>
    .m-wrap-8 {
        margin: 8px;
    }

    .m-wrap-16 {
        margin: 7px;
        margin-bottom: 20px;
        padding: 24px;
        background: #fff;
        text-align: left;
        height: 100%;
    }
</style>
