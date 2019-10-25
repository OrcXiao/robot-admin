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
            @click="clickEditBtn(scope.row)"
            icon="el-icon-shopping-cart-2"
            type="info">持仓
          </el-button>
          <el-button
            @click="clickRemoveBtn(scope.row)"
            icon="el-icon-s-goods"
            type="warning">收益
          </el-button>
          <el-button
            @click="clickRemoveBtn(scope.row)"
            icon="el-icon-folder-remove">闪电平仓
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
              @click="clickEditBtn(scope.row)"
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
          label="交易对">
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
      width="500px">
      <el-form
        :model="robotObj"
        :rules="robotObjRules"
        ref="robotObj"
        label-position="right"
        label-width="140px">
        <el-form-item label="策略" prop="tactics">
          <el-select style="width: 320px" v-model="robotObj.tactics" placeholder="请选择策略">
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
		    <el-button type="primary" @click="submitAdd('robotObj')" v-if="currentHandleType==='add'">确 定</el-button>
		    <el-button type="primary" @click="submitEdit('robotObj')" v-if="currentHandleType==='edit'">保 存</el-button>
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
        robotObjRules:{
          tactics:[
            {

            }
          ]
        }


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
