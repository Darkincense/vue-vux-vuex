// 固定图片引用
import recomed1 from "@/assets/images/home/tuijian.png";
import rightArrow1 from "@/assets/images/home/right-arrow.png";
import zhuanChang from "@/assets/images/home/zhuanchang_title.jpg";
import jingPin from "@/assets/images/home/jingpin_title.jpg";

import jingpaizhong from "@/assets/images/home/jingpaizhong.png";
import yuzhanzhong from "@/assets/images/home/yuzhanzhong.png";
import yijieshu from "@/assets/images/home/yijieshu.png";

import jingpaizhong1 from "@/assets/images/home/jingpaizhong1.png";
import yuzhanzhong1 from "@/assets/images/home/yuzhanzhong1.png";
import yijieshu1 from "@/assets/images/home/yijieshu1.png";

import testPaddingImg1 from "@/assets/images/home/paipinzhanshi.png";
import boutique from "@/assets/images/home/jingpin.jpg";

const homeData = {
    // 固定图片引用
    fixedImg: {
        recomed: recomed1,
        rightArrow: rightArrow1,
        zhuanChang: zhuanChang,
        jingPin: jingPin
    },
    auctionNav: {
        auction: "auctioning" // 默认选择第一个
    },
    // 轮播图
    swiperList: [],
    biddingList: [], // 即将结拍  专场
    boutiqueList: [], // 即将结拍  精品
    specialList: [],  // 专场拍卖
    specialList2: [],  // 专场拍卖
    specialList3: [],  // 专场拍卖
    competitiveProductsList: [],   // 精品拍卖,
    competitiveProductsList2: [],   // 精品拍卖,
    competitiveProductsList3: [],   // 精品拍卖,
    recomedList: [],     // 光环推荐
    statuAction: {
        statuAction1: {
            type: 1,
            status: "1",
            arr: [
                {
                    name: "竞拍中",
                    current: jingpaizhong1,
                    before: jingpaizhong,
                    after: jingpaizhong1,
                    status: "1",
                    color: {
                        color: "#cc5152",
                        border: '.0625rem solid #cc5152'
                    }
                },
                {
                    name: "预展中",
                    current: yuzhanzhong,
                    before: yuzhanzhong,
                    after: yuzhanzhong1,
                    status: "2",
                    color: {
                        color: "#000"
                    }
                },
                {
                    name: "已结拍",
                    current: yijieshu,
                    before: yijieshu,
                    after: yijieshu1,
                    status: "3",
                    color: {
                        color: "#000"
                    }
                }
            ]
        },
        statuAction2: {
            type: 2,
            status: "1",
            arr: [
                {
                    name: "竞拍中",
                    current: jingpaizhong1,
                    before: jingpaizhong,
                    after: jingpaizhong1,
                    status: "1",
                    color: {
                        color: "#cc5152",
                        border: '.0625rem solid #cc5152'
                    }
                },
                {
                    name: "预展中",
                    current: yuzhanzhong,
                    before: yuzhanzhong,
                    after: yuzhanzhong1,
                    status: "2",
                    color: {
                        color: "#000"
                    }
                },
                {
                    name: "已结拍",
                    current: yijieshu,
                    before: yijieshu,
                    after: yijieshu1,
                    status: "3",
                    color: {
                        color: "#000"
                    }
                }
            ]
        }
    }
}

export default homeData;