<template>
  <div class="bkFFFFFF p30 RobotDetails-wrap">
    <div class="pb30">
      <span class="pr20">类型 :</span>
      <el-select
        class="pr20"
        style="width: 160px"
        v-model="type"
        placeholder="请选择类型">
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="Mixin_filterCondition">搜索</el-button>
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
        prop="type_zh"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="plan_zh"
        label="策略">
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="交易对">
      </el-table-column>
      <el-table-column
        prop="pocket_price"
        label="总持仓">
      </el-table-column>
      <el-table-column
        prop="average_price_round"
        label="当前价格">
      </el-table-column>
      <el-table-column
        prop="pocket_average_price"
        label="持仓均价">
      </el-table-column>
      <el-table-column
        prop="next_buy_price"
        label="预计补仓价">
      </el-table-column>
      <el-table-column
        prop="next_sell_price"
        label="预计平仓价">
      </el-table-column>
      <el-table-column
        prop="now_make_up_position_pretty"
        label="补仓阶段">
      </el-table-column>
      <el-table-column
        prop="finish_order_num"
        label="平仓次数">
      </el-table-column>
      <el-table-column
        prop="status_zh"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="last_run_at_zh"
        label="最后运行">
      </el-table-column>
      <el-table-column
        width="450"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="clickEditBtn(scope.row)"
            icon="el-icon-edit"
            :loading="scope.row.loadingEditState"
            type="success">
            {{scope.row.loadingEditState ? '加载' : '修改'}}
          </el-button>
          <el-button
            @click="clickPositionBtn(scope.row)"
            icon="el-icon-shopping-cart-2"
            :loading="scope.row.loadingPositionState"
            type="info">
            {{scope.row.loadingEditState ? '加载' : '持仓'}}
          </el-button>
          <el-button
            @click="clickEarningsBtn(scope.row)"
            icon="el-icon-s-goods"
            :loading="scope.row.loadingEarningsState"
            type="warning">
            {{scope.row.loadingEditState ? '加载' : '收益'}}
          </el-button>
          <el-button
            @click="clickCloseAPositionBtn(scope.row)"
            icon="el-icon-data-line">闪电平仓
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="Mixin_handleSizeChange"
      @current-change="Mixin_handleCurrentChange"
      :page-size="per_page"
      layout="total, prev, pager, next, jumper"
      :total="tableDataLength">
    </el-pagination>

    <!--收益弹框-->
    <el-dialog
      title="收益"
      :visible.sync="isShowEarningsDialog"
      :append-to-body=true
      width="1100px">
      <el-table
        border
        :data="earningsTableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="交易对">
        </el-table-column>
        <el-table-column
          prop="quote_currency_amount_round"
          label="盈利额">
        </el-table-column>
        <el-table-column
          prop="quote_currency_profit_amount_round"
          label="盈利额(计价币)">
        </el-table-column>
        <el-table-column
          prop="total_ratio"
          label="总盈利(%)">
        </el-table-column>
        <el-table-column
          prop="last_run_at"
          label="最后运行时间">
        </el-table-column>
        <el-table-column
          prop="created_at"
          width="170"
          label="订单开始时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            {{scope.row.status === 5 ? '已丢弃' : '已完成'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="clickDetailsBtn(scope.row)"
              icon="el-icon-tickets"
              type="warning">详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="Mixin_handleSizeChange"
        @current-change="Mixin_handleCurrentChange"
        :page-size="per_page"
        layout="total, prev, pager, next, jumper"
        :total="earningsTableDataLength">
      </el-pagination>
    </el-dialog>

    <!--收益详情弹框-->
    <el-dialog
      title="持仓"
      :visible.sync="isShowEarningsDetailsDialog"
      :append-to-body=true
      width="1200px">
      <el-table
        border
        :data="earningsDetailsTableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="now_make_up_position_pretty"
          label="补仓位置">
        </el-table-column>
        <el-table-column
          prop="pocket_average_price_round"
          label="当时价格">
        </el-table-column>
        <el-table-column
          prop="quote_currency"
          label="计价币">
        </el-table-column>
        <el-table-column
          prop="base_currency"
          label="交易币">
        </el-table-column>
        <el-table-column
          prop="profit_amount_round"
          width="150"
          label="盈利额">
        </el-table-column>
        <el-table-column
          prop="quote_currency_profit_amount_round"
          width="150"
          label="盈利额(计价币)">
        </el-table-column>
        <el-table-column
          prop="profit_amount_ratio"
          label="盈利(%)">
        </el-table-column>
        <el-table-column
          prop="type_zh"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="action_type"
          label="操作记录">
        </el-table-column>
        <el-table-column
          label="标签">
          <template slot-scope="scope">
            <el-tag v-if="(scope.row.operate & 8) === 8" type="danger">防瀑布</el-tag>
            <el-tag v-if="(scope.row.operate & 32) === 32" type="warning">追踪止盈</el-tag>
            <el-tag v-if="(scope.row.operate & 64) === 64" type="success">网格</el-tag>
            <el-tag v-if="(scope.row.operate & 128) === 128">横盘</el-tag>
            <el-tag v-if="(scope.row.operate & 256) === 256" type="info">优先卖出</el-tag>
            <el-tag v-if="(scope.row.operate & 512) === 512" type="info">强制平仓</el-tag>
            <el-tag v-if="(scope.row.operate & 1024) === 1024" type="info">网格清仓</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          prop="complete_at"
          label="完成时间">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--修改弹框-->
    <el-dialog
      title="修改机器人"
      @close="Mixin_closeDialog('robotObj', 'isShowEditRobotDialog')"
      :visible.sync="isShowEditRobotDialog"
      :append-to-body=true
      width="400px">
      <el-form
        :model="robotObj"
        :rules="robotObjRules"
        ref="robotObj"
        label-position="right"
        label-width="140px">
        <el-form-item label="策略" prop="tactics">
          <el-select class="wd100" v-model="robotObj.tactics" placeholder="请选择策略">
            <el-option
              v-for="item in tacticsOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网格清仓">
          <el-switch v-model="robotObj.GridClearance"></el-switch>
        </el-form-item>
        <el-form-item v-if="robotObj.GridClearance" label="网格清仓百分比" prop="percentage">
          <div class="dis-fl">
            <el-input
              @input.native="Mixin_commonLimitInput('robotObj.percentage', 2, 0, false)"
              v-model="robotObj.percentage"
              placeholder="请输入网格清仓百分比"></el-input>
            <div class="ml20">%</div>
          </div>
        </el-form-item>
        <el-form-item label="停止补仓">
          <el-switch :active-value="2" :inactive-value="1" v-model="robotObj.StopCover"></el-switch>
        </el-form-item>
        <el-form-item label="运行状态">
          <el-switch v-model="robotObj.RunningStatus"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowEditRobotDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitEdit('robotObj')">保 存</el-button>
		  </span>
    </el-dialog>

    <!--闪电平仓-->
    <el-dialog
      title="闪电平仓"
      @close="Mixin_closeDialog('CloseAPositObj', 'isShowCloseAPositionDialog')"
      :visible.sync="isShowCloseAPositionDialog"
      :append-to-body=true
      width="400px">
      <el-form
        ref="CloseAPositObj"
        label-position="right"
        label-width="120px">
        <el-form-item label="当前持有仓位 :">
          <div>{{CloseAPositObj.shipping}}</div>
        </el-form-item>
        <el-form-item label="当前盈利率 :">
          <el-tag
            v-if="CloseAPositObj.earningsRate < 0"
            type="success"
            effect="dark">{{CloseAPositObj.earningsRate}}%
          </el-tag>
          <span v-if="CloseAPositObj.earningsRate === 0">{{CloseAPositObj.earningsRate}}</span>
          <el-tag
            v-if="CloseAPositObj.earningsRate > 0"
            type="danger"
            effect="dark">{{CloseAPositObj.earningsRate}}%
          </el-tag>
        </el-form-item>
        <div class="tc">请你确认是否全部平仓 ?</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowCloseAPositionDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitCloseAPosit">保 存</el-button>
		  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "RobotDetails",
    data(){
      return {
        //翻页序号
        page: 1,
        //表格每页大小
        per_page: 10,
        //机器人id
        robotId: '',
        //类型
        type: '',
        //类型候选项
        typeOptions: [
          {
            id: '',
            name: '全部'
          },
          {
            id: 1,
            name: '看多'
          },
          {
            id: 2,
            name: '看空'
          },
        ],
        //初始表格数据
        tableData: [],
        //初始表格总数据数量
        tableDataLength: 0,
        //显示收益弹框
        isShowEarningsDialog: false,
        //策略候选项数组
        tacticsOptions: [],
        //收益表格数据
        earningsTableData: [],
        //收益表格总数据数量
        earningsTableDataLength: 0,
        //显示收益详情弹框
        isShowEarningsDetailsDialog: false,
        //收益详情表格数据
        earningsDetailsTableData: [],
        //显示修改机器人弹框
        isShowEditRobotDialog: false,
        //当前机器人id
        currencyRobotId: '',
        //修改机器人obj
        robotObj: {
          tactics: '',
          GridClearance: false,
          percentage: '',
          StopCover: false,
          RunningStatus: false,
        },
        robotObjRules: {
          tactics: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '策略'}),
              trigger: 'blur'
            },
          ],
          percentage: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '网格清仓百分比'}),
              trigger: 'blur'

            }
          ]
        },
        //显示闪电平仓弹框
        isShowCloseAPositionDialog: false,
        //闪电平仓
        CloseAPositObj: {
          id: '',
          //仓位
          shipping: '',
          //盈利率
          earningsRate: '',
        }

      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.robotId = this.$route.params.id;
        this.initData();
        this.getStrategiesList();
      })
    },
    methods: {
      //获取初始表格数据
      initData(){
        let params = {
          robot_id: this.robotId,
          type: this.type,
        };
        this.$api.Robot.orderList(params).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            data.data.forEach(item => {
              item.loadingEditState = false;
              item.loadingPositionState = false;
              item.loadingEarningsState = false;
            });
            this.tableData = data.data;
            this.tableDataLength = data.total;
          }
        });
      },

      //获得策略列表
      getStrategiesList(){
        this.$api.Robot.strategies().then(res => {
          if(res.data && res.data.status === 1000){
            this.tacticsOptions = res.data.data;
          }
        });
      },

      //点击'修改'按钮
      clickEditBtn(row){
        row.loadingEditState = true;
        this.$api.Robot.getOrder({id: row.id}).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.currencyRobotId = row.id;
            this.robotObj.tactics = parseFloat(data.plan);
            this.robotObj.GridClearance = !!data.grid_sell;
            this.robotObj.percentage = data.grid_sell;
            this.robotObj.StopCover = data.stop_open_position;
            this.robotObj.RunningStatus = [1, 2, 4].includes(data.status);
            this.isShowEditRobotDialog = true;
            row.loadingEditState = false;
          }
        });
      },

      //点击'持仓'按钮
      clickPositionBtn(row){
        row.loadingPositionState = true;
        this.$api.Robot.earningsDetails({id: row.order_id}).then(res => {
          if(res.data && res.data.status === 1000){
            this.earningsDetailsTableData = res.data.data;
            this.isShowEarningsDetailsDialog = true;
            row.loadingPositionState = false;
          }
        });
      },

      //点击'收益'按钮
      clickEarningsBtn(row){
        row.loadingEarningsState = true;
        this.$api.Robot.getEarnings({id: row.id}).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.earningsTableData = data.data;
            this.earningsTableDataLength = data.total;
            this.isShowEarningsDialog = true;
            row.loadingEarningsState = false;
          }
        });
      },

      //点击'闪电平仓'按钮
      clickCloseAPositionBtn(row){
        this.CloseAPositObj.id = row.id;
        this.CloseAPositObj.shipping = parseFloat(row.pocket_price);
        this.CloseAPositObj.earningsRate = parseFloat(row.total_ratio);
        this.isShowCloseAPositionDialog = true;
      },

      //点击收益表格里的'详情'按钮
      clickDetailsBtn(row){
        this.$api.Robot.earningsDetails({id: row.id}).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.earningsDetailsTableData = data.data;
            this.isShowEarningsDetailsDialog = true;
          }
        });
      },

      //提交修改
      submitEdit(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{
            let params = {
              stop_open_position: this.robotObj.StopCover + '',
              grid_sell_switch: (this.robotObj.GridClearance ? 1 : 0) + '',
              status: (this.robotObj.StopCover ? 2 : 1) + '',
              plan: this.robotObj.tactics + '',
            };
            if(this.robotObj.GridClearance){
              params.grid_sell_ratio = this.robotObj.percentage
            }
            params.id = this.currencyRobotId;
            this.$api.Robot.editOrder(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.isShowEditRobotDialog = false;
                this.$common.successHint('修改机器人成功');
                this.initData();
              }
            });
          }
        })
      },

      //提交闪电平仓
      submitCloseAPosit(){
        this.$api.Robot.orderPosition({id: this.CloseAPositObj.id}).then(res => {
          if(res.data && res.data.status === 1000){
            this.isShowCloseAPositionDialog = false;
            this.$common.successHint('平仓成功');
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
