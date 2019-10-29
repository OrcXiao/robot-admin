<template>
  <div class="bkFFFFFF p30  EarningsPandect-wrap">
    <div class="pb30">
      <span class="pr20">机器人 :</span>
      <el-select class="pr20" style="width: 160px" v-model="robot" placeholder="请选择机器人">
        <el-option
          v-for="(item, index) in robotOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="success" class="ml20">搜索</el-button>
      <el-button type="info" class="ml20">重置</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="机器人">
      </el-table-column>
      <el-table-column
        prop="name"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="name"
        label="交易对">
      </el-table-column>
      <el-table-column
        prop="name"
        label="交易方向">
      </el-table-column>
      <el-table-column
        prop="name"
        label="成交价">
      </el-table-column>
      <el-table-column
        prop="name"
        label="计价币">
      </el-table-column>
      <el-table-column
        prop="name"
        label="盈利额">
      </el-table-column>
      <el-table-column
        prop="name"
        label="盈利比">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="name"
        label="时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="Mixin_handleSizeChange"
      @current-change="Mixin_handleCurrentChange"
      :current-page="4"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="70">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "EarningsOverview",
    data(){
      return {
        //表格数据
        tableData:[],
        //机器人候选项
        robotOptions: [],
        //机器人
        robot: '',
        //时间
        time: ''
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      //this.$ nextTick(() => {

      //})
    },
    methods: {},
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped>

</style>
