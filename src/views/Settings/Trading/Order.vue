<template>
	<h1>开单</h1>
</template>

<script>
    export default {
        name: "Order"
    }
</script>

<style scoped>

</style>


<!--<template>-->
<!--	<div class="demo">-->
<!--		<el-button @click="printPdf" >打印</el-button>-->

<!--		<form id="form1">-->
<!--			<table border="1" width="300" id="tb01" bgcolor="#CCFFCC" style="border:solid 1px black;border-collapse:collapse"><tr><td width="133" id="mtb001">-->
<!--				<font face="黑体" color="#FF0000" size="3"><u>&nbsp;《表单一》&nbsp;</u></font></td></tr></table>-->
<!--			<table border="1" width="300" height="106" cellspacing="0" bgcolor="#CCFFFF"style="border-collapse:collapse;table-layout:fixed;border:solid 1px black;"><tr>-->
<!--				<td width="66" height="16" style="border:solid 1px black"><font color="#0000FF">A</font><font color="#0000FF">等</font></td>-->
<!--				<td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">B</font><font color="#0000FF">等</font></td>-->
<!--				<td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">C</font><font color="#0000FF">等</font></td></tr>-->
<!--				<tr>-->
<!--					<td width="66" height="16" style="border:solid 1px black">A<sub>01</sub></td>-->
<!--					<td width="80" height="12" style="border:solid 1px black">中-001</td>-->
<!--					<td width="51" height="12" style="border:solid 1px black">C1<sup>x</sup></td>-->
<!--				</tr>-->
<!--				<tr>-->
<!--					<td width="66" height="16" style="border:solid 1px black">A<sub>02</sub>Φ</td>-->
<!--					<td width="80" height="16" style="border:solid 1px black">日-スの</td>-->
<!--					<td width="51" height="16" style="border:solid 1px black"><font face='Vernada'>7&#13221</font></td>-->
<!--				</tr>-->
<!--				<tr><td width="66" height="16" style="border:solid 1px black;overflow:hidden">A<sub>03</sub><nobr>over隐藏后面的：1234567890</nobr>-->
<!--				</td><td width="80" height="16" style="border:solid 1px black;overflow:hidden">韩-안녕</td><td width="51" height="16">C3<sup>x</sup>-->
<!--				</td></tr> </table>-->
<!--		</form>-->
<!--	</div>-->
<!--</template>-->

<!--<script>-->

<!--    import {getLodop} from '@/utils/LodopFuncs'-->

<!--    export default {-->
<!--        name: "demo",-->
<!--        data() {-->
<!--            return {}-->
<!--        },-->
<!--        methods: {-->
<!--            // 查询数据-->
<!--            printPdf() {-->
<!--                let LODOP = getLodop();-->
<!--                LODOP.PRINT_INIT("订货单");-->
<!--                LODOP.SET_PRINT_STYLE("FontSize", 18);-->
<!--                LODOP.SET_PRINT_STYLE("Bold", 1);-->
<!--                LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");-->
<!--                LODOP.ADD_PRINT_HTM(88, 200, 350, 600,-->
<!--                    document.getElementById("form1").innerHTML);-->
<!--//    LODOP.PRINT();-->
<!--                LODOP.PREVIEW();-->
<!--            },-->
<!--        }-->
<!--    }-->
<!--</script>-->

