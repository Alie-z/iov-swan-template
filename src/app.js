/**
 * @file app
 * @author meijuntao@baidu.com
 */

/* globals App */
import 'regenerator-runtime/runtime.js';
App({
    // eslint-disable-line
    onLaunch(event) {
        console.log('onLaunch');
    },
    onShow(event) {
        console.log('onShow');
    },
    globalData: {
        userInfo: 'user'
    }
});
