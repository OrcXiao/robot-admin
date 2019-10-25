<template>
  <div class="TacticsManage-wrap">
    <div class="mb30 pb30 bkFFFFFF">
      <div class="p20 borb">系统策略</div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="追踪止盈"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="防瀑布">
        </el-table-column>
        <el-table-column
          prop="address"
          label="网格">
        </el-table-column>
        <el-table-column
          prop="address"
          label="详情">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-tickets"
              type="warning">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pb30 bkFFFFFF">
      <div class="dis-fl ju-sb p20 borb">
        <div>自定义策略</div>
        <div>
          <el-button
            @click="isShowAddTacticsDialog = true"
            icon="el-icon-circle-plus-outline"
            type="primary">添加自定义策略
          </el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="追踪止盈"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="防瀑布">
        </el-table-column>
        <el-table-column
          prop="address"
          label="网格">
        </el-table-column>
        <el-table-column
          prop="address"
          label="详情">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-tickets"
              type="warning">查看
            </el-button>
            <el-button
              icon="el-icon-circle-close"
              type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!--添加自定义策略弹框-->
    <el-dialog
      title="添加自定义策略"
      @close="Mixin_closeDialog('tacticsObj', 'isShowAddTacticsDialog')"
      :visible.sync="isShowAddTacticsDialog"
      :append-to-body=true
      width="500px">
      <el-form
        :model="tacticsObj"
        :rules="tacticsObjRules"
        ref="tacticsObj"
        label-position="right"
        label-width="140px">
        <el-form-item label="止盈比例" prop="CheckSurplusProportion">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.CheckSurplusProportion"
              placeholder="请输入止盈比例">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item label="补仓比例" prop="MarginPercentage">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.MarginPercentage"
              placeholder="请输入补仓比例">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item label="补仓数列" prop="CoverSeries">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.CoverSeries"
              placeholder="请输入补仓数列">
            </el-input>
            <span class="pl10">倍</span>
          </div>
        </el-form-item>
        <el-form-item label="追踪止盈">
          <el-switch v-model="tacticsObj.TrackingCheckSurplus"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.TrackingCheckSurplus" label="允许回调" prop="AllowTheCallback">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.AllowTheCallback"
              placeholder="请输入允许回调">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.TrackingCheckSurplus" label="横盘时间" prop="SidewaysTime">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="防瀑布">
          <el-switch v-model="tacticsObj.ToPreventFalls"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.ToPreventFalls" label="允许回调" prop="AllowTheCallback2">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.AllowTheCallback2"
              placeholder="请输入允许回调">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.ToPreventFalls" label="横盘时间" prop="SidewaysTime2">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime2"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="网格">
          <el-switch v-model="tacticsObj.Grid"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.Grid" label="网格开启条件" prop="OpenCondition">
          <div class="dis-fl">
            <el-select style="width: 250px;" v-model="tacticsObj.OpenCondition" placeholder="请选择网格开启条件">
              <el-option
                v-for="(item, index) in conditionOptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <span class="pl10">手</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.Grid" label="网格关闭条件" prop="CloseCondition">
          <div class="dis-fl">
            <el-select style="width: 250px;" v-model="tacticsObj.CloseCondition" placeholder="请选择网格关闭条件">
              <el-option
                v-for="(item, index) in conditionOptions"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <span class="pl10">手</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.Grid" label="网格止盈比例" prop="GridCheckSurplusProportion">
          <div class="dis-fl">
            <el-input
              style="width: 250px;"
              v-model="tacticsObj.GridCheckSurplusProportion"
              placeholder="请输入横盘时间">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item label="止盈出场">
          <el-switch v-model="tacticsObj.CheckFullPlay"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowAddTacticsDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitAdd('tacticsObj')">确 定</el-button>
		  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "TacticsManage",
    data(){
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市'
          }
        ],
        //显示自定义弹框
        isShowAddTacticsDialog: false,
        //网格开启或关闭条件候选项
        conditionOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //自定义策略obj
        tacticsObj: {
          //止盈比例
          CheckSurplusProportion: '',
          //补仓比例
          MarginPercentage: '',
          //补仓数列
          CoverSeries: '',
          //追踪止盈
          TrackingCheckSurplus: false,
          //允许回调
          AllowTheCallback: '',
          //横盘时间
          SidewaysTime: '',
          //防瀑布
          ToPreventFalls: false,
          //允许回调2
          AllowTheCallback2: '',
          //横盘时间2
          SidewaysTime2: '',
          //网格
          Grid: false,
          //开启条件
          OpenCondition: '',
          //关闭条件
          CloseCondition: '',
          //网格止盈比例
          GridCheckSurplusProportion: '',
          //止盈出场
          CheckFullPlay: false,
        },
        //策略属性校验
        tacticsObjRules: {

        },
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

<style scoped lang="scss">
  @import "TacticsManage";
</style>
