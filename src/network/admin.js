import { request } from './request'
// 删除商品
export function deleteProduct(id, pid) {
    return request({
        url: "/api/deleteproduct",
        method: "post",
        data: {
            id,
            pid
        }
    })
}
// 添加商品
export function addProduct(product) {
    return request({
        url: "/api/addproduct",
        method: "post",
        data: {
            product
        }
    })
}
// 获取商品分类
export function getCategory() {
    return request({
        url: "/api/home/category",
        method: "get"
    })
}
// 获取所有用户
export function getAllUser() {
    return request({
        url: "/api/getAllUser",
        method: "get"
    })
}
// 删除用户
export function deleteUser(id) {
    return request({
        url: "/api/deleteUser",
        method: "get",
        params: {
            id
        }
    })
}
//删除订单
export function deleteOrders(id) {
    return request({
        url: '/api/deleteOrder',
        method: 'post',
        data: {
            id
        }
    })
}