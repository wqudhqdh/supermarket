import { request } from './request'
// 删除商品
export function deleteProduct(id) {
    return request({
        url: "/api/detail",
        method: "post",
        params: {
            id
        }
    })
}