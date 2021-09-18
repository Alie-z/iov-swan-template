/**
 * @file basePage
 * @author meijuntao@baidu.com
 * @description 为页面提供基础能力，每个页面须继承该模块进行开发
 */

/* globals Page, swan, getApp  */

import log from './log';
import request from './request';
import api from './api';
import storage from './storage';
import constType from '../const';
import store from '../store';
import utils from './index';

// @if NODE_ENV = 'development'
// import mock from '../mock/index';
// @endif

const app = getApp();

// 注册全局信息
function injectData(pageObject) {
    const globalData = app.globalData;
    const injectStore = pageObject.injectStore && pageObject.injectStore(store.state);
    pageObject.data = Object.assign({}, globalData, injectStore, pageObject.data || {});
}

// 注入公共方法
function injectMethods(pageObject) {
    pageObject.$app = app;
    pageObject.$api = api;
    pageObject.$request = request;
    pageObject.$utils = utils;

    // @if NODE_ENV = 'development'
    // pageObject.$mock = mock;
    // @endif
    pageObject.$storage = storage;
    pageObject.$const = constType;
    pageObject.$showErrorPage = function (errType) {
        this.setData({
            showErrorPage: true,
            errType: errType
        });
        this.removeSkeleton && this.removeSkeleton();
    };
    pageObject.commonImageError = function (e) {
        const url = e.target.dataset.src || '';
        const msg = e.detail.errMsg;
        log.send('image_error', { url, msg });
    };
    pageObject.$sendPfLog = function (params) {
        log.sendPfLog(params);
    };
}

// mixins是一个数组，数组中每一项为一个对象
// 对象的每一项是一个函数
// 同名优先级：用户手动声明 > mixins中的
function injectMixins(pageObject) {
    if (!pageObject.mixins || !pageObject.mixins.length) {
        return;
    }

    pageObject.mixins.forEach(item => {
        Object.keys(item).forEach(prop => {
            if (typeof item[prop] !== 'function') {
                return;
            }

            if (pageObject[prop] !== undefined) {
                console.log(`[${prop}] 已经被用户声明，mixins中的无法生效！`);
                return;
            }

            pageObject[prop] = item[prop];
        });
    });
}

export default function (pageObject = {}) {
    injectData(pageObject);
    injectMethods(pageObject);
    injectMixins(pageObject);
    return pageObject;
}
