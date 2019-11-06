<template>
  <div class="bkFFFFFF p30 robot-wrap">
    <div class="pb30">
      <span class="pr20">交易所 :</span>
      <el-input
        style="width: 150px;"
        clearable
        v-model="organize"
        placeholder="请输入交易所">
      </el-input>
      <el-button class="ml20" @click="initData">搜索</el-button>
      <el-button
        class="ml20"
        @click="clickAddBtn"
        icon="el-icon-circle-plus-outline"
        type="primary">添加机器人
      </el-button>
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
        prop="name"
        label="机器人">
      </el-table-column>
      <el-table-column
        prop="organize_zh"
        label="交易所">
      </el-table-column>
      <el-table-column
        prop="plan_type_zh"
        label="策略">
      </el-table-column>
      <el-table-column label="止盈出场">
        <template slot-scope="scope">
          <el-switch :active-value="2" :inactive-value="1" v-model="scope.row.profit_end"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="停止补仓">
        <template slot-scope="scope">
          <el-switch :active-value="2" :inactive-value="1" v-model="scope.row.stop_open_position"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="status_zh"
        label="状态">
      </el-table-column>
      <el-table-column
        width="420"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click="clickEditBtn(scope.row)"
            icon="el-icon-edit"
            type="success">修改
          </el-button>
          <el-button
            @click="clickPauseBtn(scope.row)"
            icon="el-icon-video-pause"
            type="info">暂停
          </el-button>
          <!--
                    <el-button
                      @click="clickStartBtn(scope.row)"
                      icon="el-icon-video-play"
                      type="info">启动
                    </el-button>
          -->
          <el-button
            @click="clickRemoveBtn(scope.row)"
            icon="el-icon-circle-close"
            type="danger">删除
          </el-button>
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
      :total="tableDataLength">
    </el-pagination>

    <!--添加和修改机器人弹框-->
    <el-dialog
      :title="currentHandleType === 'add' ? '添加机器人': '修改机器人'"
      @close="Mixin_closeDialog('robotObj', 'isShowAddOrEditDialog')"
      :visible.sync="isShowAddOrEditDialog"
      :append-to-body=true
      width="500px">
      <el-form
        :model="robotObj"
        :rules="robotObjRules"
        ref="robotObj"
        label-position="right"
        label-width="140px">
        <el-form-item label="机器人名称 :" prop="name">
          <el-input v-model="robotObj.name" placeholder="请输入机器人名称"></el-input>
        </el-form-item>
        <el-form-item label="交易所 :" prop="bourse">
          <el-select style="width: 320px" v-model="robotObj.bourse" placeholder="请选择交易所">
            <el-option
              v-for="(item, index) in bourseOptions"
              :key="index"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易区 :" prop="tradingRange">
          <el-select style="width: 320px" v-model="robotObj.tradingRange" placeholder="请选择交易区">
            <el-option
              v-for="(item, index) in tradingRangeOptions"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="持有的币种 :" prop="coin">
          <el-checkbox-group v-model="robotObj.coin">
            <el-checkbox
              v-for="(item, index) in coinOptions"
              :key="index"
              name="type"
              :label="item.id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="交易币对 :" prop="MoneyFor">
          <el-checkbox-group v-model="robotObj.MoneyFor">
            <el-checkbox
              v-for="(item, index) in MoneyForOptions"
              :key="index"
              :label="item.id"
              name="type">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="USDT本金 :" prop="USDT">
          <el-input
            @input.native="Mixin_commonLimitInput('robotObj.USDT', 9, 6)"
            v-model="robotObj.USDT"
            placeholder="请输入USDT本金"></el-input>
          <div class="text-right">
            <div class="cuso">USDT余额:{{USDTBalance}}</div>
          </div>
        </el-form-item>
        <el-form-item label="BTC本金 :" prop="BTC">
          <el-input
            @input.native="Mixin_commonLimitInput('robotObj.BTC', 9, 6)"
            v-model="robotObj.BTC"
            placeholder="请输入BTC本金"></el-input>
          <div class="text-right">
            <div class="cuso">BTC余额:{{BTCBalance}}</div>
          </div>
        </el-form-item>
        <el-form-item label="ETH本金 :" prop="ETH">
          <el-input
            @input.native="Mixin_commonLimitInput('robotObj.ETH', 9, 6)"
            v-model="robotObj.ETH"
            placeholder="请输入ETH本金"></el-input>
          <div class="text-right">
            <div class="cuso">ETH余额:{{ETHBalance}}</div>
          </div>
        </el-form-item>
        <el-form-item label="策略 :" prop="tactics">
          <el-select style="width: 320px" v-model="robotObj.tactics" placeholder="请选择策略">
            <el-option
              v-for="(item, index) in tacticsOptions"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowAddOrEditDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitAdd('robotObj')" v-if="currentHandleType==='add'">确 定</el-button>
		    <el-button type="primary" @click="submitEdit('robotObj')" v-if="currentHandleType==='edit'">保 存</el-button>
		  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Robot",
    data(){
      return {
        //翻页序号
        page: 1,
        //表格每页大小
        per_page: 10,
        //表格数据
        tableData: [],
        //表格数据总数
        tableDataLength: 0,
        //要搜索的平台
        organize: '',
        //是否显示弹框
        isShowAddOrEditDialog: false,
        //当前操作类型
        currentHandleType: '',
        //交易所候选项数组
        bourseOptions: [],
        //交易区候选项数组
        tradingRangeOptions: [],
        //币种候选项数组
        coinOptions: [
          {
            name: 'BTC',
            id: 1
          },
          {
            name: 'ETH',
            id: 2
          },
          {
            name: 'USDT',
            id: 3
          },
        ],
        //交易币对候选项数组
        MoneyForOptions: [{
          name: 'BTC',
          id: 1
        },
          {
            name: 'ETH',
            id: 2
          },
          {
            name: 'USDT',
            id: 3
          },],
        //USDT余额
        USDTBalance: '',
        //BTC余额
        BTCBalance: '',
        //ETH余额
        ETHBalance: '',
        //策略候选项数组
        tacticsOptions: [],
        //机器人obj
        robotObj: {
          //机器人名称
          name: '',
          //交易所
          bourse: '',
          //交易区
          tradingRange: '',
          //所持有的币种
          coin: [],
          //交易币对
          MoneyFor: [],
          //USDT
          USDT: '',
          //BTC
          BTC: '',
          //ETH
          ETH: '',
          //策略
          tactics: '',
        },
        //机器人属性的校验
        robotObjRules: {
          name: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '机器人名称'}),
              trigger: 'blur'
            },
          ],
          bourse: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '交易所'}),
              trigger: 'blur'
            },
          ],
          tradingRange: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '交易区'}),
              trigger: 'blur'
            },
          ],
          coin: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '持有的币种'}),
              trigger: 'blur'
            },
          ],
          MoneyFor: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '交易币对'}),
              trigger: 'blur'
            },
          ],
          USDT: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'USDT本金'}),
              trigger: 'blur'
            },
          ],
          BTC: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'BTC本金'}),
              trigger: 'blur'
            },
          ],
          ETH: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'ETH本金'}),
              trigger: 'blur'
            },
          ],
          tactics: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '策略'}),
              trigger: 'blur'
            },
          ],
        },
        //所有的选项数据
        allOptionsData: [],

      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.initData();
        this.getPlatformList();
        this.getOptionData();
      })
    },
    methods: {
      //机器人列表
      initData(){
        let params = {
          page: this.page,
          per_page: this.per_page,
          organize: this.organize,
        };
        this.$api.Robot.RobotList(params).then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            this.tableData = data.data;
            this.tableDataLength = data.total;
          }
        });
      },

      //获取平台列表
      getPlatformList(){
        this.$api.ApiManage.organizes().then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            for(let item in data){
              let obj = {
                id: item,
                text: data[item],
              };
              this.bourseOptions.push(obj);
            }
          }
        });
      },

      //获得选项数据
      getOptionData(){
        this.$api.Robot.getOptionData().then(res => {
          if(res.data && res.data.status === 1000){
            let data = res.data.data;
            console.log(data);
          }
        });
      },

      //点击'添加'按钮
      clickAddBtn(){
        this.currentHandleType = 'add';
        this.isShowAddOrEditDialog = true;
      },

      //点击'编辑'按钮
      clickEditBtn(){
        this.currentHandleType = 'edit';
        this.isShowAddOrEditDialog = true;
      },

      //点击'暂停'按钮
      clickPauseBtn(row){
        this.$confirm(`确定暂停机器人 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
        })
      },

      //点击'启动'按钮
      clickStartBtn(row){
        this.$confirm(`确定启动机器人 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
        })
      },

      //点击'暂停'按钮
      clickRemoveBtn(row){
        this.$confirm(`确定删除机器人 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {

        }).catch(() => {
        })
      },

      //提交新增
      submitAdd(formName){
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{

          }
        })
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

      //点击添加详情
      clickDetailsBtn(row){
        this.$router.push('/RobotDetails/123');
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
