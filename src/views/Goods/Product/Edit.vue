<template>
    <div class="m-wrap-16">
    <div>
        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/product')" content="编辑产品"></el-page-header>
        </div>
        <sub-comp></sub-comp>
    </div>
    </div>
</template>

<script>
    import subComp from '@/views/Goods/Product/SubComp.vue'

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
