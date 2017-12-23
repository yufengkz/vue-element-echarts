<template>
	<el-table
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
	</el-table>
</template>

<script>
	export default {
		props: {
			userNumList: Array
		},
		data() {
			return {}
		}
	}
</script>
<style lang="less">
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
</style>
