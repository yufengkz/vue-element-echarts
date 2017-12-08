<template>
	<div class="v-search">
		<!--面包屑-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<span class=v-location><i class=el-icon-caret-right></i>当前位置：</span>
			<el-breadcrumb-item :to="{ path: '/' }">报表统计</el-breadcrumb-item>
			<el-breadcrumb-item>服务亭统计排行</el-breadcrumb-item>
		</el-breadcrumb>
		<!--search-->
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="审批人">
				<el-input v-model="formInline.user" placeholder="审批人"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-select v-model="formInline.region" placeholder="活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>
<style lang="less" scoped>
	.v-search {
		height: 128px;
		background: url('../../assets/img/searchslide-bg.png');
		background-size: 100% 100%;

		.el-breadcrumb{
			height: 60px;
			line-height: 60px;

			.v-location{
				float: left;
				font-size: 16px;
				.el-icon-caret-right{
					color: #28b51f;
					font-size: 20px;
				}
			}

			.el-breadcrumb__item{
				font-size: 18px;
				font-weight: normal !important;
				color: #00ffd6 !important;

				.el-breadcrumb__inner a{
					color: #00ffd6 !important;
				}
			}
		}

	}

	.el-breadcrumb__inner, .el-breadcrumb__inner a{
		font-weight: normal;
		-webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
		transition: color .2s cubic-bezier(.645,.045,.355,1);
		color: #00ffd6;
	}
</style>