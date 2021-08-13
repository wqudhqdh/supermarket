import { request } from './request'

// 发送注册验证码到邮箱
export function sendCodeToEmail(email) {
    return request({
        url: "/api/getCode",
        method:"get",
        params:{
            "email":email
        }
    })

}
// 查找用户名是否存在
export function checkNames(username) {
    return request({
        url: "/api/checkUsername",
        method:"get",
        params:{
            "username":username
        }
    })

}
// 查找手机号是否存在
export function CheckPhones(phone) {
    return request({
        url: "/api/checkPhone",
        method:"get",
        params:{
           "phone":phone
        }
    })
    }
    // 查找邮箱是否存在
export function CheckEmails(value) {
    return request({
        url: "/api/checkEmail",
        method:"get",
        params:{
           "email":value
        }
    })
    }
        // 用户注册
export function Register(formData) {
    console.log(formData.get("username"))
    // let datas=qs.stringify(formData)
    return request({
        url: "/api/register",
        method:"post",
        data:formData,
        headers: {"Content-Type": "application/x-www-form-urlencoded" }
    })
    }

        // 账号登录
export function LoginAccount(para) {
    console.log(para)
    return request({
        url: "/api/loginAccount",
        method:"post",
        data:para,
        // headers: {"Content-Type": "application/x-www-form-urlencoded" }
    
    })
}
// 邮箱登录
export function LoginEmail(para) {
    console.log(para)
    return request({
        url: "/api/loginEmail",
        method:"post",
        data:para,
        // headers: {"Content-Type": "application/x-www-form-urlencoded" }
    
    })
}