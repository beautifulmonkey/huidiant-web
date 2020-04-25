<template>
    <div>
        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/card')" content="添加次卡"></el-page-header>
        </div>

        <div>
<!--            <el-radio-group v-model="radio1">-->
<!--                <el-radio-button label="上海" border>-->
<!--                    <div style="height: 120px;width: 300px">-->
<!--                        <h3>有限次卡</h3>-->
<!--                        <p style="color: #969799">支持创建多个服务集合有限次数的次卡</p>-->
<!--                    </div>-->
<!--                </el-radio-button>-->
<!--                <el-radio-button label="北京" border>-->
<!--                    <div style="height: 120px;width: 300px">-->
<!--                        <h3>不限次卡</h3>-->
<!--                        <p style="color: #969799">支持创建多个服务集合且不限次数的次卡，月卡、年卡等</p>-->
<!--                    </div>-->
<!--                </el-radio-button>-->
<!--                <el-radio-button label="广州" border>-->
<!--                    <div style="height: 120px;width: 300px">-->
<!--                        <h3>通卡</h3>-->
<!--                        <p style="color: #969799">设定一个总次数，会员可在次数内消费卡中任意项目</p>-->
<!--                    </div>-->
<!--                </el-radio-button>-->
<!--            </el-radio-group>-->


<!--            todo: 如何做成有赞的效果?-->
            <el-radio-group v-model="radio1">
                <el-radio label="1" border style="width: 200px;">有限次卡</el-radio>
                <el-radio label="2" border style="width: 200px;">不限次卡</el-radio>
                <el-radio label="3" border style="width: 200px;">通卡</el-radio>
            </el-radio-group>

        </div>

        <el-button
                plain
                @click="open1">
            可自动关闭
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "Numbers",
        data () {
            return {
                radio1: '上海',
            }
        },
        methods: {
            open1() {
                const h = this.$createElement;

                this.$notify({
                    title: '标题名称',
                    message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
                });
            },
        }
    }
</script>

<style scoped>
    .m-wrap-8 {
        margin: 8px;
    }
</style>
