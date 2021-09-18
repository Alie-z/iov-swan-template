/*
 * @file:
 * @Author: meijuntao@baidu.com
 * @Date: 2021-08-13 11:18:51
 * @Description:
 * @FilePath: /iov-swan/src/pages/task/index.js
 */
import extendPage from '../../utils/basePage';

/* globals Page, swan */
Page(
    extendPage({
        // eslint-disable-line
        data: {
            tabs: [
                {
                    name: 'coupon',
                    label: '优惠券'
                }
            ],
            couponTabs: [
                {
                    name: 'all',
                    label: '全部',
                    voiceTag: '全部'
                },
                {
                    name: 1,
                    label: '分类1',
                    voiceTag: '分类1'
                },
                {
                    name: 2,
                    label: '分类2',
                    voiceTag: '分类2'
                },
                {
                    name: 2,
                    label: '分类2',
                    voiceTag: '分类2'
                },
                {
                    name: 2,
                    label: '分类2',
                    voiceTag: '分类2'
                },
                {
                    name: 2,
                    label: '分类2',
                    voiceTag: '分类2'
                }
            ],
            active: 'coupon',
            error: false,
            loading: false
        },
        onInit(query) {},
        onReady() {},
        onShow() {},
        onHide() {},
        // 网络错误，刷新操作
        netErrorTap() {
            let {longitude, latitude} = this.data;
            this.getCityId(longitude, latitude);
            this.getOrderCount();
        },
        bindaccount() {
            swan.showToast({
                icon: 'none',
                title: '点击了头像'
            });
        },
        getViewData: async function (id) {
            this.setData({
                loading: true
            });
            swan.showLoading({
                title: '加载数据123231'
            });
            try {
                this.setData({
                    loading: false
                });

                swan.hideLoading();
            } catch (error) {
                swan.hideLoading();
            }
        }
    })
);
