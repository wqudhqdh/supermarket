import { request } from './request'
// 获取对应商品的详细信息
export function getProductDetail(id) {
    return request({
        url: "/api/detail",
        method: "post",
        params: {
            id
        }
    })
}
// 获取当前用户的收货地址
export function getAddress(id) {
    console.log(id)
    return request({
        url: "/api/address",
        method: "get",
        params: {
            id
        }
    })

}
// 加入商品到购物车
export function addToShoppingCart(userid, product) {
    return request({
        url: "/api/addToShoppingCart",
        method: "post",
        data: {
            userid,
            product
        }
    })

}
// 获取商品具体的详细信息
export function productDetail(id) {
    return request({
        url: '/api/productDetails',
        method: 'get',
        params: {
            id
        }
    })
}
// 获取商品是否有货
export function checkProduct(id, color, version) {
    return request({
        url: '/api/checkproduct',
        method: 'post',
        data: {
            id,
            color,
            version
        }
    })
}