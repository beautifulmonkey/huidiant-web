<template>
	<div>
<!--		<div class="store-info">-->
<!--			<i class="el-icon-s-shop"></i>&nbsp;-->
<!--			<span style="font-size: 12px;">才子造型</span>-->
<!--		</div>-->

		<div>
			<div class="card-bg">
				<div data-v-4419aff2="" class="head-wrap">
					<div data-v-4419aff2="" class="avatar-wrap">
						<img data-v-4419aff2="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAIAAAAFYYeqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMTAwNEYxRUY2MzAzM0NEN0M4MDQzOThDRUZFMzZGMUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTVDMjNDMjAxMzFBMTFFOTk2RDRBMzVBNEZBMDc1QTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTVDMjNDMUYxMzFBMTFFOTk2RDRBMzVBNEZBMDc1QTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWMxNGRjMDItNGEzYi1lNTQ5LWJlNDktNjhlOTkwN2ZmN2IwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MzM4NTc4OTAtMDFhYy0xMWU5LWI4ZGItZTEwZDkxMWExOTIw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" class="avatar">
						<i class="el-icon-male sex-icon" style="color: #409df3"></i>
					</div>

					<div data-v-4419aff2="" class="info-wrap flex-item">
						<div data-v-4419aff2="" class="username">李运峰</div>
						<div data-v-4419aff2="" class="version">
							<img data-v-4419aff2="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQTY2RDA0QTNCNjgxMUVBODZDRTk4NkNDMEJGRDY5RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQTY2RDA0QjNCNjgxMUVBODZDRTk4NkNDMEJGRDY5RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBNjZEMDQ4M0I2ODExRUE4NkNFOTg2Q0MwQkZENjlGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBNjZEMDQ5M0I2ODExRUE4NkNFOTg2Q0MwQkZENjlGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+u7lPgwAABopJREFUeNrEV2lsVUUU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" class="ver-icon">
							<div data-v-4419aff2="" class="version-text is-levelundefined">才子造型金卡</div>
						</div>
					</div>
				</div>
				<div data-v-4419aff2="" class="member-num-wrap"><span>NO.17610162918</span></div>
			</div>

			<div class="level-info-wrap">
				<div data-v-4419aff2="" class="level-text">
					尊享更多等级权益
				</div>
				<div data-v-4419aff2="" class="level-btn">
					了解详情
				</div>
			</div>
		</div>

		<div>
			<div class="card-info">
				<el-card>
					<div style="display: flex;width: 100%;align-items: center">
						<svg-icon icon-class="dashboard_wallet" style="font-size: 35px;color: #fbae11" />
						<div style="margin-left: 10px;">
							<span style="font-size: 12px;color: #555555">余额</span><br>
							<span style="font-weight: 500;">9912</span>
						</div>
					</div>
				</el-card>

				<el-card>
					<div style="display: flex;width: 100%;align-items: center">
						<svg-icon icon-class="dashboard_card" style="font-size: 35px;color: #fbae11" />
						<div style="margin-left: 10px;">
							<span style="font-size: 12px;color: #555555">卡项</span><br>
							<span style="font-weight: 500;">2</span>
						</div>
					</div>
				</el-card>
			</div>

		</div>

	</div>
</template>

<script>
    export default {
        name: "SubMe"
    }
</script>

<style scoped>

	.card-bg{
		width: 100%;
		height: 140px;
		background: url(https://yk.faisys.com/image/dist/bg1.e9b9c873.jpg) center center / cover no-repeat;
		/*position: absolute;*/
		position: relative;
		z-index: 111;
		border-radius: 10px;
	}

	.level-info-wrap{
		width: 100%;
		height: 50px;
		background: linear-gradient(90deg,#dca87b,#e4c29f);
		margin-top: -15px;
		z-index: 11;
		border-radius: 10px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.store-info{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 37px;
		color: #000;
	}

	.card-info {
		display: flex;
		margin-top: 20px;
		justify-content: space-between
	}
	.card-info div{
		/*height: 70px;*/
		width: 48%
	}
	.card-func {
		margin-top: 20px;
	}


	.head-wrap {
		display: flex;
		position: absolute;
		top: 20px;
		left: 20px;
	}
	.avatar-wrap{
		position: relative;
		width: 40px;
		height: 40px;
	}
	.avatar{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #fff;
		display: inline-block;
	}
	.sex-icon{
		position: absolute;
		z-index: 1;
		right: -8px;
		bottom: -8px;
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #fff;
		font-size: 23px;
		text-align: center;
		line-height: 32px;
		-webkit-transform: scale(.5);
		transform: scale(.5);
	}

	.info-wrap{
		display: inline-block;
		padding-left: 1em;
	}
	/*.flex-item {*/
	/*	-webkit-box-flex: 1;*/
	/*	-ms-flex: 1 0 0px;*/
	/*	flex: 1 0 0;*/
	/*}*/
	.username {
		color: #fdebd9;
		font-weight: 700;
		line-height: 1em;
	}

	.version{
		margin-top: 8px;
		line-height: 1;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.version-text {
		display: block;
		z-index: 1;
		min-width: 66px;
		font-weight: 700;
		padding-left: 12px;
		padding-right: 8px;
		font-size: 12px;
		color: #fafafa;
		border-radius: 0 6px 6px 0;
		margin-left: -9px;
		height: 16px;
		line-height: 16px;
		background-color: #fbae11;
		-webkit-transform: scale(.82) translate(-9%);
		transform: scale(.82) translate(-9%);
	}
	.ver-icon{
		display: block;
		width: 19px;
		height: 16px;
		z-index: 2;
	}

	.member-num-wrap {
		position: absolute;
		bottom: 20px;
		left: 20px;
		font-size: 14px;
		font-weight: 700;
		line-height: 1;
		color: #fdebd9;
	}

	.level-text[data-v-4419aff2] {
		font-size: 13px;
		color: #26201d;
		font-weight: 700;
		margin:10px;
	}

	.level-btn[data-v-4419aff2] {
		width: 72px;
		height: 23px;
		line-height: 23px;
		background: #221c19;
		color: #ffedda;
		border-radius: 12px;
		padding: 0;
		margin: 8px;
		font-size: 12px;
		text-align: center;
	}
	/deep/ .el-card__body {
		padding: 15px 20px;
	}
</style>
