<template>
  <div class="p30 bkFFFFFF ApiManage-wrap">
    <div class="pb10">
      <el-button
        @click="clickAddBtn"
        icon="el-icon-circle-plus-outline"
        type="primary">添加
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
        prop="date"
        label="交易所">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Key">
      </el-table-column>
      <el-table-column
        width="220"
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
      :current-page="4"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="70">
    </el-pagination>

    <!--添加和修改api弹框-->
    <el-dialog
      :title="currentHandleType === 'add' ?'添加API': '修改API'"
      @close="Mixin_closeDialog('apiObj', 'isShowAddOrEditDialog')"
      :visible.sync="isShowAddOrEditDialog"
      :append-to-body=true
      width="400px">
      <el-form
        class="apiObj-module"
        :model="apiObj"
        :rules="apiObjRules"
        ref="apiObj"
        label-position="right"
        label-width="100px">
        <el-form-item label="平台" prop="platform">
          <el-select v-model="apiObj.platform" placeholder="请选择平台">
            <el-option
              v-for="item in platformOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="KEY" prop="key">
          <el-input v-model="apiObj.key" placeholder="请输入KEY"></el-input>
        </el-form-item>
        <el-form-item label="SECRET" prop="secret">
          <el-input v-model="apiObj.secret" placeholder="请输入SECRET"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="isShowAddOrEditDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitAdd('apiObj')" v-if="currentHandleType==='add'">确 定</el-button>
		    <el-button type="primary" @click="submitEdit('apiObj')" v-if="currentHandleType==='edit'">保 存</el-button>
		  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ApiManage",
    data(){
      let validatorKey = (rule, value, callback) => {
        if(isNaN(value)){
          callback(new Error('请输入数字'));
        }
        else{
          callback();
        }
      };
      let validatorSecret = (rule, value, callback) => {
        if(isNaN(value)){
          callback(new Error('请输入数字'));
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
        //显示弹框
        isShowAddOrEditDialog: false,
        //平台候选项
        platformOptions: [],
        //当前操作类型
        currentHandleType: '',
        //api对象
        apiObj: {
          platform: '',
          key: '',
          secret: '',
        },
        apiObjRules: {
          platform: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '平台'}),
              trigger: 'blur'
            },
          ],
          key: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'KEY'}),
              trigger: 'blur'
            },
            /*
             {
             required: true,
             validator: validatorKey,
             trigger: 'blur'
             }
             */
          ],
          secret: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'SECRET'}),
              trigger: 'blur'
            },
            /*
             {
             required: true,
             validator: validatorSecret,
             trigger: 'blur'
             }
             */
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
    methods: {
      //获取表格数据
      initData(){
      },

      //点击'新增'按钮
      clickAddBtn(){
        this.currentHandleType = 'add';
        this.isShowAddOrEditDialog = true;
      },

      //点击'修改'按钮
      clickEditBtn(row){
        this.currentHandleType = 'edit';
        this.isShowAddOrEditDialog = true;
      },

      //点击'删除'按钮
      clickRemoveBtn(row){
        this.$confirm(`确定删除API ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
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
