<template>
    <div>
<!--        卡项类型-->
        <div class="box-tag">
            <div>
                <el-radio-group v-model="cardType" size="mini" @change="tagChange">
                    <el-radio-button v-if="!this.prepaidCardId" :label="-1">全部</el-radio-button>
                    <el-radio-button v-if="!this.prepaidCardId" :label="1">充值卡</el-radio-button>
                    <el-radio-button :label="2">次卡</el-radio-button>
                </el-radio-group>
            </div>
        </div>

<!--        卡列表-->
        <div class="box-card-list" :style="calcHeight()">
            <div class="card-item-box"
                 @click="addCard(item)"
                 v-for="item in cardList">

            <div class="card-item" :style="[item.type === 1 ? czk_bgi_style : ck_bgi_style]">
                <div>{{item.name}}</div>
                <div>
                    <div style="text-align: right">
                        ¥{{item.discount_price}}
                    </div>

                    <div style="text-align: right;font-size: 0.8rem;">
                        <s v-if="item.discount_price !== item.price"><span>￥{{item.price}}</span></s>
                    </div>

                    <div style="text-align: right">{{item.validity}}</div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cardApi from '@/service/card.js'
    export default {
        name: "createCardSub",
        props: {
            prepaidCardId: {
                type: Number,
                default: null
            },
            customerId: {
                type: Number
            }
        },
        data(){
            return {
                czk_bgi_style: {
                    backgroundImage:`url(${require('@/assets/img/czk_bgi.png')})`
                },
                ck_bgi_style: {
                    backgroundImage:`url(${require('@/assets/img/ck_bgi.png')})`
                },
                cardType: -1,
                cardList: []
            }
        },
        methods: {
            calcHeight(){
                const container = window.document.getElementById('main-box');
                if(container){
                    return "height: " +  (container.clientHeight - 100).toString() + "px"
                }
                return "height: 300px";
            },

            // 获取卡项列表  todo: 获取999条数据改成分页 包括其他页面
            async getCardList(){
                try {
                    const res = await cardApi.getCardList({
                        'type': this.cardType,
                        'page_size': 999,
                        'prepaid_card': this.prepaidCardId,
                        'disable': 0
                    });
                    if (res.status >= 200 && res.status < 300) {
                        this.cardList = res.data.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取卡项列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            tagChange() {
                this.getCardList()
            },

            addCard(data){
                if(!this.customerId) {
                    this.$message({
                        type: 'warning',
                        message: '请先选择客户!',
                    });
                    return
                }
                this.$emit('addShoppingCart', {
                    type: data.type,
                    id: data.id,
                    name: data.name,
                    count: 1,
                    price: data.price,
                    discount_price: data.discount_price
                });
            }
        },
        mounted(){
            // this.getCardList()
        },
        watch: {
            prepaidCardId: {
                immediate: true,
                handler(val) {
                    if (val){
                        this.cardType = 2
                    }else {
                        this.cardType = -1
                    }
                    this.getCardList();
                }
            }
        }
    }
</script>

<style scoped>
    .box-tag {
        height: 50px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .box-card-list {
        padding-top: 20px;
        padding-left: 7px;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        text-align: left;
        overflow: auto;
    }

    .card-item-box {
        display: inline-block;
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
</style>
