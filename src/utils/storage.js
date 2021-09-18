/**
 * @file storage
 * @author meijuntao@baidu.com
 */

/* globals Page, swan */
import log from './log';

const KEYS_MAP = {
    USER: 'USER_INFO',
    HOME: 'HOME',
    SEARCH_CITY: 'SEARCH_CITY',
    SEARCH_HISTORY: 'SEARCH_HISTORY'
};

export default {
    set(key, data) {
        return new Promise((resolve, reject) => {
            if (KEYS_MAP[key]) {
                swan.setStorage({
                    key: KEYS_MAP[key],
                    data: data,
                    success(res) {
                        resolve(res);
                    },
                    fail(err) {
                        log.send('storage_error', {
                            code: err.errCode,
                            msg: err.errMsg
                        });
                        reject(err);
                    }
                });
            } else {
                const msg = `[${key}]不存在key-map中`;
                log.send('storage_error', {
                    code: '-9999',
                    msg
                });
                reject(msg);
            }
        });
    },

    get(key) {
        return new Promise((resolve, reject) => {
            if (KEYS_MAP[key]) {
                swan.getStorage({
                    key: KEYS_MAP[key],
                    success(res) {
                        resolve(res.data);
                    },
                    fail(err) {
                        log.send('storage_error', {
                            code: err.errCode,
                            msg: err.errMsg
                        });
                        reject(err);
                    }
                });
            } else {
                const msg = `[${key}]不存在key-map中`;
                log.send('storage_error', {
                    code: '-9999',
                    msg
                });
                reject(msg);
            }
        });
    },

    getSync(key) {
        if (KEYS_MAP[key]) {
            return swan.getStorageSync(KEYS_MAP[key]) || '';
        } else {
            const msg = `[${key}]不存在key-map中`;
            log.send('storage_error', {
                code: '-9999',
                msg
            });

            return;
        }
    }
};
