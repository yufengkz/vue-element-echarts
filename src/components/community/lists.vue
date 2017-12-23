<template>
	<el-table
			:data="weightUser"
			style="width: 100%">
		<el-table-column
				prop="nickname"
				id="id"
				label="服务亭/打包站名称"
				align="center">
		</el-table-column>
		<el-table-column
				prop="net_weight"
				label="回收量"
				width="140"
				align="center">
		</el-table-column>
		<el-table-column
				prop="delivery_weight"
				label="交运量"
				width="140"
				align="center">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		props: {
			weightUser: Array
		},
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
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
