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
        prop="organize_zh"
        label="交易所">
      </el-table-column>
      <el-table-column
        prop="key"
        label="Key">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="clickEditBtn(scope.row)"
            icon="el-icon-edit"
            type="success">修改
          </el-button>
          <el-button
            size="mini"
            @click="clickRemoveBtn(scope.row)"
            icon="el-icon-circle-close"
            type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
        label-width="120px">
        <el-form-item label="平台" prop="platform">
          <el-select style="width: 100%" v-model="apiObj.platform" placeholder="请选择平台">
            <el-option
              v-for="(item, index) in platformOptions"
              :key="index"
              :label="item.text"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="key" prop="key">
          <el-input v-model="apiObj.key" placeholder="请输入key"></el-input>
        </el-form-item>
        <el-form-item label="secret" prop="secret">
          <el-input v-model="apiObj.secret" placeholder="请输入secret"></el-input>
        </el-form-item>
        <el-form-item v-if="apiObj.platform === 'okex'" label="passphrase" prop="passphrase">
          <el-input v-model="apiObj.passphrase" placeholder="请输入passphrase"></el-input>
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
      return {
        //表格数据
        tableData: [],
        //显示弹框
        isShowAddOrEditDialog: false,
        //平台候选项
        platformOptions: [],
        //当前操作类型
        currentHandleType: '',
        //克隆空对象
        cloneApiObj: {},
        //操作的apiId
        apiId: '',
        //api对象
        apiObj: {
          platform: '',
          key: '',
          secret: '',
          passphrase: '',
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
              validator: this.$verifys.nullStr({item: 'key'}),
              trigger: 'blur'
            },
          ],
          secret: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'secret'}),
              trigger: 'blur'
            },
          ],
          passphrase: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: 'passphrase'}),
              trigger: 'blur'
            },
          ]
        }
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.cloneApiObj = Object.assign({}, this.apiObj);
        this.getPlatformList();
        this.initData();
      })
    },
    methods: {
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
              this.platformOptions.push(obj);
            }
          }
        });
      },

      //获取表格数据
      initData(){
        this.$api.ApiManage.apiList().then(res => {
          if(res.data && res.data.status === 1000){
            this.tableData = res.data.data;
          }
        });
      },

      //点击'新增'按钮
      clickAddBtn(){
        if(!this.platformOptions.length){
          this.$common.errorHint('当前平台的选项为空, 无法添加');
          return
        }
        this.apiObj = this.cloneApiObj;
        this.currentHandleType = 'add';
        this.isShowAddOrEditDialog = true;
      },

      //点击'修改'按钮
      clickEditBtn(row){
        this.apiId = row.id;
        this.apiObj.key = row.key;
        this.apiObj.platform = row.organize;
        this.currentHandleType = 'edit';
        this.isShowAddOrEditDialog = true;
      },

      //点击'删除'按钮
      clickRemoveBtn(row){
        this.$confirm(`确定删除API ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$api.ApiManage.removeApi(row.id).then(res => {
            if(res.data && res.data.status === 1000){
              this.$common.successHint('api删除成功');
              this.initData();
            }
          });
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
            let params = {
              organize: this.apiObj.platform,
              key: this.apiObj.key,
              secret: this.apiObj.secret,
            };
            if(this.apiObj.platform === 'okex'){
              params.passphrase = this.apiObj.passphrase;
            }
            this.$api.ApiManage.addApi(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.isShowAddOrEditDialog = false;
                this.$common.successHint('api新增成功');
                this.initData();
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
            let params = {
              id: this.apiId,
              organize: this.apiObj.platform,
              key: this.apiObj.key,
              secret: this.apiObj.secret,
            };
            if(this.apiObj.platform === 'okex'){
              params.passphrase = this.apiObj.passphrase;
            }
            this.$api.ApiManage.updateApi(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.isShowAddOrEditDialog = false;
                this.$common.successHint('api修改成功');
                this.initData();
              }
            });

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
