<template>
  <div class="bkFFFFFF p30 RobotDetails-wrap">
    <div class="pb30">
      <span class="pr20">类型 :</span>
      <el-select class="pr20" style="width: 160px" v-model="type" placeholder="请选择类型">
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button>搜索</el-button>
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
        label="类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="策略">
      </el-table-column>
      <el-table-column
        prop="name"
        label="交易对">
      </el-table-column>
      <el-table-column
        prop="name"
        label="总持仓">
      </el-table-column>
      <el-table-column
        prop="name"
        label="当前价格">
      </el-table-column>
      <el-table-column
        prop="name"
        label="持仓均价">
      </el-table-column>
      <el-table-column
        prop="name"
        label="预计补仓价">
      </el-table-column>
      <el-table-column
        prop="name"
        label="预计平仓价">
      </el-table-column>
      <el-table-column
        prop="name"
        label="补仓阶段">
      </el-table-column>
      <el-table-column
        prop="name"
        label="平仓次数">
      </el-table-column>
      <el-table-column
        prop="name"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="name"
        label="最后运行">
      </el-table-column>
      <el-table-column
        width="440"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="clickEditBtn(scope.row)"
            icon="el-icon-edit"
            type="success">修改
          </el-button>
          <el-button
            @click="clickPositionBtn(scope.row)"
            icon="el-icon-shopping-cart-2"
            type="info">持仓
          </el-button>
          <el-button
            @click="clickEarningsBtn(scope.row)"
            icon="el-icon-s-goods"
            type="warning">收益
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
      :current-page="4"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="70">
    </el-pagination>

    <!--收益弹框-->
    <el-dialog
      title="收益"
      @close="Mixin_closeDialog('robotObj', 'isShowAddOrEditDialog')"
      :visible.sync="isShowEarningsDialog"
      :append-to-body=true
      width="1000px">
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
          prop="name"
          label="交易对">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈利额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈利额(计价币)">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总盈利(%)">
        </el-table-column>
        <el-table-column
          prop="name"
          label="最后运行时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单开始时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态">
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
        :current-page="4"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="70">
      </el-pagination>
    </el-dialog>

    <!--收益详情弹框-->
    <el-dialog
      title="收益详情"
      @close="Mixin_closeDialog('robotObj', 'isShowEarningsDetailsDialog')"
      :visible.sync="isShowEarningsDetailsDialog"
      :append-to-body=true
      width="1000px">
      <el-table
        border
        :data="EarningsDetailsTableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="补仓位置">
        </el-table-column>
        <el-table-column
          prop="name"
          label="当时价格">
        </el-table-column>
        <el-table-column
          prop="name"
          label="计价币">
        </el-table-column>
        <el-table-column
          prop="name"
          label="交易币">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈利额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈利额(计价币)">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈利(%)">
        </el-table-column>
        <el-table-column
          prop="name"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作记录">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="name"
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
        label-width="100px">
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
        <el-form-item label="停止补仓">
          <el-switch v-model="robotObj.StopCover"></el-switch>
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
      @close="Mixin_closeDialog('robotObj', 'isShowCloseAPositionDialog')"
      :visible.sync="isShowCloseAPositionDialog"
      :append-to-body=true
      width="400px">
      <el-form
        label-position="right"
        label-width="120px">
        <el-form-item label="当前持有仓位 :">
          <div>10BTC</div>
        </el-form-item>
        <el-form-item label="当前盈利率 :">
          <el-tag type="success" effect="dark">+3%</el-tag>
          <el-tag type="danger" effect="dark">-2%</el-tag>
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
        //类型候选项
        typeOptions: [],
        //初始表格数据
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          }
        ],
        //显示收益弹框
        isShowEarningsDialog: false,
        //收益表格数据
        earningsTableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          }
        ],
        //显示收益详情弹框
        isShowEarningsDetailsDialog: false,
        //收益详情表格数据
        earningsDetailsTableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市'
          }
        ],
        //显示修改机器人弹框
        isShowEditRobotDialog: false,
        //修改机器人obj
        robotObj: {
          tactics: '',
          GridClearance: false,
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
          ]
        },
        //显示闪电平仓弹框
        isShowCloseAPositionDialog: false,
        //闪电平仓
        CloseAPositObj:{
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
        this.initData();
      })
    },
    methods: {
      //获取初始表格数据
      initData(){

      },

      //点击'编辑'按钮
      clickEditBtn(){
        this.isShowEditRobotDialog = true;
      },

      //点击'持仓'按钮
      clickPositionBtn(){
        this.isShowEarningsDetailsDialog = true;
      },

      //点击'收益'按钮
      clickEarningsBtn(){
        this.isShowEarningsDialog = true;
      },

      //点击'闪电平仓'按钮
      clickCloseAPositionBtn(){
        this.isShowCloseAPositionDialog = true;
      },

      //点击'收益表格里的详情'按钮
      clickDetailsBtn(){
        this.isShowEarningsDetailsDialog = true;
      },

      //提交修改
      submitEdit(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{

          }
        })
      },

      //提交闪电平仓
      submitCloseAPosit(){

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
