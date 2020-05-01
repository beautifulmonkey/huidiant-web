<template>
    <div id="app" style="display: flex">
        <div class="menu-box">
            <div style="margin-top: 10px;margin-bottom: 30px;">
                <el-button type="info" round icon="el-icon-back" size="mini" @click="$router.push('/')">后台</el-button>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    :autofocus="true"
                    v-for="item in consumption" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in savings" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in others" @click="ButtonClick(item.id)">{{ item.name }}</el-button>
        </div>
        <div class="main-box">
            <div class="padding-10">
                <el-input placeholder="请输入内容(搜索功能开发中)" size="small">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="padding-20">
                <consume-component v-if="this.menuActive==='consume'"></consume-component>
            </div>
        </div>
        <div class="main-shopping"></div>
    </div>

</template>

<script>
    import {mapState} from "vuex";

    import consumeComponent from '@/views/Cashier/consumeSub.vue'

    export default {
        name: "index",
        components: {
            consumeComponent
        },
        data() {
            return {
                menuActive: 'consume',
                consumption: [
                    {name: "开单", id: "consume"},
                    {name: "次卡", id: "counting"},
                ],
                savings: [
                    {name: "开卡", id: "createCard"},
                    {name: "充值", id: "increase"},
                ],
                others: [
                    {name: "取单", id: "qudan"},
                ]
            }
        },
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
        methods: {
            ButtonClick(data){
                this.menuActive = data
            },
        }
    }
</script>

<style scoped>
    .menu-box {
        margin-left: 5px;
        width: 100px;
    }
    .main-box {
        width: 50%;
        height: 100vh;
        background-color: #f4f5fa;
    }
    .main-shopping{
        width: 50%;
        height: 100vh;
        background-color: green;
    }
    .menu-button {
        display: block;
        width: 70px;
        height: 50px;
        border-color: white;
        margin: 5px;
    }
    .divider-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        margin-left: 5px;
        height: 10px;
    }
    .el-divider {
        width: 30px;
    }

    .el-button--primary:hover{
        background:#409eff !important;
    }
    .el-button--primary:active{
        background:#409eff !important;
    }
    .el-button--primary:focus{
        background:#409eff !important;
    }

    .padding-20{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }

    .padding-10{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }

    .el-tabs__content {
        padding: 5px;
    }
</style>
