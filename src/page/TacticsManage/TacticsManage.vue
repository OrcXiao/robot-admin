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
          label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-tickets"
              type="warning">详情
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
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="clickEditBtn(scope.row)"
              icon="el-icon-edit"
              type="success">修改
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
        <el-form-item label="止盈比例 ( % ) :" prop="ZhiYingBiLiArr">
          <div class="dis-fl">
            <el-input
              v-for="(item, index) in ZhiYingBiLiArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="ZhiYingBiLiArr[index]"
              maxlength="6"
              @keyup.native="limitInputNum('ZhiYingBiLiArr', index, ZhiYingBiLiArr[index], 3, 2)"
              placeholder="请输入">
              <el-button
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 0"
                icon="el-icon-remove">
              </el-button>
            </el-input>
            <el-button
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus">
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="补仓比例 ( % ) :" prop="BuCangBiLiArr">
          <div class="dis-fl">
            <el-input
              v-for="(item, index) in BuCangBiLiArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="BuCangBiLiArr[index]"
              maxlength="6"
              placeholder="请输入">
              <el-button
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 0"
                icon="el-icon-remove"></el-button>
            </el-input>
            <el-button
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="补仓数列 ( 倍 ) :" prop="BuCangShuLieArr">
          <div class="dis-fl">
            <el-input
              v-for="(item, index) in BuCangShuLieArr"
              :key="index"
              style="width: 100px;margin-right: 5px"
              v-model="BuCangShuLieArr[index]"
              maxlength="6"
              placeholder="请输入">
              <el-button
                @click="removeItem(index)"
                style="padding: 12px"
                slot="append"
                v-if="index > 1"
                icon="el-icon-remove"></el-button>
            </el-input>
            <el-button
              @click="addItem"
              style="padding: 12px"
              icon="el-icon-circle-plus"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="追踪止盈 :">
          <el-switch v-model="tacticsObj.TrackingCheckSurplus"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.TrackingCheckSurplus" label="允许回调" prop="AllowTheCallback">
          <div class="dis-fl">
            <el-input
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
              @keyup.native="Mixin_commonLimitInput('tacticsObj.SidewaysTime', 4, 0, false)"
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="防瀑布 :">
          <el-switch v-model="tacticsObj.ToPreventFalls"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.ToPreventFalls" label="允许回调 :" prop="AllowTheCallback">
          <div class="dis-fl">
            <el-input
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
              @keyup.native="Mixin_commonLimitInput('tacticsObj.SidewaysTime2', 4, 0, false)"
              style="width: 250px;"
              v-model="tacticsObj.SidewaysTime2"
              placeholder="请输入横盘时间">
            </el-input>
            <div class="pl10" style="width: 40px">分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="网格 :">
          <el-switch v-model="tacticsObj.Grid"></el-switch>
        </el-form-item>
        <el-form-item v-if="tacticsObj.Grid" label="网格开启条件 :" prop="OpenCondition">
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
        <el-form-item v-if="tacticsObj.Grid" label="网格关闭条件 :" prop="CloseCondition">
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
        <el-form-item v-if="tacticsObj.Grid" label="网格止盈比例 ( % ) :" prop="WangGeZhiYingBiLiArr">
          <div class="dis-fl">
            <el-input
              v-for="(item, index) in WangGeZhiYingBiLiArr"
              style="width: 100px;margin-right: 5px"
              maxlength="6"
              v-model="WangGeZhiYingBiLiArr[index]"
              placeholder="请输入">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="止盈出场 :">
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
      let validatorZhiYingBiLiArr = (rule, value, callback, str) => {
        let val = this.ZhiYingBiLiArr.find(item => parseFloat(item) > 999.99);
        if(val){
          callback(new Error('输入的最大数不能超过999.99'));
        }
        else if(this.ZhiYingBiLiArr.includes('')){
          callback(new Error('请输入所有的之盈比例'));
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
      let validatorAllowTheCallback = (rule, value, callback, str) => {
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
        //止盈比例数组
        ZhiYingBiLiArr: [''],
        //补仓比例数组
        BuCangBiLiArr: [''],
        //补仓数列数组
        BuCangShuLieArr: ['', ''],
        //网格止盈比例数组
        WangGeZhiYingBiLiArr: [''],
        //自定义策略obj
        tacticsObj: {
          /*
           //止盈比例
           CheckSurplusProportion: '',
           //补仓比例
           MarginPercentage: '',
           //补仓数列
           CoverSeries: '',
           */
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
        widthVal: 1000
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      //this.$ nextTick(() => {

      //})
    },
    methods: {
      submitAdd(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{

          }
        })

      },

      //添加数组length
      addItem(){
        this.ZhiYingBiLiArr.push('');
        this.BuCangBiLiArr.push('');
        this.BuCangShuLieArr.push('');
        this.WangGeZhiYingBiLiArr.push('');
        if(this.BuCangShuLieArr.length > 6){
          let width = this.WangGeZhiYingBiLiArr.length * 120 + 200;
          this.widthVal = width > 1200 ? width : 1200;
        }
      },

      //减少数组length
      removeItem(i){
        if(i === this.ZhiYingBiLiArr.length){
          this.ZhiYingBiLiArr.pop();
          this.BuCangBiLiArr.pop();
          this.BuCangShuLieArr.pop();
          this.WangGeZhiYingBiLiArr.pop();
        }
        else{
          this.ZhiYingBiLiArr.splice(i, 1);
          this.BuCangBiLiArr.splice(i, 1);
          this.BuCangShuLieArr.splice(i + 1, 1);
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
