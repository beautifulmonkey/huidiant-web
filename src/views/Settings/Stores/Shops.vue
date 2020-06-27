<template>
	<div>
		<div class="m-wrap-16">
			<el-button size="small" type="primary" @click="addShop">新增门店</el-button>
		</div>

		<div class="m-wrap-16">
			<el-table
				size="medium"
				:data="tableData"
				tooltip-effect="dark"
				style="width: 100%"
			>
				<el-table-column
					type="index"
					width="50">
				</el-table-column>
				<el-table-column
					prop="name"
					label="店铺名称"
					width="180">
				</el-table-column>
				<el-table-column
					prop="tel"
					label="联系电话"
					width="180">
				</el-table-column>
				<el-table-column
					prop="default"
					label="是否默认">
				</el-table-column>

				<el-table-column
					prop="address"
					label="所在地">
				</el-table-column>

				<el-table-column
					prop="status"
					label="状态">
				</el-table-column>

			</el-table>
		</div>

		<div class="pagination-container">
			<el-pagination background :current-page="1" :page-sizes="[5,10]" :page-size="5" layout="total, sizes, prev, pager, next, jumper"
			               :total="1">
			</el-pagination>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Shops",
	    data() {
          return {
              tableData: []
          }
	    },
	    methods: {
            addShop(){
                this.$alert('您共购买了:1个店铺，如须扩展请与软件提供商联系', '购买提示', {
                    confirmButtonText: '确定',
                });
            }
	    },

        mounted() {
            if (localStorage.userInfo) {
                const userInfo = JSON.parse(localStorage.userInfo);
                this.tableData = [
                    {
                        name: userInfo.stores_name,
                        tel: userInfo.tel,
                        default: '是',
                        address: userInfo.stores_address || '-',
                        status: '启用'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 16px;
		text-align: left;
	}
</style>
