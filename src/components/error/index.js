/*
 * @file:
 * @Author: meijuntao@baidu.com
 * @Date: 2021-08-03 19:49:04
 * @Description:
 * @FilePath: /iov-vgop/src/components/error/index.js
 */
/* globals Page, swan, Component */
Component({
    // eslint-disable-line
    externalClasses: ['class-name'],
    properties: {
        type: {
            type: String,
            value: 'network'
        }
    },
    methods: {
        tap: function (e) {
            this.triggerEvent('tap', e);
        }
    }
});
