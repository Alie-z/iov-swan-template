/**
 * @file log.js
 * @author meijuntao@baidu.com
 */

/* globals Page, swan, getApp */
import pageName from './pageName';

function clearPerfData(perfData) {
    Object.keys(perfData).forEach(name => {
        perfData[name] = 0;
    });
}

export default {
    send(name, obj) {
        /**
         * @name 长度不能超过20个字符,整个事件唯一标识
         */

        const page = pageName.getPageName();

        // 待定，以后考虑要不要对打点进行通用的分类处理。

        console.log(name, obj);
        swan.reportAnalytics(name, obj);
    },

    sendPfLog(params) {
        const info = {};
        const app = getApp();
        const perfData = app.perfData;
        const page = pageName.getPageName() || params.page;

        // 调起时长
        if (perfData.invokT && perfData.onLaunchT) {
            info.openTime = perfData.invokT - perfData.onLaunchT;
        }

        // app launch处理时长
        if (perfData.onLaunchT && perfData.launchReadyT) {
            info.launchTime = perfData.launchReadyT - perfData.onLaunchT;
        }

        // launch到页面onLoad时长
        if (perfData.launchReadyT && perfData.onLoadT) {
            info.startTime = perfData.onLoadT - perfData.launchReadyT;
        }

        // 首页，定位时长
        if (perfData.onLoadT && perfData.getLocationT) {
            info.locateTime = perfData.getLocationT - perfData.onLoadT;
        }

        // 请求前的cookie设置
        if (perfData.getLocationT && perfData.resolveHeaderT) {
            info.setCookieTime = perfData.resolveHeaderT - perfData.getLocationT;
        }

        // 真正的request时长
        if (perfData.launchReadyT && perfData.responseT) {
            info.requestTime = perfData.responseT - perfData.launchReadyT;
        }

        // 数据处理时长
        if (perfData.beforeRenderT && perfData.getFilterDataT) {
            info.filterTime = perfData.getFilterDataT - perfData.beforeRenderT;
        }

        if (perfData.firstRenderT && perfData.getFilterDataT) {
            info.firstRenderTime = perfData.firstRenderT - perfData.getFilterDataT;
        }

        // setData时长，渲染时长
        if (perfData.getFilterDataT && perfData.afterRenderT) {
            info.renderTime = perfData.afterRenderT - perfData.getFilterDataT;
        }

        // 首屏时间
        if (perfData.onLaunchT && perfData.firstRenderT) {
            info.fisrtScreen = perfData.firstRenderT - perfData.onLaunchT;
        }

        // 白屏时长
        if (perfData.onLaunchT && perfData.onLoadT) {
            info.whiteScreen = perfData.onLoadT - perfData.onLaunchT;
        }

        clearPerfData(perfData);
        swan.request({
            url: 'https://sp1.baidu.com/5b1ZeDe5KgQFm2e88IuM_a/mwb2.gif',
            data: {
                pid: '4_90',
                lid: Date.now(),
                ts: Date.now(),
                type: 'pf_comm',
                info: JSON.stringify(info),
                dim: JSON.stringify({
                    page
                }),
                group: 'service'
            },
            mode: 'no-cors',
            dataType: 'no-response',
            success: () => {
                // TODO
            }
        });
    },

    // 单独统计接口时长
    sendApiPfLog(url = '', time) {
        let pathLast = '';
        try {
            const split = url.split('?')[0].split('/');
            pathLast = split[split.length - 1];
        } catch (err) {
            console.log(err);
        }

        if (!pathLast) {
            return;
        }

        const info = {};
        info[pathLast] = time;

        swan.request({
            // 还没有地址
            // url: 'https://sp1.baidu.com/5b1ZeDe5KgQFm2e88IuM_a/mwb2.gif',
            data: {
                pid: '4_90',
                lid: Date.now(),
                ts: Date.now(),
                type: 'pf_comm',
                info: JSON.stringify(info),
                group: 'api'
            },
            mode: 'no-cors',
            dataType: 'no-response'
        });
    }
};
