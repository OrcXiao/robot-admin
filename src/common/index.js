import {Message} from "element-ui";
const common = {};

//操作-成功-提示框
common.successHint = (text) => {
  return Message({
    showClose: true,
    message: text,
    type: 'success'
  })
};

//操作-错误-提示框
common.errorHint = (text) => {
  return Message({
    showClose: true,
    message: text,
    type: 'error'
  })
};

export default common;

