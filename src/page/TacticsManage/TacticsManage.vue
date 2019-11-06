<template>
  <div class="TacticsManage-wrap">
    <div class="mb30 p20 bkFFFFFF">
      <div class="ptb20">系统策略</div>
      <el-table
        border
        :data="systemTableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column label="追踪止盈">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.other_config.tracking_profit_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="防瀑布">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.other_config.flood_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="网格">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.other_config.grid_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="clickDetailsBtn(scope.row)"
              icon="el-icon-tickets"
              :loading="scope.row.loadingState"
              type="warning">{{scope.row.loadingState ? '正在加载' : '查看详情'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="p20 bkFFFFFF">
      <div class="dis-fl ju-sb ptb20">
        <div>自定义策略</div>
        <div>
          <el-button
            @click="clickAddBtn"
            icon="el-icon-circle-plus-outline"
            type="primary">添加自定义策略
          </el-button>
        </div>
      </div>
      <el-table
        border
        :data="customTableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column label="追踪止盈">
          <template slot-scope="scope">
            <el-switch
              @change="changeSwitch($event, scope.row.id, 'tracking_profit_switch', scope.row.name)"
              v-model="scope.row.tracking_profit_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="防瀑布">
          <template slot-scope="scope">
            <el-switch
              @change="changeSwitch($event, scope.row.id, 'flood_switch', scope.row.name)"
              v-model="scope.row.flood_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="网格">
          <template slot-scope="scope">
            <el-switch
              @change="changeSwitch($event, scope.row.id, 'grid_switch', scope.row.name)"
              v-model="scope.row.grid_switch"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="clickEditBtn(scope.row)"
              icon="el-icon-edit"
              type="success">修改
            </el-button>
            <el-button
              @click="clickRemoveBtn(scope.row)"
              icon="el-icon-circle-close"
              type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="Mixin_handleSizeChange"
        @current-change="Mixin_handleCurrentChange"
        :page-size="per_page"
        layout="total, prev, pager, next, jumper"
        :total="customTableDataLength">
      </el-pagination>
    </div>

    <!--添加自定义策略弹框-->
    <el-dialog
      :title="dialogTitle"
      class="tactics-dialog-wrap"
      @close="Mixin_closeDialog('tacticsObj', 'isShowAddTacticsDialog')"
      :visible.sync="isShowAddTacticsDialog"
      :width="widthVal + 'px'">
      <el-form
        :model="tacticsObj"
        :rules="tacticsObjRules"
        ref="tacticsObj"
        label-position="right"
        label-width="150px">
        <el-form-item label="策略名称 :" prop="name">
          <el-input
            :disabled="currentHandle === 'systemDetails'"
            style="width: 250px;"
            v-model="tacticsObj.name"
            placeholder="请输入策略名称">
          </el-input>
        </el-form-item>

        <el-form-item label="止盈比例 ( % ) :" prop="ZhiYingBiLiArr">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              v-for="(item, index) in ZhiYingBiLiArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="ZhiYingBiLiArr[index]"
              maxlength="6"
              @keyup.native="limitInputNum('ZhiYingBiLiArr', index, ZhiYingBiLiArr[index], 3, 2)"
              placeholder="请输入">
              <el-button
                :disabled="currentHandle === 'systemDetails'"
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 1"
                icon="el-icon-remove">
              </el-button>
            </el-input>
            <el-button
              :disabled="currentHandle === 'systemDetails'"
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus">
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="补仓比例 ( % ) :" prop="BuCangBiLiArr">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              v-for="(item, index) in BuCangBiLiArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="BuCangBiLiArr[index]"
              maxlength="6"
              placeholder="请输入">
              <el-button
                :disabled="currentHandle === 'systemDetails'"
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 0"
                icon="el-icon-remove"></el-button>
            </el-input>
            <el-button
              :disabled="currentHandle === 'systemDetails'"
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="补仓数列 ( 倍 ) :" prop="BuCangShuLieArr">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              v-for="(item, index) in BuCangShuLieArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="BuCangShuLieArr[index]"
              maxlength="6"
              placeholder="请输入">
              <el-button
                :disabled="currentHandle === 'systemDetails'"
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 0"
                icon="el-icon-remove"></el-button>
            </el-input>
            <el-button
              :disabled="currentHandle === 'systemDetails'"
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="追踪止盈 :">
          <el-switch :disabled="currentHandle === 'systemDetails'"
                     v-model="tacticsObj.TrackingCheckSurplus"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.TrackingCheckSurplus" label="允许回调" prop="AllowTheCallback">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              @input.native="Mixin_commonLimitInput('tacticsObj.AllowTheCallback', 3, 2)"
              style="width: 250px;"
              v-model="tacticsObj.AllowTheCallback"
              placeholder="请输入允许回调">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.TrackingCheckSurplus" label="横盘时间 :" prop="SidewaysTime">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              @keyup.native="Mixin_commonLimitInput('tacticsObj.SidewaysTime', 4, 0, false)"
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="防瀑布 :">
          <el-switch :disabled="currentHandle === 'systemDetails'" v-model="tacticsObj.ToPreventFalls"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.ToPreventFalls" label="允许回调 :" prop="AllowTheCallback">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              @keyup.native="Mixin_limitInputNum('tacticsObj.AllowTheCallback2', 3, 2)"
              style="width: 250px;"
              v-model="tacticsObj.AllowTheCallback2"
              placeholder="请输入允许回调">
            </el-input>
            <span class="pl10">%</span>
          </div>
        </el-form-item>
        <el-form-item v-if="tacticsObj.ToPreventFalls" label="横盘时间 :" prop="SidewaysTime">
          <div class="dis-fl">
            <el-input
              :disabled="currentHandle === 'systemDetails'"
              @keyup.native="Mixin_commonLimitInput('tacticsObj.SidewaysTime2', 4, 0, false)"
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime2"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="网格 :">
          <el-switch :disabled="currentHandle === 'systemDetails'" v-model="tacticsObj.Grid"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.Grid" label="网格开启条件 :" prop="OpenCondition">
          <div class="dis-fl">
            <el-select
              :disabled="currentHandle === 'systemDetails'"
              style="width: 250px;"
              v-model="tacticsObj.OpenCondition"
              placeholder="请选择网格开启条件">
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
        <el-form-item v-if="tacticsObj.Grid" label="网格关闭条件 :" prop="CloseCondition">
          <div class="dis-fl">
            <el-select
              :disabled="currentHandle === 'systemDetails'"
              style="width: 250px;"
              v-model="tacticsObj.CloseCondition"
              placeholder="请选择网格关闭条件">
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
        <el-form-item v-if="tacticsObj.Grid" label="网格止盈比例 ( % ) :" prop="WangGeZhiYingBiLiArr">
          <el-input
            :disabled="currentHandle === 'systemDetails'"
            v-for="(item, index) in WangGeZhiYingBiLiArr"
            style="width: 100px;margin-right: 5px"
            maxlength="6"
            v-model="WangGeZhiYingBiLiArr[index]"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowAddTacticsDialog = false">取 消</el-button>
		    <el-button
          v-if="(currentHandle !== 'systemDetails') && (currentHandle === 'add')"
          type="primary"
          @click="submitAdd('tacticsObj')">确 定
        </el-button>
		    <el-button
          v-if="(currentHandle !== 'systemDetails') && (currentHandle === 'edit')"
          type="primary"
          @click="submitEdit('tacticsObj')">确 定
        </el-button>
		  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "TacticsManage",
    data(){
      let validatorZhiYingBiLiArr = (rule, value, callback, str) => {
        let val = this.ZhiYingBiLiArr.find(item => parseFloat(item) > 999.99);
        if(val){
          callback(new Error('输入的最大数不能超过999.99'));
        }
        else if(this.ZhiYingBiLiArr.includes('')){
          callback(new Error('请输入所有的止盈比例'));
        }
        else{
          callback();
        }
      };
      let validatorBuCangBiLiArr = (rule, value, callback, str) => {
        let val = this.BuCangBiLiArr.find(item => parseFloat(item) > 999.99);
        if(val){
          callback(new Error('输入的最大数不能超过999.99'));
        }
        else if(this.ZhiYingBiLiArr.includes('')){
          callback(new Error('请输入所有的补仓比例'));
        }

        else{
          callback();
        }
      };
      let validatorBuCangShuLieArr = (rule, value, callback, str) => {
        let val = this.BuCangShuLieArr.find(item => parseFloat(item) > 999.99);
        if(val){
          callback(new Error('输入的最大数不能超过999.99'));
        }
        else if(this.ZhiYingBiLiArr.includes('')){
          callback(new Error('请输入所有的补仓数列'));
        }
        else{
          callback();
        }
      };
      let validatorWangGeZhiYingBiLiArr = (rule, value, callback, str) => {
        let val = this.WangGeZhiYingBiLiArr.find(item => parseFloat(item) > 999.99);
        if(val){
          callback(new Error('输入的最大数不能超过999.99'));
        }
        else if(this.ZhiYingBiLiArr.includes('')){
          callback(new Error('请输入所有的网格止盈比例'));
        }
        else{
          callback();
        }
      };
      let validatorAllowTheCallback = (rule, value, callback) => {
        if(parseFloat(value) > 99.99){
          callback(new Error('允许回调的最大值不能超过99.99'));
        }
        else{
          callback();
        }
      };
      let validatorSidewaysTime = (rule, value, callback, str) => {
        if(parseFloat(value) > 1800){
          callback(new Error('横盘时间最大值不能超过1800'));
        }
        else{
          callback();
        }
      };

      return {
        //翻页序号
        page: 1,
        //表格每页大小
        per_page: 10,
        //系统策略表格数据
        systemTableData: [],
        //自定义策略表格数据
        customTableData: [],
        //自定义策略表格数据总数
        customTableDataLength: 0,
        //显示自定义弹框
        isShowAddTacticsDialog: false,
        //网格开启或关闭条件候选项
        conditionOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        //止盈比例数组
        ZhiYingBiLiArr: ['', ''],
        //补仓比例数组
        BuCangBiLiArr: [''],
        //补仓数列数组
        BuCangShuLieArr: [''],
        //网格止盈比例数组
        WangGeZhiYingBiLiArr: [''],
        //自定义策略obj
        tacticsObj: {
          //策略名称
          name: '',
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
        },
        //克隆一个tacticsObj对象
        cloneTacticsObj: {},
        //策略属性校验
        tacticsObjRules: {
          name: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '策略名称'}),
              trigger: 'blur'
            }
          ],
          ZhiYingBiLiArr: [
            {
              required: true,
              validator: validatorZhiYingBiLiArr,
              trigger: 'blur'
            }
          ],
          BuCangBiLiArr: [
            {
              required: true,
              validator: validatorBuCangBiLiArr,
              trigger: 'blur'
            }
          ],
          BuCangShuLieArr: [
            {
              required: true,
              validator: validatorBuCangShuLieArr,
              trigger: 'blur'
            }
          ],
          WangGeZhiYingBiLiArr: [
            {
              required: true,
              validator: validatorWangGeZhiYingBiLiArr,
              trigger: 'blur'
            }
          ],
          AllowTheCallback: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '允许回调'}),
              trigger: 'blur'
            },
            {
              required: true,
              validator: validatorAllowTheCallback,
              trigger: 'blur'
            }
          ],
          SidewaysTime: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '横盘时间'}),
              trigger: 'blur'
            },
            {
              required: true,
              validator: validatorSidewaysTime,
              trigger: 'blur'
            }
          ],
          OpenCondition: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '网格开启条件'}),
              trigger: 'blur'
            },
          ],
          CloseCondition: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '网格关闭条件'}),
              trigger: 'blur'
            },
          ],
        },
        //初始弹框宽度
        widthVal: 1000,
        //当前操作类型
        currentHandle: '',
        //弹窗标题
        dialogTitle: '',
        //当前操作的id
        currentId: ''
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.cloneTacticsObj = Object.assign({}, this.tacticsObj);
        this.initData();
      })
    },
    methods: {
      //获取策略列表
      initData(){
        let params = {
          page: this.page,
          per_page: this.per_page,
        };
        this.$api.TacticsManage.tacticsList(params).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            data.sys_strategy.forEach(item => {
              item.loadingState = false
            });
            this.systemTableData = data.sys_strategy;
            this.customTableData = data.strategy.data;
            this.customTableDataLength = data.strategy.total;
          }
        });
      },

      //切换表格中的开关
      /*
       * event: 状态改变的值
       * id: 当前操作的id,
       * attr: 改变的字段,
       * type: 策略类型, 1.系统策略, 2.自定义策略,
       * name: 策略名称
       * */
      changeSwitch(event, id, attr, name){
        let params = {
          id: id,
          switch: attr,
          toggle: event ? '1' : '0',
        };
        this.$api.TacticsManage.switch(params).then(res => {
          if(res.data && res.data.status === 1000){
            let stateStr = event ? '已开启' : '已关闭';
            let attrStr = '';
            switch(attr) {
              case 'tracking_profit_switch':
                attrStr = '追踪止盈';
                break;
              case 'flood_switch':
                attrStr = '防瀑布';
                break;
              case 'grid_switch':
                attrStr = '网格';
                break;
              default:
                attrStr = '';
                break;
            }
            this.$common.successHint(`自定义策略 ( ${name} ) ${attrStr}${stateStr}`);
          }
          this.initData();
        });
      },

      //点击'详情'按钮
      clickDetailsBtn(row){
        this.dialogTitle = '系统策略详情';
        this.currentHandle = 'systemDetails';
        row.loadingState = true;
        this.$api.TacticsManage.tacticsDetails({id: row.id}).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.ZhiYingBiLiArr = data.stop_profit_ratio.split(',');
            this.BuCangBiLiArr = data.make_up_ratio.split(',');
            this.BuCangShuLieArr = data.make_up_queue.split(',');
            this.WangGeZhiYingBiLiArr = data.grid_ratio.split(',');
            this.tacticsObj.name = data.name;
            this.tacticsObj.TrackingCheckSurplus = data.tracking_profit_switch;
            this.tacticsObj.AllowTheCallback = data.tracking_profit_ratio;
            this.tacticsObj.SidewaysTime = data.tracking_profit_duration;
            this.tacticsObj.ToPreventFalls = data.tracking_profit_switch;
            this.tacticsObj.AllowTheCallback2 = data.tracking_profit_ratio;
            this.tacticsObj.SidewaysTime2 = data.tracking_profit_duration;
            this.tacticsObj.Grid = data.grid_switch;
            this.tacticsObj.OpenCondition = data.grid_step;
            this.tacticsObj.CloseCondition = data.grid_down_step;
            this.isShowAddTacticsDialog = true;
          }
        }).finally(() => {
          row.loadingState = false;
        })
      },

      //点击'添加自定义策略'按钮
      clickAddBtn(){
        this.dialogTitle = '添加自定义策略';
        this.currentHandle = 'add';
        this.tacticsObj = this.cloneTacticsObj;
        this.ZhiYingBiLiArr = ['', ''];
        this.BuCangBiLiArr = [''];
        this.BuCangShuLieArr = [''];
        this.WangGeZhiYingBiLiArr = [''];
        this.isShowAddTacticsDialog = true;
      },

      //提交新增
      submitAdd(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{
            let params = {};
            params.name = this.tacticsObj.name;
            params.stop_profit_ratio = this.ZhiYingBiLiArr.join(',');
            params.make_up_ratio = this.BuCangBiLiArr.join(',');
            params.make_up_queue = this.BuCangShuLieArr.join(',');
            params.tracking_profit_switch = this.tacticsObj.TrackingCheckSurplus;
            params.tracking_profit_ratio = this.tacticsObj.AllowTheCallback;
            params.tracking_profit_duration = this.tacticsObj.SidewaysTime;
            params.flood_switch = this.tacticsObj.ToPreventFalls;
            params.flood_ratio = this.tacticsObj.AllowTheCallback2;
            params.flood_duration = this.tacticsObj.AllowTheCallback2;
            params.grid_switch = this.tacticsObj.Grid;
            params.grid_step = this.tacticsObj.OpenCondition + '';
            params.grid_down_step = this.tacticsObj.CloseCondition + '';
            params.grid_ratio = this.WangGeZhiYingBiLiArr.join(',');
            this.$api.TacticsManage.addTactics(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.isShowAddTacticsDialog = false;
                this.$common.successHint('自定义策略添加成功');
                this.Mixin_filterCondition();
              }
            });
          }
        })
      },

      //点击'修改'按钮
      clickEditBtn(row){
        this.dialogTitle = '修改自定义策略';
        this.currentHandle = 'edit';
        this.currentId = row.id;
        this.tacticsObj.name = row.name;
        this.tacticsObj.TrackingCheckSurplus = row.tracking_profit_switch;
        this.tacticsObj.AllowTheCallback = row.tracking_profit_ratio;
        this.tacticsObj.SidewaysTime = row.tracking_profit_duration;
        this.tacticsObj.ToPreventFalls = row.flood_switch;
        this.tacticsObj.AllowTheCallback2 = row.flood_ratio;
        this.tacticsObj.SidewaysTime2 = row.flood_duration;
        this.tacticsObj.Grid = row.grid_switch;
        this.tacticsObj.OpenCondition = parseFloat(row.grid_step);
        this.tacticsObj.CloseCondition = parseFloat(row.grid_down_step);
        this.ZhiYingBiLiArr = row.stop_profit_ratio.split(',');
        this.BuCangBiLiArr = row.make_up_ratio.split(',');
        this.BuCangShuLieArr = row.make_up_queue.split(',');
        this.WangGeZhiYingBiLiArr = row.grid_ratio.split(',');
        this.isShowAddTacticsDialog = true;
      },

      //提交修改
      submitEdit(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{
            let params = {};
            params.id = this.currentId;
            params.name = this.tacticsObj.name;
            params.stop_profit_ratio = this.ZhiYingBiLiArr.join(',');
            params.make_up_ratio = this.BuCangBiLiArr.join(',');
            params.make_up_queue = this.BuCangShuLieArr.join(',');
            params.tracking_profit_switch = this.tacticsObj.TrackingCheckSurplus;
            params.tracking_profit_ratio = this.tacticsObj.AllowTheCallback;
            params.tracking_profit_duration = this.tacticsObj.SidewaysTime;
            params.flood_switch = this.tacticsObj.ToPreventFalls;
            params.flood_ratio = this.tacticsObj.AllowTheCallback2;
            params.flood_duration = this.tacticsObj.AllowTheCallback2;
            params.grid_switch = this.tacticsObj.Grid;
            params.grid_step = this.tacticsObj.OpenCondition + '';
            params.grid_down_step = this.tacticsObj.CloseCondition + '';
            params.grid_ratio = this.WangGeZhiYingBiLiArr.join(',');
            this.$api.TacticsManage.editTactics(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.isShowAddTacticsDialog = false;
                this.$common.successHint('自定义策略修改成功');
                this.initData();
              }
            });
          }
        })
      },

      //点击'删除'按钮
      clickRemoveBtn(row){
        this.$confirm(`确定删除自定义策略${row.name} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$api.TacticsManage.removeTactics(row.id).then(res => {
            if(res.data && res.data.status === 1000){
              this.$common.successHint(`自定义策略${row.name}删除成功`);
              this.Mixin_filterCondition();
            }
          });
        }).catch(() => {
        })
      },

      //添加数组length
      addItem(){
        this.ZhiYingBiLiArr.push('');
        this.BuCangBiLiArr.push('');
        this.BuCangShuLieArr.push('');
        this.WangGeZhiYingBiLiArr.push('');
        if(this.ZhiYingBiLiArr.length > 6){
          let width = this.WangGeZhiYingBiLiArr.length * 120 + 200;
          this.widthVal = width > 1200 ? width : 1200;
        }
      },

      //减少数组length
      removeItem(i){
        if(i === this.BuCangBiLiArr.length){
          this.ZhiYingBiLiArr.pop();
          this.BuCangBiLiArr.pop();
          this.BuCangShuLieArr.pop();
          this.WangGeZhiYingBiLiArr.pop();
        }
        else{
          this.ZhiYingBiLiArr.splice(i + 1, 1);
          this.BuCangBiLiArr.splice(i, 1);
          this.BuCangShuLieArr.splice(i, 1);
          this.WangGeZhiYingBiLiArr.splice(i, 1);
        }
      },

      //限制输入框数字输入
      limitInputNum(obj, index, val, before, after){
        this.$set(this[obj], index, this.Mixin_limitInputNum(val, before, after))
      },
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style lang="scss">
  .tactics-dialog-wrap{
    .el-input__inner{
      padding: 0 4px !important;
    }
  }
</style>
