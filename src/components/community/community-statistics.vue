<!-- 柱状图 -->
<template>
	<div class="columnChart">
		<!--搜索组件-->
		<div class="v-search">
			<!--面包屑-->
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<span class=v-location><i class=el-icon-caret-right></i>当前位置：</span>
				<a class="v-bread" href="javascript:;" onclick="history.back()">报表统计  > </a>
				<a class="v-bread" href="javascript:;">服务亭数据统计</a>
			</el-breadcrumb>
			<!--search-->
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
				<span class=v-stre>
					<i class="el-icon-location"></i>
				</span>
				<el-form-item label="所属城市：">
					<el-select disabled v-model="searchData.cityName" placeholder="蚌埠市" :style="{'width': '140px'}">
						<el-option label="蚌埠市" value="445"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属地区：">
					<el-select value-key="searchData.countyId" v-model="searchData.countyId" placeholder="请选择" :style="{'width': '140px'}">
						<el-option label="请选择" value="0"></el-option>
						<el-option
								v-for="(item, index) in countyLists"
								:key="item.index"
								:label="item.name"
								:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间段：">
					<el-date-picker
							v-model="searchData.startDate"
							type="date"
							placeholder="开始日期">
					</el-date-picker>
				</el-form-item>
				<span>——&nbsp;&nbsp;</span>
				<el-form-item label="">
					<el-date-picker
							v-model="searchData.endDate"
							type="date"
							placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="sd-yellow" @click="onSubmit">确定</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--图表-->
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<!--柱状图-->
					<column ref="initColumn" :columnData="columnData"></column>
				</div>
			</el-col>
			<el-col :span="12" :style="{'margin-left': '20px'}">
				<div class="grid-content bg-purple-light">
					<!--折线图-->
					<multipleColumn ref="initMultipleColumn" :multipleColumnData="multipleColumnData"></multipleColumn>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="list_bd">
					<!--list-->
					<lists :weightUser="weightUser"></lists>
				</div>
			</el-col>
			<el-col :span="12" :style="{'margin-left': '20px'}">
				<div class="list_bd">
					<!--list-->
					<userCountLists :userNumList="userNumList"></userCountLists>
				</div>
			</el-col>
		</el-row>

	</div>

</template>

<script>
	import axios from 'axios'
	import SearchSlide from '../search/search'
	import column from '../column/column'
	import multipleColumn from '../multipleColumn/multipleColumn'
	import lists from './lists'
	import userCountLists from './userCountLists'

	export default {
		created() {
			//console.log(this.$store.state.color)
		},
		data() {
			return {
				searchData: {
					cityId: '',
					countyId: '',
					startDate: '',
					endDate: ''
				},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				countyLists: this.$store.state.countyLists,
				columnData: {}, //柱状图数据
				multipleColumnData: [], //折线图数据
				weightUser: [], //回收交运量
				userNumList: [], //用户量
			}
		},
		methods: {
			getLists() {
				console.log(this.searchData.startDate);
				var params = new URLSearchParams()
				params.append('cityId', this.searchData.cityId  || 103)
				params.append('countyId', this.searchData.countyId || 1042)
				params.append('startDate', new Date(this.searchData.startDate).getTime() || new Date().getTime())
				params.append('endDate', new Date(this.searchData.endDate).getTime() || '')
				axios.post('/countranking/sumranking', params).then((data) => {
					//调试先反转一下
					if(data.data.code == 0){
						let res = data.data.data
						console.log(res);
						//柱状图
						this.columnData = {
							huishou: res.fwtdayhuishou,
							fahuo: res.fwtdayfahuo
						}
						//折线图数据
						this.multipleColumnData = res.userList
						//列表
						//weightUser
						this.weightUser = res.weightUser

						//用户量
						this.userNumList = res.userNumList
					}

				}).then(() => {
					//柱状图
					if(this.columnData) this.$refs.initColumn.initColumn()
					//散点图
					if(this.multipleColumnData) this.$refs.initMultipleColumn.initColumn()

				}).catch((e) => {
					console.log(e);
				})
			},
			onSubmit() {
				console.log('search:');
				console.log(this.searchData);
				this.getLists()
			}
		},
		mounted() {
			this.getLists()
			console.log('==========');
			console.log(this.$store.state.countyLists);

		},
		components: {
			SearchSlide,
			column, //柱状图
			multipleColumn, //折线图
			lists, //lists
			userCountLists //用户量
		}

	}
</script>

<style lang="less">
	.el-row {
		margin-top: 20px;
	}

	.el-col-12 {
		width: 49.1%;
	}
	.list_bd{
		border: 1px solid #385585;
		margin-top: 20px;
		padding-top: 15px;
		background: #051030;
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
	.el-input.is-disabled .el-input__inner{
		background-color: transparent;
		border-color: #999;
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
