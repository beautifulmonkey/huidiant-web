<template>
    <div>

        <!--tabs区域-->
        <div class="box-tabs">
            <el-tabs type="border-card" v-model="tabsActiveName" @tab-click="tabClick">
                <el-tab-pane name="service" label="服务" style="float: left">
<!--                    <el-tag size="mini">全部服务</el-tag>-->
                    <el-radio-group v-model="serviceTagId" size="small" @change="tagChange">
                        <el-radio-button :label="0">全部服务</el-radio-button>
                        <el-radio-button v-for="tag in serviceTagList" :label="tag.id" >{{tag.name}}</el-radio-button>
                    </el-radio-group>
                </el-tab-pane>

                <el-tab-pane name="product" label="产品" style="float: left">
                    <el-radio-group v-model="productTagId" size="small" @change="tagChange">
                        <el-radio-button :label="0">全部产品</el-radio-button>
                        <el-radio-button v-for="tag in productTagList" :label="tag.id" >{{tag.name}}</el-radio-button>
                    </el-radio-group>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--商品卡片区域-->
        <div class="box-card" :style="calcHeight()">
            <el-card shadow="always" :body-style="{ padding: '5px' }"
                     @click.native="addGoods(item)"
                     v-for="item in goodsCardList">
                <div style="text-align: left;margin: 5px">
                    <span>{{item.name}}</span><br>
                    <span style="color: #fe2278">￥{{item.discount_price}}</span>
                    <s v-if="item.discount_price !== item.price"><span style="font-size: 0.8rem;color: rgb(153, 153, 153)">￥{{item.price}}</span></s>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    import categoryTagApi from '@/service/categoryTag.js'
    import serviceApi from '@/service/service.js'
    import productApi from '@/service/product.js'

    export default {
        name: "consumeSub",
        props: {
            prepaidCardId: {
                type: Number,
                default: null
            },
        },
        data() {
            return {
                tabsActiveName: 'service',
                serviceTagId: 0,
                productTagId: 0,
                serviceTagList: [],
                productTagList: [],
                goodsCardList: []
            }
        },
        methods: {
            calcHeight(){
                const container = window.document.getElementById('main-box');
                if(container){
                    return "height: " +  (container.clientHeight - 150).toString() + "px"
                }
                return "height: 300px";
            },

            // 获取标签
            async getTagList() {
                try {
                    const res_1 = await categoryTagApi.getTagList(1);
                    const res_2 = await categoryTagApi.getTagList(2);
                    if (res_1.status >= 200 && res_1.status < 300) {
                        this.serviceTagList = res_1.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取标签列表失败!'
                        })
                    }
                    if (res_2.status >= 200 && res_2.status < 300) {
                        this.productTagList = res_2.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取标签列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取服务列表
            async getServiceList(){
                try {
                    const res = await serviceApi.getServiceList({
                        'tag_id': this.serviceTagId,
                        "page_size": 999,
                        'prepaid_card': this.prepaidCardId,
                        'disable': 0,
                    });
                    if (res.status >= 200 && res.status < 300) {
                        this.goodsCardList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取服务列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取产品列表
            async getProductList(){
                try {
                    const res = await productApi.getProductList({
                        'tag_id': this.productTagId,
                        "page_size": 999,
                        'prepaid_card': this.prepaidCardId,
                        'disable': 0,
                    });
                    if (res.status >= 200 && res.status < 300) {
                        this.goodsCardList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取产品列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            tagChange(label){
                this.getGoodsList()
            },

            tabClick(tab, event) {
                this.getGoodsList()
            },

            getGoodsList() {
                const tabs_type =  this.tabsActiveName;
                if (tabs_type==='service'){
                    this.getServiceList()
                }else if (tabs_type==='product'){
                    this.getProductList()
                }
            },

            // 添加到清单
            addGoods(data) {
                let goods_map = {'service': 1, 'product':2};
                this.$emit('addShoppingCart', {
                    goodsType: goods_map[this.tabsActiveName],
                    shoppingType: 'consume',
                    id: data.id,
                    name: data.name,
                    count: 1,
                    price: data.price,
                    discount_price: data.discount_price
                });
            }

        },
        mounted() {
            this.getTagList();
        },
        watch: {
            prepaidCardId: {
                immediate: true,
                handler(val) {
                    this.getGoodsList();
                }
            }
        }
    }
</script>

<style scoped>

    .box-card{
        margin-top: 20px;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        overflow: auto;
        text-align: left;
    }

    .el-card {
        display: inline-block;
        box-sizing: border-box;
        transition: all .3s;
        -webkit-transition: all .3s; /* Safari */
    }

    .el-card:hover{
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform:scale(1.05);     /* IE 9 */
        -moz-transform:scale(1.05);     /* Firefox */
        -webkit-transform:scale(1.05); /* Safari 和 Chrome */
        -o-transform:scale(1.05);
    }

    .box-card div{
        width: 170px;
        margin-right: 15px;
        margin-bottom: 10px;
    }
</style>
