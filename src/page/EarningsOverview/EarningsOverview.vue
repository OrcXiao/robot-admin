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
        value-format="yyyy-MM-dd"
        format="yyyy 年 MM 月 dd 日"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="initData" class="ml20">搜索</el-button>
      <el-button @click="resetData" type="info" class="ml20">重置</el-button>
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
        prop="order_manage"
        label="机器人">
      </el-table-column>
      <el-table-column
        prop="organize_zh"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="交易对">
      </el-table-column>
      <el-table-column
        prop="type_zh"
        label="交易方向">
      </el-table-column>
      <el-table-column
        prop="pocket_average_price_round"
        label="成交价">
      </el-table-column>
      <el-table-column
        prop="quote_currency_amount_round"
        label="计价币">
      </el-table-column>
      <el-table-column
        prop="profit_amount_round"
        label="盈利额">
      </el-table-column>
      <el-table-column
        prop="profit_amount_ratio"
        label="盈利比">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="标签">
      </el-table-column>
      <el-table-column
        width="160"
        prop="created_at"
        label="时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="Mixin_handleSizeChange"
      @current-change="Mixin_handleCurrentChange"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="tableDataLength">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "EarningsOverview",
    data(){
      return {
        //翻页序号
        page: 1,
        //表格每页大小
        per_page: 10,
        //表格数据
        tableData: [],
        //表格总数据
        tableDataLength: 0,
        //机器人候选项
        robotOptions: [],
        //机器人
        robot: '',
        //时间
        time: [],
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.getRobotList();
        this.initData();
      })
    },
    methods: {
      //获得数据
      initData(){
        let params = {
          page: this.page,
          date: this.time,
          robot_id: this.robot,
        };
        this.$api.EarningsOverview.getEarnings(params).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.tableData = data.data;
            this.tableDataLength = data.total;
          }
        });
      },

      //点击'重置'按钮
      resetData(){
        this.robot = '';
        this.time = [];
        this.initData();
      },

      //获得机器人列表
      getRobotList(){
        this.$api.EarningsOverview.robotList().then(res => {
          if(res.data && res.data.status === 1000){
            this.robotOptions = res.data.data;
            this.robotOptions.unshift({
              name: '全部',
              id: ''
            })
          }
        });
      },
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped>

</style>
