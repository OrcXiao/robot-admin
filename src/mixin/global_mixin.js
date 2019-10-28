const globalMixins = {
  data(){
    return {}
  },
  methods: {
    //改变每页显示数量
    Mixin_handleSizeChange(val){
      this.currentPage = 1;
      this.pageSize = val || 10;
      this.initData();
    },
    
    //跳转第几页
    Mixin_handleCurrentChange(val){
      this.currentPage = val;
      this.initData();
    },
    
    //选择条件之后..
    Mixin_filterCondition(){
      this.currentPage = 1;
      this.initData();
    },
    
    //关闭弹窗回调..
    Mixin_closeDialog(formName, Dialog){
      setTimeout(() => {
        this.$nextTick(() => {
          if(this.$refs[formName].resetFields){
            this.$refs[formName].resetFields();
          }
        });
        if(Dialog){
          this[Dialog] = false
        }
      }, 100)
    },
    
    //对输入框输入数字输入限制
    Mixin_limitInputNum(value, before, after, state = true){
      //input框的类型必须是text...
      //value,输入框传输的值..
      //before,指定小数点前面的位数..
      //after, 指定小数点后面的位数..
      //state, 是否可以输入小数点, 默认为true,可以输入小数点..false, 不能输入小数点.
      value = value.replace('。', '.');
      let newBefore = parseFloat(before);
      let newAfter = parseFloat(after);
      value = value.replace(/[^ \d.]|\s|^\./g, "");
      value = value.replace(/^0{2,}/g, "0");
      if(state){
        value = value.replace(/\.{2,}/g, ".");
      }
      else{
        value = value.replace(/\./g, "");
      }
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      if(value.indexOf(".") >= 0){
        value = value.split(".")[0].slice(0, newBefore) + "." + value.split(".")[1].slice(0, newAfter);
      }
      else{
        value = value.slice(0, newBefore);
      }
      return value
    },
  
  
    //限制数字的输入..
    Mixin_commonLimitInput(str, before, after, state) {
      let that = this;
      if(str.indexOf(".") >= 0) {
        let attr1 = str.split(".")[0];
        let attr2 = str.split(".")[1];
        that[attr1][attr2] = that.Mixin_limitInputNum(that[attr1][attr2], before, after, state);
      }
      else {
        that[str] = that.Mixin_limitInputNum(that[str], before, after, state);
      }
    }
  
  }
};

export {globalMixins} ;


