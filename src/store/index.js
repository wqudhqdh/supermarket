import Vue from 'vue'
import Vuex from 'vuex'
import { ChangeAccount } from 'network/profile.js'
import { stringify } from 'qs'
//安装插件
Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
        state: {
            products: [], //商品
            personal: JSON.parse(sessionStorage.getItem('user')), //个人信息
            showState: 1,
            addressinfo: null, //地址信息
            addressflag: 0,
            orderlist: null, //订单信息
            orderlistState: 0
        },
        mutations: {
            //换头像
            changeImgsrc(state, payload) {
                state.personal.imgSrc = payload.imgsrc
            },
            // 修改用户名
            changeUsername(state, payload) {
                state.personal.username = payload.name
            },
            // 存储所有的商品
            getProducts(state, payload) {
                state.products = payload.res
                console.log("store存储了")
                console.log(state.products)
            },
            // 存储登录的个人信息
            savePersonalInfo(state, payload) {
                state.personal = payload.person
                sessionStorage.setItem('user', JSON.stringify(payload.person))
                console.log(payload.person)
                console.log(state.personal)
                console.log("个人信息保存到vuex中了")
            },
            // 保存之前的收货地址并进行展示
            saveAddressInfo(state, payload) {
                state.addressinfo = payload.res
                console.log("地址信息保存到vuex中了")
                state.addressflag = 1
            },
            // 添加收货地址
            addAddressInfo(state, payload) {
                console.log("放进去了")
                state.addressinfo.push(payload.addressInfo)
            },
            // 退出登录
            deletePersonal(state) {
                state.personal = null
            },
            // 充值
            modifyAccount(state, payload) {
                state.personal.account = payload.payload
            },
            //保存从数据库读入的订单
            saveOrder(state, payload) {
                state.orderlist = payload.orderlist
                console.log("订单保存了")
                console.log(state.orderlist)
                this.orderlistState = 1;
            },
            // 添加订单
            addOrder(state, payload) {
                if (state.orderlist === null) {
                    state.orderlist = []
                }
                state.orderlist.push(payload.order)
                console.log("订单添加了")
            },
            // 修改订单状态
            modifyOrderstate(state, payload) {
                state.orderlist.forEach((item) => {
                    if (item.orderid === payload.oid) {
                        item.state = payload.state;
                        console.log('订单状态修改成功')
                        return;
                    }
                })
            }
        },
        actions: {
            //充值账户金额
            changeAccount(content, payload) {
                return new Promise((resolve, reject) => {
                    ChangeAccount(content.state.personal._id, payload).then(res => {
                        if (res === 'success') {
                            content.commit({
                                type: "modifyAccount",
                                payload
                            });
                            resolve(res)
                        }
                    })
                })

            }
        },
        getters: {
            //获取对应类型的要展示的商品
            getProductsByType: (state) => {
                return (ty, flag) => {
                    let list = []
                    if (flag) {
                        for (let item in state.products) {
                            if (state.products[item].category.indexOf(ty) != -1) {
                                list.push(state.products[item]);
                            }
                            if (list.length === 8) {
                                break;
                            }
                        }
                    } else {
                        for (let item in state.products) {
                            if (state.products[item].category.indexOf(ty) != -1) {
                                list.push(state.products[item]);
                            }
                        }
                    }
                    return list;
                }
            },

        },
        modules: {}
    })
    // 导出store共享
export default store