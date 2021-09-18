/*
 * @file:优惠券列表
 * @Author: meijuntao@baidu.com
 * @Date: 2021-08-02 17:49:09
 * @Description:
 * @FilePath: /iov-vgop/src/components/couponsList/index.js
 */
import extendPage from '../../utils/basePage';

/* globals Page, swan, Component */
Component(
    extendPage({
        // eslint-disable-line
        options: {
            addGlobalClass: true
        },
        properties: {
            couponsData: {
                type: Object,
                value: {
                    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    title: '午市限时优惠午市限时优惠',
                    price: '$ 99.99',
                    status: 1
                }
            }
        },
        data: {},
        ready() {},
        methods: {}
    })
);
