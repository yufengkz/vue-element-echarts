<template>
	<div>
		<!--<el-table
				:data="userNumList"
				style="width: 100%">
			<el-table-column
					prop="nickname"
					label="服务亭/打包站名称"
					align="center">
			</el-table-column>
			<el-table-column
					prop="num"
					label="用户量/对接量"
					width="200"
					align="center">
			</el-table-column>
		</el-table>-->

		<table class="el-table" align="center">
			<thead>
				<th style="text-align: center; color: #fff; font-weight: normal;">{{headerData.title}}</th>
				<th style="text-align: center; color: #fff; font-weight: normal;">{{headerData.userCount}}</th>
			</thead>
			<tbody class="el-table-column" v-if="userNumList.length > 0">
				<tr v-for="item in userNumList" align="center">
					<td>{{item.nickname}}</td>
					<td>{{item.num}}个</td>
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
			userNumList: Array,
			headerData: Object
		},
		data() {
			return {
			}
		},
		mounted() {
		}
	}
</script>
<style lang="less">
	.el-table, .el-table__expanded-cell {
		background-color: #051030;
	}

	.el-table tr {
		background: #051030;
		color: #fff;
	}

	.el-table td, .el-table th.is-leaf {
		border-bottom: 1px solid transparent;
	}

	.el-table--enable-row-hover .el-table__body tr:hover > td {
		background-color: #051030;
	}

	table {
		border-collapse: inherit;
	}

	.el-table--border::after, .el-table--group::after, .el-table::before {
		background-color: transparent;
	}
</style>
