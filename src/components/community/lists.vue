<template>
	<div>
		<table class="el-table">
			<thead>
				<th style="text-align: center; color: #fff; font-weight: normal;">{{headerData.title}}</th>
				<th style="text-align: center; color: #fff; font-weight: normal;">{{headerData.getCount}}</th>
				<th style="text-align: center; color: #fff; font-weight: normal;">{{headerData.sendCount}}</th>
			</thead>
			<tbody v-if="weightUser.length > 0">
				<tr v-for="item in weightUser">
					<td align="center">{{item.nickname}}</td>
					<td align="center">{{item.net_weight}}kg</td>
					<td align="center">{{item.delivery_weight}}kg</td>
				</tr>
			</tbody>
			<tbody class="el-table-column" v-else>
				<tr align="center">
					<td style="text-align: center; color: #666; font-weight: normal;" colspan="20">暂无数据</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		props: {
			weightUser: Array,
			headerData: Object
		},
		data() {
			return {
				title: '服务亭名称',
				userCount: '用户量',
				getCount: '回收量',
				sendCount: '交运量'
			}
		},
		mounted() {
		}
	}
</script>
<style lang="less">
	.el-table th, .el-table tr{
		background-color: #051030 !important;
	}
	.el-table, .el-table__expanded-cell{
		background-color: #051030;
	}
	.el-table tr{
		background: #051030;
		color: #fff;
	}
	.el-table td, .el-table th.is-leaf{
		border-bottom: 1px solid transparent;
	}
	.el-table--enable-row-hover .el-table__body tr:hover>td{
		background-color: #051030;
	}
	table {
		border-collapse: inherit;
	}
	.el-table--border::after, .el-table--group::after, .el-table::before{
		background-color: transparent;
	}
	.el-table__body-wrapper{
		overflow: inherit;
	}
</style>
