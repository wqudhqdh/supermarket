import { request } from 'network/request.js'
// 保存地址信息到数据库
export function saveAddressToDB(address, id) {
    return request({
        url: "/api/saveAddress",
        method: "post",
        data: {
            address,
            id
        }
    })
}
// 删除地址信息到数据库
export function deleteAddressToDB(id) {
    return request({
        url: "/api/deleteAddress",
        method: "post",
        data: {
            id
        }

    })
}
// 修改地址信息到数据库
export function modifyAddressToDB(address) {
    return request({
        url: "/api/modifyAddress",
        method: "post",
        data: {
            address
        }

    })
}
//获取地址信息
export function getAddress(id) {
    return request({
        url: "/api/getAddress",
        method: "post",
        data: {
            id
        }

    })
}
// 修改账户信息
export function ChangeAccount(id, account) {
    return request({
        url: "/api/changeAccount",
        method: "post",
        data: {
            id,
            account
        }
    })
}
// 上传头像信息
export function saveImgSrc(id, img) {
    return request({
        url: "/api/saveImgsrc",
        method: "post",
        data: {
            id,
            img
        }
    })
}
// 修改个人信息
export function modifyusername(id, value) {
    return request({
        url: "/api/modifyUsername",
        method: "post",
        data: {
            id,
            name,
            value
        }
    })
}
// 修改登录密码
export function changePassword(id, value) {
    return request({
        url: "/api/modifyPassword",
        method: "post",
        data: {
            id,
            value
        }
    })
}
// 修改支付密码
export function changePayPassword(id, value) {
    return request({
        url: "/api/modifyPayPassword",
        method: "post",
        data: {
            id,
            value
        }
    })
}