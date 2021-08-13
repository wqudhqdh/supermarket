import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
        if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
        return originalPush.call(this, location).catch(err => err)
    }
    // 路由懒加载
const Home = () =>
    import ('views/Home/Home.vue')
const User = () =>
    import ('views/User/User.vue')
const Detail = () =>
    import ('views/detail/Detail.vue')
const Profile = () =>
    import ('views/profile/Profile.vue')
const Address = () =>
    import ('views/profile/Address.vue')
const PersonalInfo = () =>
    import ('views/profile/PersonalInfo.vue')
const AllOrder = () =>
    import ('views/profile/AllOrder.vue')
const HavePaid = () =>
    import ('views/profile/HavePaid.vue')
const NoPaid = () =>
    import ('views/profile/NoPaid.vue')
const WaiteSend = () =>
    import ('views/profile/WaiteSend.vue')
const RecycleOrder = () =>
    import ('views/profile/RecycleOrder.vue')
const Password = () =>
    import ('views/profile/Password.vue')
const ShoppingCart = () =>
    import ('views/shoppingCart.vue')
const Checkout = () =>
    import ('views/Checkout.vue')
const Order = () =>
    import ('views/Order.vue')



const router = new Router({
        routes: [{
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/user',
                name: 'User',
                component: User
            },
            {
                path: '/detail/:id',
                name: 'Detail',
                component: Detail
            }, {
                path: "/profile",
                name: "Profile",
                component: Profile,
                children: [{
                    // 个人信息
                    path: "personalInfo",
                    component: PersonalInfo

                }, {
                    // 收货地址
                    path: "address",
                    component: Address
                }, {
                    //订单管理
                    path: "order",
                    component: AllOrder,
                    redirect: '/profile/order/havepaid',
                    children: [
                        //已支付 
                        {
                            path: 'havepaid',
                            component: HavePaid
                        },
                        {
                            // 未支付
                            path: 'nopaid',
                            component: NoPaid
                        },
                        {
                            // 待收货
                            path: 'waitesend',
                            component: WaiteSend
                        },
                        {
                            // 订单回收站
                            path: 'recycleOrder',
                            component: RecycleOrder
                        },

                    ]
                }, {
                    //密码
                    path: 'password',
                    component: Password
                }, ]
            },
            {
                path: "/shoppingCart",
                name: "shoppingCart",
                component: ShoppingCart
            },
            {
                path: "/checkout/:cart",
                name: "Checkout",
                component: Checkout
            },
            {
                path: '/order',
                name: "Order",
                component: Order
            }
        ],
        mode: 'history'
    })
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/user' || to.path === '/home' || to.path === '/') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) {
        return next('/user');
    }
    next()
})
export default router