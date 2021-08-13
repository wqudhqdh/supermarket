import axios from 'axios'
export function request(config,success,failure){
        const instance =axios.create({
    basrURL:'/api',
    timeout:8000
        })
        instance.interceptors.request.use(config=>{
            return config
        },err=>{
            console.log(err)
        })
        instance.interceptors.response.use(res=>{
            return res.data
        },err=>{
            console.log(err)
        })
       return  instance(config)
}
//创建实例
// const instance =axios.create({
//     basrURL:'http://123.207.32.32:8000',
//     timeout:5000
// })
// //发送真正的网络请求
// instance(config).then(res=>{
//     console.log(res)
//     success(res)
// })
// .catch(err=>{
//     console.log(err)
//     failure(err)
// })
