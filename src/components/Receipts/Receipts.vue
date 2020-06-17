<template>
	<div style="text-align: left">
		<body>
		<input type="hidden" id="thisCtxPath" value=""/>
		<div id="prdivID" style="padding-right:10px">
			<div style='width:49mm;margin-top: 5;overflow:hidden;text-align: center;
		font-size:16px;white-space: nowrap'>
				秀阁造型
			</div>
			<table  style="padding: 0;margin: 0;line-height:100%;width:52mm;
		font-size:11;font-weight: normal">
				<tr>
					<td> &nbsp;</td>
					<td> &nbsp;</td>
				</tr>
				<tr>
					<td width="20%" style="white-space: nowrap">单据号:</td>
					<td>XF2020000981</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">操作人:</td>
					<td>老虎</td>
				</tr>
				<tr>
					<td style="white-space: nowrap">操作类型:</td>
					<td>[消费收银]</td>
				</tr>

				<tr>
					<td style="white-space: nowrap">消费人:</td>
					<td>散客</td>
				</tr>

				<tr>
					<td style="white-space: nowrap">消费时间:</td>
					<td>2020/06/16 16:44:30</td>
				</tr>
			</table>
			<span style="padding: 0;margin: 0;width:52mm;font-size: 11;font-weight: normal">
		-----------------------------------------------
	</span>
			<table style="padding: 0;margin: 0;line-height:100%;width:52mm;font-size: 11;font-weight: normal">


				<tr>
					<td width="35%" colspan="4" style="text-align: left;">剪发</td>
				</tr>
				<tr>
					<td width="10%" style="white-space: nowrap;text-align: left;">数量</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">原价</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">折扣</td>
					<td width="10%" style="white-space: nowrap;text-align: left;">零售价</td>
				</tr>
				<tr>
					<td >1</td>
					<td >50<br/></td>
					<td >100<br/></td>
					<td >50<br/></td>
				</tr>

			</table>

			<span style="padding: 0;margin: 0;width:52mm;font-size: 11;font-weight: normal">
	   	-----------------------------------------------
	</span>
			<table style="padding: 0;margin: 0;line-height:100%;width:52mm;font-size: 11;font-weight: normal">

				<tr>
					<td style="white-space: nowrap" width="20%">原价金额:</td>
					<td>50</td>
				</tr>
				<tr style="display:none">
					<td style="white-space: nowrap">优惠金额:</td>
					<td>0</td>
				</tr>


				<tr>
					<td style="white-space: nowrap">实付金额:</td>
					<td>50</td>
				</tr>

				<tr>
					<td style="white-space: nowrap">实收金额:</td>
					<td>50</td>
				</tr>

				<tr>
					<td style="white-space: nowrap;padding-right:10px">支付方式：</td>
					<td style="padding-right:20px">（微信支付:50.00）</td>
				</tr>


				<tr>
					<td style="white-space: nowrap">备注:</td>
					<td></td>
				</tr>
				<tr>
					<td style="white-space: nowrap">打印时间:</td>
					<td>2020/06/16 21:46:39</td>
				</tr>
				<tr>
					<td colspan="2"></td>
				</tr>
			</table>
		</div>


		</body>
	</div>
</template>

<script>

    import {getLodop} from '@/components/Receipts/LodopFuncsCloud.js'

    export default {
        name: "Receipts",
	    methods: {
            export_data(){
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

	    },
	    mounted() {
            this.export_data()
        }
    }
</script>

<style scoped>

</style>
