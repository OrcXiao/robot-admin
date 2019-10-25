const verify = {};
/*
 * @params: hint --- 传入的提示对象, 自由配置属性, 目前可以配置以下参数:
 * hint:{
 *   item: (提示名 --- string类型),
 *   maxLength: (提示名的字段长度 --- number类型),
 *   maxVal: (提示数字的最大值 --- number类型),
 * }
 * */

/*========== 非空的校验 ==========
 校验内容:
 1,字段不能为空
 */
verify.nullStr = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else{
      callback();
    }
  }
};

/*========== 数字的校验 ==========
 校验内容:
 1,字段不能为空.
 2,只能输入数字.
 3,输入的数字最后一位不能是小数点"."
 */
verify.number = (hint) => {
  return (rule, value, callback) => {
    if(!value || value.length === 0){
      callback(new Error(hint.item + '不能为空'));
    }
    else if(isNaN(value) || value.endsWith(".")){
      callback(new Error('请输入正确的数字'));
    }
    else if(hint.maxVal && (parseFloat(value) > hint.maxVal)){
      callback(new Error('不能超过最大值' + hint.maxVal));
    }
    else if(hint.maxLength && value.length !== hint.maxLength){
      callback(new Error(`请输入${hint.maxLength}位数字`));
    }
    else{
      callback();
    }
  }
};

export default verify
