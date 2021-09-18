// @if NODE_ENV = 'development'
function post(url, params) {
    const res = arr.find(item => {
        if (item && url.includes(item.url)) {
            return true;
        } else {
            return false;
        }
    });
    return new Promise(resolve => {
        setTimeout(() => {
            if (res) {
                resolve(JSON.parse(JSON.stringify(res.data)));
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    logId: '0111648239',
                    data: [],
                    time: 1582351311
                });
            }
        }, 500);
    });
}

function get(url, params) {
    const res = arr.find(item => {
        if (item && url.includes(item.url)) {
            return true;
        } else {
            return false;
        }
    });
    return new Promise(resolve => {
        setTimeout(() => {
            if (res) {
                resolve(res.data);
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    logId: '0111648239',
                    data: [],
                    time: 1582351311
                });
            }
        }, 500);
    });
}
module.exports = {
    get,
    post
};
// @endif
