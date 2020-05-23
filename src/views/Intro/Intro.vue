<template>
  <div style="margin-top: 30px;">
    <el-steps :active="3" align-center>
      <el-step title="发布商品"></el-step>
      <el-step title="客户管理"></el-step>
      <el-step title="消费收银"></el-step>
    </el-steps>


  <div style="display: flex; justify-content: space-between;margin: 20px 50px;text-align: left">

    <div style="width: 30%; padding: 10px;">
      <el-card>
        <h4>1.创建服务</h4>
        <div class="desc">
          <p>服务为门店可提供的手工项目</p>
          <p>例如：洗剪吹、烫染、护理等。</p>
        </div>
      </el-card>
      <el-card>
        <h4>2.创建产品</h4>
        <div class="desc">
          <p>产品为店内销售的实物商品</p>
          <p>例如：洗发水、面膜、精油等。</p>
        </div>
      </el-card>
      <el-card>
        <h4>3.创建卡项</h4>
        <div class="desc">
          <p>卡项是获客留存法宝，你可以添加次卡/充值卡</p>
          <br>
          <p>次卡：适用于次卡/套卡/年卡场景。</p>
          <p>例如：剪发10次卡；护理年卡等</p>
          <br>
          <p>充值卡：适用于定额充值享受权益场景</p>
          <p>例如：充1000烫染8折卡、充2000烫染7折产品8折卡</p>
        </div>
      </el-card>
    </div>

    <el-divider direction="vertical"></el-divider>

    <div style="width: 30%; padding: 10px;">
      <el-card>
        <h4>1.设置会员规则</h4>
        <div class="desc">
          <p>客户设置中的自动入会功能</p>
          <p>例如：张三办了某充值卡,自动成为会员</p>
          <p>&nbsp;李四办了某次卡,自动成为会员</p>
        </div>
      </el-card>
      <el-card>
        <h4>2.添加客户</h4>
        <div class="desc">
          <p>系统的核心功能</p>
          <p>提供了对客户多个维度的数据分析/历史消费记录/管理的功能</p>
        </div>
      </el-card>
    </div>

    <el-divider direction="vertical"></el-divider>

    <div style="width: 30%; padding: 10px;">
      <el-card>
        <h4>1.开单消费</h4>
        <div class="desc">
          <p>消费项目/服务/产品</p>
        </div>
      </el-card>
      <el-card>
        <h4>2.办卡</h4>
        <div class="desc">
          <p>指定客户后办理充值卡/次卡</p>
        </div>
      </el-card>
      <el-card>
        <h4>3.充值</h4>
        <div class="desc">
          <p>指定客户后给其充值卡 充值/升卡充值</p>
        </div>
      </el-card>
    </div>

  </div>

  </div>
</template>

<script>
  export default {
    components:{
    },
    methods :{
    }
  }
</script>

<style>
.el-card{
  margin-bottom: 10px;
}

.el-divider--vertical{
  margin: 8px 0;
  height: 500px !important;
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}

  h4 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  p{
    margin: 0;
  }

.desc {
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
  line-height: 22px;
}
</style>
