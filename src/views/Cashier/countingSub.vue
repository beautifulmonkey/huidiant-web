<template>
    <div>
        <div v-if="customerId">
            <!--次卡-->
            <div>
                <div style="text-align: left"><strong>已办次卡</strong></div>
                <div>
                    <div class="box-card-list">
                        <div class="card-item" :style="ck_bgi_style"
                             @click="showCardItem(item)"
                             v-for="item in customerCountingList.counting">
                            <div>{{item.name}}</div>
                            <div>
                                <div style="text-align: right">{{item.counting_info}}</div>
                                <div style="text-align: right" v-if="item.expiry_date">{{item.expiry_date}}失效</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!--赠送-->
            <div style="margin-top: 30px;">
            <div style="text-align: left"><strong>赠送权益</strong></div>
            <div class="box-card">
                <el-card shadow="always" :body-style="{ padding: '5px' }"
                         @click.native="addGoods(item, 8)"
                         v-for="item in customerCountingList.gift">
                    <div style="text-align: left;margin: 5px">
                        <span>{{item.name}}</span><br>
                        <span style="color: #fe2278">￥{{item.price}}</span><br>
                        <span style="color: #999;font-size: 0.8rem;">{{item.counting_info}}</span>
                    </div>
                </el-card>
            </div>
        </div>
        </div>

        <div v-if="!customerId" class="align-justify-center" style="height: 50vh;">
            <div><span style="color: #969799">无可选项目，请输入客户信息</span></div>
        </div>

        <el-dialog
                title="请选择消费项目"
                :visible.sync="dialogVisible"
                width="30%">
            <div style="text-align: left;margin-bottom: 20px;">
                <span>{{countingClickItem.name}} ({{countingClickItem.counting_info}})</span>
            </div>
            <div>
                <div class="box-card" style="margin: 0">
                    <el-card shadow="always" :body-style="{ padding: '5px' }"
                             @click.native="addGoods(item, 3)"
                             v-for="item in countingClickItem.items">
                        <div style="text-align: left;margin: 5px">
                            <span>{{item.name}}</span><br>
                            <span style="color: #fe2278">￥{{item.price}}</span><br>
                            <span style="color: #999;font-size: 0.8rem;">{{item.counting_info}}</span>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import customerApi from '@/service/customer.js'
    export default {
        name: "countingSub",
        props: {
            customerId: {
                type: Number
            },
        },
        data() {
            return {
                ck_bgi_style: {
                    backgroundImage:`url(${require('@/assets/img/ck_bgi.png')})`
                },
                customerCountingList: [],
                countingClickItem: {},
                dialogVisible: false
            }
        },
        methods: {
            // 获取客户次卡数据
            async getCustomerCounting(){
                try {
                    const res = await customerApi.getCustomerCounting(this.customerId);
                    if (res.status >= 200 && res.status < 300) {
                        this.customerCountingList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取客户数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 次卡详情
            showCardItem(item){
                this.countingClickItem = item;
                this.dialogVisible = true
            },

            // 添加到清单  todo: 次卡和赠送同时划卡会出限制bug
            addGoods(data, goodsType) {
                this.$emit('addShoppingCart', {
                    goodsType: goodsType,
                    shoppingType: 'counting',
                    counting_card_id: this.countingClickItem.id || null,
                    id: data.id,
                    name: data.name,
                    count: 1,
                    price: data.price,
                    discount_price: 0,
                    counting: data.counting
                });
            }
        },
        mounted(){
            // this.getData()
        },
        watch: {
            customerId: {
                immediate: true,
                handler(val) {
                    if (!val){
                        this.customerCountingList = []
                    }else{
                        this.getCustomerCounting()
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .box-card-list {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    .card-item {
        padding: 10px;
        color: #fff;
        position: relative;
        margin-right: 15px;
        margin-bottom: 10px;
        width: 240px;
        height: 90px;
        border-radius: 4px;
        box-sizing: border-box;
        transition: all .3s;
        -webkit-transition: all .3s; /* Safari */
        background-position: 50%;
        background-size: cover;
        background-image: linear-gradient(142.2deg,#ff8845,#fb9c32);
        display: flex;
        justify-content: space-between;
    }

    .card-item:hover{
        cursor: pointer;
        transform: scale(1.05);
        -ms-transform:scale(1.05);     /* IE 9 */
        -moz-transform:scale(1.05);     /* Firefox */
        -webkit-transform:scale(1.05); /* Safari 和 Chrome */
        -o-transform:scale(1.05);
    }

    .box-card{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    .box-card div{
        width: 170px;
        margin-right: 15px;
        margin-bottom: 10px;
    }

    .el-card {
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

    /deep/ .el-dialog__body{
        padding-top: 10px;
    }

    .align-justify-center{
        display: flex;
        align-items:center;
        justify-content:center;
    }
</style>
