<template>
	<div>
		<div id="printerError"></div>
		<el-button style="float: right;margin-top: 20px;margin-bottom: 50px;"
		           @click="receiptsExport">打印小票</el-button>

		<div v-show="false">
			<input type="hidden" id="thisCtxPath" value=""/>
			<div id="prdivID" style="padding-right:10px;text-align: left">
			<div style='width:49mm;margin-top: 5px;overflow:hidden;text-align: center;font-size:16px;white-space: nowrap'>
				{{user.stores_name}}
			</div>

			<table  style="padding: 0;margin: 0;line-height:100%;width:52mm;font-size:11px;font-weight: normal">
				<tr><td> &nbsp;</td><td> &nbsp;</td></tr>
				<tr>
					<td style="white-space: nowrap">订单编号:</td>
					<td>{{orderData.order_number}}</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">订单类型:</td>
					<td>[{{orderData.order_type_info}}]</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">消费人:</td>
					<td>{{orderData.customer_name}}</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">消费时间:</td>
					<td>{{orderData.created_at}}</td>
				</tr>
			</table>
			<span style="padding: 0;margin: 0;width:52mm;font-size: 11px;font-weight: normal">-----------------------------------------------</span>
			<table style="padding: 0;margin: 0;line-height:100%;width:52mm;font-size: 11px;font-weight: normal"
			       v-for="goods_item in orderData.goods">
				<tr><td width="35%" colspan="4" style="text-align: left;">{{goods_item.goods_name}}[{{goods_item.type_info}}]</td></tr>
				<tr>
					<td width="10%" style="white-space: nowrap;text-align: left;">单价</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">数量</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">优惠</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">小计</td>
				</tr>
				<tr>
					<td >{{goods_item.original_price}}</td>
					<td >{{goods_item.count}}</td>
					<td >{{goods_item.reduce_amount}}</td>
					<td >{{goods_item.paid_amount}}</td>
				</tr>
			</table>

			<span style="padding: 0;margin: 0;width:52mm;font-size: 11px;font-weight: normal">-----------------------------------------------</span>
			<table style="padding: 0;margin: 0;line-height:100%;width:52mm;font-size: 11px;font-weight: normal">
				<tr>
					<td style="white-space: nowrap" width="20%">合计:</td>
					<td>{{orderData.consume_amount}}</td>
				</tr>
				<tr v-if="orderData.reduce_amount">
					<td style="white-space: nowrap">减免金额:</td>
					<td>{{orderData.reduce_amount}}</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">实付金额:</td>
					<td>{{orderData.paid_amount}}</td>
				</tr>
				<tr>
					<td style="white-space: nowrap;padding-right:10px">支付方式：</td>
					<td style="padding-right:20px">(
						<span v-if="orderData.cash_pay_amount">现金支付:{{orderData.cash_pay_amount}}&nbsp;</span>
						<span v-if="orderData.balance_pay_amount">余额支付:{{orderData.balance_pay_amount}}&nbsp;</span>
						<span v-if="orderData.custom_pay_amount">{{orderData.custom_pay_name}}:{{orderData.custom_pay_amount}}&nbsp;</span>
						)</td>
				</tr>

				<tr v-if="orderData.customer_has_prepaid_card">
					<td style="white-space: nowrap">储值余额: </td>
					<td>{{orderData.total_balance_after}}</td>
				</tr>

				<tr v-if="orderData.description">
					<td style="white-space: nowrap">备注: </td>
					<td>{{orderData.description}}</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">打印时间:</td>
					<td id="nowDate"></td>
				</tr>
				<tr>
					<td colspan="2"></td>
				</tr>
			</table>
		</div>

		</div>
	</div>
</template>

<script>

    import {getLodop} from '@/components/Receipts/LodopFuncsCloud.js'

    export default {
        name: "Receipts",
        props: {
            orderData: {
                type: Object
            },
        },
	    data() {
            return {
                user: {},
            }
	    },
	    methods: {
            export_data_old(){
                var timerId;
                var cnum=0;
                timerId=setInterval(function(){
                    if(cnum>10){
                        //clodopPageMess();
                        alert("C-Lodop没有安装好，或者服务没有启动，请安装后启动服务再试！");
                        clearInterval(timerId);
                    }
                    if(getLodop()){
                        clearInterval(timerId);
                        var LODOP;
                        LODOP=getLodop();
                        LODOP.SET_LICENSES("广州智哲信息科技有限公司","59344F898EE17DF0677DD1E8A683CA31","","");
                        var finalPrintHTML="";
                        var strFormHtml=document.getElementById("prdivID").innerHTML;
                        var imageHtml='';
                        var wxewmHtml='';
                        var curpubNum='1';
                        finalPrintHTML+=imageHtml+strFormHtml+wxewmHtml;
                        finalPrintHTML+='<table style="height: 30px;width:100%"><tr height="25px;"><td  height="25px;">&nbsp;</td></tr></table>';
                        //顶部,左边，宽度，高度，html
                        LODOP.SET_PRINT_PAGESIZE(3,"57mm","","");
                        LODOP.ADD_PRINT_HTM("5mm","-1mm","57mm","100%",finalPrintHTML);
                        //LODOP.PREVIEW();
                        LODOP.SET_PRINT_COPIES(curpubNum);
                        LODOP.SET_PRINTER_INDEX('t2');
                        LODOP.PRINT();
                    }
                    cnum++;
                },1000);
            },

            SaveNowtime() {
		        var d = new Date();
		        var year = d.getFullYear();
		        var month = change(d.getMonth() + 1);
		        var day = change(d.getDate());
		        var hour = change(d.getHours());
		        var minute = change(d.getMinutes());
		        var second = change(d.getSeconds());

		        function change(t) {
		            if (t < 10) {
		                return "0" + t;
		            } else {
		                return t;
		            }
		        }

		        var time = year + '-' + month + '-' + day + ' '
		            + hour + ':' + minute + ':' + second;

	            var nowDateE=document.getElementById("nowDate");
                nowDateE.innerHTML = time
		    },

            receiptsExport(){
                this.SaveNowtime();
                if(getLodop()){
                    // clearInterval(timerId);
                    var LODOP;
                    LODOP=getLodop();
                    LODOP.SET_LICENSES("广州智哲信息科技有限公司","59344F898EE17DF0677DD1E8A683CA31","","");
                    var finalPrintHTML="";
                    var strFormHtml=document.getElementById("prdivID").innerHTML;
                    var imageHtml='';
                    var wxewmHtml='';
                    var curpubNum='1';
                    finalPrintHTML+=imageHtml+strFormHtml+wxewmHtml;
                    finalPrintHTML+='<table style="height: 30px;width:100%"><tr height="25px;"><td  height="25px;">&nbsp;</td></tr></table>';
                    //顶部,左边，宽度，高度，html
                    LODOP.SET_PRINT_PAGESIZE(3,"57mm","","");
                    LODOP.ADD_PRINT_HTM("5mm","-1mm","57mm","100%",finalPrintHTML);
                    //LODOP.PREVIEW();
                    LODOP.SET_PRINT_COPIES(curpubNum);
                    LODOP.SET_PRINTER_INDEX('t2');
                    LODOP.PRINT();
                }else{
                    // alert("C-Lodop没有安装好，或者服务没有启动，请安装后启动服务再试！");
                }
            }
	    },
	    mounted() {
            if (localStorage.userInfo) {
                const userInfo = JSON.parse(localStorage.userInfo);
                if (userInfo) {
                    this.user = userInfo
                }
            }
        }
    }
</script>

<style scoped>

</style>
