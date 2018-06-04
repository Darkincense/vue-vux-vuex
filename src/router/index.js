// 首页
import HomeComponent from '@/pages/home.components'
// 资讯
import NewsComponent from '@/pages/news.components'
// 每条新闻详情
import NewsDetailComponent from '@/components/newsDetail'
// 光环
import HaloComponent from '@/pages/halo.components'
// 光环→→→→→→合作艺术家→→→→→→艺术家简介
import ArtistComponent from '@/components/artist'
// 个人中心
import PersonalComponent from '@/pages/personal.components'
// 首页→→→→→→竞拍中→→→→→→详情
import SpecialAuctionDetail from "@/components/specialAuctionDetail.components"
// 精品拍卖→→→→→→竞拍中→→→→→→详情
import AuctionGoodDetail from '@/components/auctionGoodDetail.components'
// 个人中心→→→→→→全部订单
import orderMyPComponent from '@/pages/personal/orderMy'
// 个人中心→→→→→→全部订单→→→→→→订单详情
import orderMyDetailPComponent from '@/pages/personal/orderMyDetail'
// 个人中心→→→→→→我的账单
import billMyPComponent from '@/pages/personal/billMy'
// 个人中心→→→→→→浏览记录
import historyMyPComponent from '@/pages/personal/historyMy'
// 个人中心→→→→→→我的竞拍
// import auctionMyPComponent from '@/pages/personal/auctionMy'
// 个人中心→→→→→→拍卖规则
import auctionRulesPComponent from '@/pages/personal/auctionRules'
// 个人中心→→→→→→发货规则
import shippingRulesPComponent from '@/pages/personal/shippingRules'
// 个人中心→→→→→→联系客服
import concatPComponent from '@/pages/personal/concat'
// 个人资料
import PersonalData from '@/pages/personal/personalData.components'
// 注册页面
import RegisterComponents from '@/pages/login/register.components'
// 登录页面
import LoginComponents from '@/pages/login/login.components'
// 忘记密码
import ForgotPassword from '@/pages/login/ForgotPassword.components'
// 个人中心→→→→→→设置
import SetUpComponents from '@/pages/personal/setUp.components'
// 个人中心→→→→→→设置→→→→→→昵称
import SetNickname from '@/pages/personal/setNickname.components'
// 个人中心→→→→→→设置→→→→→→收货地址→→→→→→添加收货地址
import SetAddressComponent from '@/pages/personal/SetAddress.components'
// 个人中心→→→→→→设置→→→→→→收货地址
import AddressListComponent from '@/pages/personal/AddressList.components'
// 个人中心→→→→→→设置→→→→→→编辑收货地址
import EditorAdress from '@/pages/personal/editorAdress.components'
//wxlogin 跳转到的页面 
import getAccessToken from '@/pages/login/getAccessToken.components'


const routers = [
    {
        path: '/',
        component: HomeComponent,
    },
    {
        path: '/auctionGoodDetail',
        component: AuctionGoodDetail,
    },
    {
        path: '/personal/login',
        component: LoginComponents,
    },

    {
        path: '/getAccessToken',
        component: getAccessToken,
    },

    {
        path: '/personal/register',
        component: RegisterComponents,
    },
    {
        path: '/specialAuctionDetail',
        component: SpecialAuctionDetail,
    },
    {
        path: '/news',
        component: NewsComponent
    },
    {
        path: '/newsDetail',
        component: NewsDetailComponent
    },
    {
        path: '/halo',
        component: HaloComponent,
    },
    {
        path: '/artist',
        component: ArtistComponent,
    },
    {
        path: '/personal',
        component: PersonalComponent,
    },
    {
        path: '/personal/forgotpassword',
        component: ForgotPassword,
    },
    {
        path: '/setUp',
        component: SetUpComponents
    },
    {
        path: '/personal/data',
        component: PersonalData
    },
    {
        path: '/setNickname',
        component: SetNickname
    },
    {
        path: '/AddressList',
        component: AddressListComponent
    },
    {
        path: '/setAddress',
        component: SetAddressComponent
    },
    {
        path: '/editorAdress',
        component: EditorAdress
    },
    {
        path: '/personal/orderMy',
        component: orderMyPComponent
    },
    {
        path: '/personal/orderMy/orderMyDetail',
        component: orderMyDetailPComponent
    },
    {
        path: '/personal/concat',
        component: concatPComponent
    },
    {
        path: '/personal/shippingRules',
        component: shippingRulesPComponent
    },
    {
        path: '/personal/auctionRules',
        component: auctionRulesPComponent
    },
    // {
    //     path: '/personal/auctionMy',
    //     component: auctionMyPComponent
    // },
    {
        path: '/personal/historyMy',
        component: historyMyPComponent
    },
    {
        path: '/personal/billMy',
        component: billMyPComponent
    },
]

export default routers;