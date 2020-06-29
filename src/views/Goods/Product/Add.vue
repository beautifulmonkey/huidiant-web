<template>
    <div style="width: 40%">

        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/product')" content="添加产品"></el-page-header>
        </div>

        <sub-comp></sub-comp>
    </div>
</template>

<script>
    import subComp from '@/views/Goods/Product/SubComp.vue'

    export default {
        name: "Add",
        components: {
            subComp
        },
    }
</script>

<style scoped>

    .m-wrap-8 {
        margin: 8px;
    }
</style>
