<!-- 柱状图 -->
<template>
	<div class="columnChart">
		<!--搜索组件-->
		<div class="v-search">
			<!--面包屑-->
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<span class=v-location><i class=el-icon-caret-right></i>当前位置：</span>
				<a class="v-bread" href="javascript:;">溯源展示</a>
			</el-breadcrumb>
			<!--search-->
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
				<span class=v-stre>
					<i class="el-icon-location"></i>
				</span>
				<el-form-item label="时间段：">
					<el-date-picker
							v-model="searchData.beginTime"
							type="date"
							placeholder="开始日期">
					</el-date-picker>
				</el-form-item>
				<span>——&nbsp;&nbsp;</span>
				<el-form-item label="">
					<el-date-picker
							v-model="searchData.endTime"
							type="date"
							placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="订单号：">
					<el-input v-model="searchData.orderNum" placeholder="请输入订单号"></el-input>
				</el-form-item>
				<el-form-item label="手机号：">
					<el-input v-model="searchData.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="sd-yellow" @click="onSubmit">确定</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--图表-->
		<el-row>
			<el-col :span="24">
				<div>
					<ProcessLists :searchData="searchData" ref="ProcessLists"></ProcessLists>
				</div>
			</el-col>
		</el-row>

	</div>

</template>

<script>
	import SearchSlide from '../search/search'
	import ProcessLists from './process'

	export default {
		created() {
			//console.log(this.$store.state.color)
		},
		data() {
			return {
				searchData: {
					beginTime: new Date(this.$store.state.searchData.beginTime).getTime() || '',
					endTime: new Date(this.$store.state.searchData.endTime).getTime() || '',
					orderNum: this.$store.state.searchData.orderNum || '',
					mobile: this.$store.state.searchData.mobile || ''
				},

				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},

				//区列表
				countyLists: [],

			}
		},
		methods: {
			//查询数据
			onSubmit() {
				this.$store.commit('setSearchData', this.searchData)
				//console.log(this.searchData)
				//this.$refs.ProcessLists.$emit('aa')
				this.$refs.ProcessLists._getLists()
			}
		},
		mounted() {
			console.log(this.searchData);
		},
		components: {
			ProcessLists
		},

	}
</script>

<style lang="less">
	.el-row {
		margin-top: 20px;
	}

	.el-col-12 {
		width: 49.1%;
	}

	/*search*/
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

	.el-form {
		margin-top: 10px;
	}

	.v-stre {
		line-height: 40px;
		.el-icon-location {
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
	.el-date-picker {
		background: url(../../assets/img/data-picker-bg.png) no-repeat;
		background-size: 100% 100%;
		border: transparent;
	}

	.el-picker-panel__icon-btn, .el-date-picker__header-label {
		color: #fff;
	}

	.el-date-table td.next-month, .el-date-table td.prev-month {
		//color: #666;
	}

	.el-date-table td.current:not(.disabled) span {
		background: #ffab19;
	}

	.el-date-table td.available:hover {
		color: #fff;
	}

	.el-date-table td.today span {
		color: #fff;
	}

	.el-icon-date {
		font-size: 20px;
		color: #ffab19;
	}

	.el-input__inner {
		background: transparent;
		border: 1px solid #999;
		color: #fff;
	}

	//picker宽度
	.el-date-editor.el-input, .el-date-editor.el-input__inner, .el-input .el-input__inner {
		width: 140px;
	}

	.el-icon-arrow-up:before {
		color: #ffab19;
	}

	//弹出框箭头
	.el-popper .popper__arrow {
		display: none;
	}

	//下拉框
	.el-select-dropdown__list {
		background: url(../../assets/img/select-bg.png) repeat-y;
		background-size: 100% 100%;
	}

	.el-select-dropdown__item.selected {
		color: #ffab19;
	}

	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
		background: url(../../assets/img/select-hover-bg.png) repeat-x;
		background-size: 100% 100%;
		color: #ffab19;
	}

	.el-select-dropdown {
		box-shadow: none;
		background-color: transparent;
		border: 1px solid transparent;
	}

	.el-select-dropdown__item {
		color: #fff;
	}

	//按钮颜色
	.el-button--sd-yellow {
		width: 100px;
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}

	.el-button:focus, .el-button:hover {
		background: #ffab19;
		color: #fff;
		border: 1px solid #ffab19;
	}
</style>
