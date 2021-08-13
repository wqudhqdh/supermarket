import { request } from 'network/request.js'
// 获取购物车信息
export function getShoppingCart(id) {
    // console.log(id + "12122")
    return request({
        url: "/api/getShoppingCart",
        method: "get",
        params: {
            id
        }

    })
}
// 获取对应购物车的商品的详细信息
export function getProductDetails(res) {
    // alert(res)
    return request({
        url: "/api/cartDetails",
        method: "get",
        params: {
            res
        }
    })
}
// 删除购物车的商品的详细信息
export function deleteCart(id) {
    // alert(res)
    return request({
        url: "/api/deleteCart",
        method: "get",
        params: {
            id
        }
    })
}
// 修改购物车的商品的数量
export function ModifyCartNum(id, num) {
    console.log("1111")
        // alert(res)
    return request({
        url: "/api/modifyCartNum",
        method: "get",
        params: {
            id,
            num
        }
    })
}