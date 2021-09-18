/**
 * @file h5与小程序通信，支持jssdk不支持的一些方法
 * @author meijuntao@baidu.com
 *
 * 实现方式：h5使用jssdk的navigateTo方法，跳转到特定不存在的页面h5bridge，小程序进行劫持跳转
 * h5bridge页面参数说明如下：
 *   method：需要调用的小程序方法，有白名单限制
 *   params：调用的小程序方法的参数，注意不支持传回调
 *   failUrl：调用失败时降级h5页面，调起NA或者APP等场景使用
 */

/* globals Page, swan */
const whiteMethodList = ['openBdboxWebview', 'openAppByURL'];

export default {
    process(opts) {
        if (whiteMethodList.indexOf(opts.method) === -1) {
            return;
        }
        let params = {};
        try {
            params = JSON.parse(opts.params);
        } catch (e) {
            return;
        }

        // 打开失败，默认轻框打开h5页
        if (opts.failUrl) {
            params.fail = () => {
                swan.openBdboxWebview({
                    module: 'browser',
                    action: 'open',
                    parameters: {
                        url: opts.failUrl,
                        newwindow: '1'
                    }
                });
            };
        }
        swan[opts.method](params);
    }
};
