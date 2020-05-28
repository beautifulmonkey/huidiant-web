<template>
	<div>

		<div style="text-align: left">
			<el-radio-group v-model="cardAvailable" size="mini" @change="cardAvailableChange">
				<el-radio-button label="1">有效</el-radio-button>
				<el-radio-button label="0">失效</el-radio-button>
			</el-radio-group>
		</div>

		<div>
			<el-table
				:data="customerCountingList">
				<el-table-column prop="name" label="次卡名称"></el-table-column>
				<el-table-column prop="original_counting" label="总次数">
					<template slot-scope="scope">
						<span v-if="scope.row.original_counting===-1">无限次</span>
						<span v-if="scope.row.original_counting!==-1">{{scope.row.original_counting}}次</span>
					</template>
				</el-table-column>

				<el-table-column prop="counting_info" label="剩余次数"></el-table-column>

				<el-table-column label="到期时间">
					<template slot-scope="scope">
						<span>{{scope.row.expiry_date || "永久有效"}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="办卡时间"></el-table-column>

				<el-table-column
					label="操作">
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="usingRecord(scope.row.id)"
							type="text"
							size="small">
							消费记录
						</el-button>
					</template>
				</el-table-column>

			</el-table>
		</div>


		<el-dialog title="次卡消费记录" :visible.sync="dialogTableVisible">
			<el-table :data="usingRecordList">
				<el-table-column property="service_name" label="服务名称"></el-table-column>
				<el-table-column property="count" label="消费次数"></el-table-column>
				<el-table-column property="created_at" label="消费时间"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
    import customerApi from '@/service/customer.js'

    export default {
        name: "countingCardSub",
        props: {
            customer_id: {
                type: String,
                default: null
            },
        },
	    data() {
            return {
                cardAvailable: "1",
                dialogTableVisible: false,
                customerCountingList: [],
                usingRecordList: []
            }
	    },
	    methods: {
            // 更换状态
            cardAvailableChange(label){
                this.getCustomerCounting(label)
            },

            // 获取客户次卡数据
            async getCustomerCounting(available){
                try {
                    const res = await customerApi.getCustomerCounting(this.customer_id, {available: available});
                    if (res.status >= 200 && res.status < 300) {
                        this.customerCountingList = res.data.counting;
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

		    // 次卡使用记录
		    async usingRecord(card_id){
                try {
                    const res = await customerApi.getCustomerCountingUseRecord(card_id);
                    if (res.status >= 200 && res.status < 300) {
                        this.usingRecordList = res.data;
                        this.dialogTableVisible = true
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
		    }
	    },
	    mounted() {
            this.getCustomerCounting(1)
        }
    }
</script>

<style scoped>

</style>
