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
        <el-select v-model="formInline.region" placeholder="蚌埠市">
          <el-option label="蚌埠市" value="445"></el-option>
          <el-option label="北京市" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间段：">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
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
        formInline: {},
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: ''
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

  .v-stre {
    line-height: 40px;
  }
  .el-form-item__label{
    color: #fff !important;
  }

  .el-breadcrumb__inner, .el-breadcrumb__inner a {
    font-weight: normal;
    -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
    transition: color .2s cubic-bezier(.645, .045, .355, 1);
    color: #00ffd6;
  }
</style>
