import { request } from './request.js'
// 提交订单并保存
export function saveOrder(cart, address, state) {
    console.log('saveorder')
    return request({
        url: "/api/order",
        method: "post",
        data: {
            cart,
            address,
            state
        }
    })
}
// 修改库存
export function Modifyinventory(cart) {
    return request({
        url: "/api/modifyinventory",
        method: "post",
        data: {
            cart
        }
    })
}
// 显示订单详情
export function showOrderInfo(orderid) {
    return request({
        url: "/api/showOrder",
        method: "post",
        data: {
            orderid
        }
    })
}
// 查询不同状态的订单
export function findOrderByState(id) {
    return request({
        url: "/api/findOrderByState",
        method: "post",
        data: {
            id
        }
    })
}
// 修改订单的状态
export function ModifyOrderByState(id, state) {
    console.log(id, state)
    return request({
        url: "/api/modifyOrderByState",
        method: "post",
        data: {
            id,
            state
        }
    })
}