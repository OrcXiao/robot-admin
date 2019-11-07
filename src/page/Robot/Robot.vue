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
          <el-switch
            @change="changSwitch(scope.row, 'profit_end')"
            :active-value="2" :inactive-value="1"
            v-model="scope.row.profit_end">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="停止补仓">
        <template slot-scope="scope">
          <el-switch
            @change="changSwitch(scope.row, 'stop_open_position')"
            :active-value="2" :inactive-value="1"
            v-model="scope.row.stop_open_position">
          </el-switch>
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
            v-if="scope.row.status === 1"
            @click="clickPauseBtn(scope.row)"
            icon="el-icon-video-pause"
            type="info">暂停
          </el-button>
          <el-button
            v-if="scope.row.status === 3"
            @click="clickStartBtn(scope.row)"
            icon="el-icon-video-play"
            type="info">启动
          </el-button>
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
      width="520px">
      <el-form
        :model="robotObj"
        :rules="robotObjRules"
        ref="robotObj"
        label-position="right"
        label-width="140px">
        <el-form-item label="机器人名称 :" prop="name">
          <el-input style="width: 320px" v-model="robotObj.name" placeholder="请输入机器人名称"></el-input>
        </el-form-item>
        <el-form-item label="交易所 :" prop="bourse">
          <el-select
            @change="changeBourse"
            style="width: 320px"
            v-model="robotObj.bourse"
            placeholder="请选择交易所">
            <el-option
              v-for="(item, index) in bourseOptions"
              :key="index"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="robotObj.bourse" label="交易区 :" prop="tradingRange">
          <el-select
            @change="changeTradingRange"
            style="width: 320px"
            v-model="robotObj.tradingRange"
            placeholder="请选择交易区">
            <el-option
              v-for="(item, index) in tradingRangeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="coinOptions.length" label="持有的币种 :" prop="coin">
          <el-checkbox-group @change="changeCoin" v-model="robotObj.coin">
            <el-checkbox
              v-for="(item, index) in coinOptions"
              :key="index"
              name="type"
              :label="item.value">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="MoneyForOptions.length" label="交易币对 :" prop="MoneyFor">
          <el-checkbox-group v-model="robotObj.MoneyFor">
            <el-checkbox
              v-for="(item, index) in MoneyForOptions"
              :key="index"
              :label="item.id"
              name="type">
              {{item.symbol}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in robotObj.principalList"
          :label="item.text + '本金 :'"
          :key="index"
          :prop="'principalList.' + index + '.value'"
          :rules="{
            required: true,
            message: item.text + '不能为空',
            trigger: 'blur',
          }">
          <el-input style="width: 320px" v-model="item.value" :placeholder="`请输入${item.text}本金`"></el-input>
          <div class="text-right">
            <div class="cuso">{{item.text}}余额 : {{item.balance}}</div>
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
        coinOptions: [],
        //所有的交易币对候选项
        AllMoneyForOptions: [],
        //交易币对候选项数组
        MoneyForOptions: [],
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
          //本金列表
          principalList: [],
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
        //所有币种的余额
        allCoinBalance: [],
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
        this.getStrategiesList();
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
            this.allOptionsData = res.data.data;
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

      //改变'交易所'下拉框
      changeBourse(val){
        let arr = [];
        for(let item in this.allOptionsData[val]){
          let obj = {
            label: item,
            value: item,
          };
          arr.push(obj);
        }
        this.tradingRangeOptions = arr;
        this.robotObj.tradingRange = '';
        this.coinOptions = [];
        this.MoneyForOptions = [];
        this.robotObj.coin = [];
        this.robotObj.principalList = [];
        this.queryBalance();
      },

      //改变'交易区'下拉框
      changeTradingRange(val){
        let obj = this.allOptionsData[this.robotObj.bourse][val];
        let arr = [];
        this.AllMoneyForOptions = obj.symbol;
        obj.coin.forEach(item => {
          let obj = {
            label: item,
            value: item,
          };
          arr.push(obj);
        });
        this.coinOptions = arr;
      },

      //改变币种
      changeCoin(val){
        let arr = val;
        let newArr = [];
        this.MoneyForOptions = [];
        this.robotObj.principalList = [];
        this.AllMoneyForOptions.forEach(item => {
          arr.forEach(itemIn => {
            if(item.symbol.toLocaleUpperCase().includes(itemIn.toLocaleUpperCase())){
              newArr.push(JSON.stringify(item))
            }
          })
        });
        arr.forEach(item => {
          let obj = {
            text: item,
            value: '',
            balance: this.getCoinBalance(item)
          };
          this.robotObj.principalList.push(obj)
        });

        new Set(newArr).forEach(item => {
          this.MoneyForOptions.push(JSON.parse(item));
        });
      },

      //过得所有币种查询余额
      queryBalance(){
        this.$api.Robot.queryBalance({organize: this.robotObj.bourse}).then(res => {
          if(res.data && res.data.status === 1000){
            this.allCoinBalance = res.data.data;
          }
        });
      },

      //根据币种获得余额
      getCoinBalance(coin){
        let obj = this.allCoinBalance.find(item => item.symbol.toLocaleUpperCase() === coin.toLocaleUpperCase());
        return obj.balance
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
        console.log(this.robotObj.principalList);
        this.$refs[formName].validate((valid) => {
          if(!valid){
            return false;
          }
          else{
            let params = {
              name: this.robotObj.name,
              organize: this.robotObj.bourse,
              plan: this.robotObj.tactics,
              bit_symbol_ids: this.robotObj.MoneyFor,
              has_coin: this.robotObj.coin,
            };
            params.all_principal = [];
            this.robotObj.principalList.forEach(item => {
              let obj = {
                [item.text]: parseFloat(item.value)
              };
              params.all_principal.push(obj);
            });
            this.$api.Robot.addRobot(params).then(res => {
              console.log(res);
              if(res.data && res.data.status === 1000){
                let data = res.data.data;
                console.log('ok');
              }
            });
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

      //点击'详情'按钮
      clickDetailsBtn(row){
        this.$router.push('/RobotDetails/123');
      },

      //切换开关
      changSwitch(row, type){
        let stateStr = row[type] === 1 ? '关闭' : '开启';
        let attrStr = '';
        let params = {};
        if(type === 'profit_end'){
          attrStr = '止盈出场';
          params = {
            id: row.id,
            profit_end: row[type]
          };
        }
        else{
          attrStr = '停止补仓';
          params = {
            id: row.id,
            stop_open_position: row[type]
          };
        }
        this.$api.Robot.changSwitch(params).then(res => {
          if(res.data && res.data.status === 1000){
            this.$common.successHint(`机器人 ( ${row.name} ) ${attrStr}${stateStr}成功`);
            this.initData()
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
