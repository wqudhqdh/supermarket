// 对所有的数据请求进行封装
import {request} from "./request"
// 获取所有的商品信息并保存到vuex中
export function getAllProducts(){
    return request({
        url: "/api",
        method: "get",
      });
}