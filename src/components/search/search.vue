<template>
	<div class="v-search">
		<!--面包屑-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<span class=v-location><i class=el-icon-caret-right></i>当前位置：</span>
			<a class="v-bread" href="/#/">报表统计 > </a>
			<a class="v-bread" href="javascript:;">服务亭统计排行</a>
		</el-breadcrumb>

		<!--search-->
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
      <span class=v-stre>
      <i class="el-icon-location"></i>
      </span>
			<el-form-item label="所属地区：">
				<el-select v-model="formInline.region" placeholder="蚌埠市" :style="{'width': '150px'}">
					<el-option label="蚌埠市" value="445"></el-option>
					<el-option label="北京市1" value="1"></el-option>
					<el-option label="北京市2" value="2"></el-option>
					<el-option label="北京市3" value="3"></el-option>
					<el-option label="北京市4" value="4"></el-option>
					<el-option label="北京市5" value="5"></el-option>
					<el-option label="北京市6" value="6"></el-option>
					<el-option label="北京市7" value="7"></el-option>
					<el-option label="北京市8" value="8"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间段：">
				<el-date-picker
						v-model="value1"
						type="date"
						placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<span>——&nbsp;&nbsp;</span>
			<el-form-item label="结束时间：">
				<el-date-picker
						v-model="value2"
						type="date"
						placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="sd-yellow" @click="onSubmit">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				value1: '',
				value2: ''
			}
		},
		methods: {
			onSubmit() {
				console.log('查询!');
				alert(1)
			}
		}
	}
</script>
<style lang="less">
	.v-search {
		height: 128px;
		background: url('../../assets/img/searchslide-bg.png');
		background-size: 100% 100%;
		color: #fff;
		padding: 0 20px;

		.el-breadcrumb {
			height: 60px;
			line-height: 60px;

			.v-location {
				float: left;
				font-size: 16px;
				.el-icon-caret-right {
					color: #28b51f;
					font-size: 20px;
				}
			}

			.v-bread {
				font-size: 16px;
				font-weight: normal !important;
				color: #00ffd6 !important;
			}
			a.v-bread:last-child {
				color: #fff !important;
			}
		}

	}

	.el-form{
		margin-top: 10px;
	}
	.v-stre {
		line-height: 40px;
		.el-icon-location{
			color: #ffab19;
		}
	}

	.el-form-item__label {
		color: #fff !important;
	}
	//面包屑
	.el-breadcrumb__inner, .el-breadcrumb__inner a {
		font-weight: normal;
		-webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
		transition: color .2s cubic-bezier(.645, .045, .355, 1);
		color: #00ffd6;
	}
	//日历
	.el-date-picker{
		background: url(../../assets/img/data-picker-bg.png) no-repeat;
		background-size: 100% 100%;
		border: transparent;
	}
	.el-picker-panel__icon-btn, .el-date-picker__header-label{
		color: #fff;
	}
	.el-date-table td.next-month, .el-date-table td.prev-month{
		//color: #666;
	}
	.el-date-table td.current:not(.disabled) span{
		background: #ffab19;
	}
	.el-date-table td.available:hover{
		color: #fff;
	}
	.el-date-table td.today span{
		color: #fff;
	}
	.el-icon-date{
		font-size: 20px;
		color: #ffab19;
	}
	.el-input__inner{
		background: transparent;
		border: 1px solid #999;
		color: #fff;
	}
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 150px;
	}
	.el-icon-arrow-up:before{
		color: #ffab19;
	}
	//弹出框箭头
	.el-popper .popper__arrow{
		display: none;
	}

	//下拉框
	.el-select-dropdown__list{
		background: url(../../assets/img/select-bg.png) repeat-y;
		background-size: 100% 100%;
	}
	.el-select-dropdown__item.selected{
		color: #ffab19;
	}
	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
		background: url(../../assets/img/select-hover-bg.png) repeat-x;
		background-size: 100% 100%;
		color: #ffab19;
	}
	.el-select-dropdown{
		box-shadow: none;
		background-color: transparent;
		 border: 1px solid transparent;
	}
	.el-select-dropdown__item{
		color: #fff;
	}
	//按钮颜色
	.el-button--sd-yellow{
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}
	.el-button:focus, .el-button:hover{
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}
</style>
