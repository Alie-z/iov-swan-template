/**
 *  @file 全局
 */

export function set(key, val) {
    globalData[key] = val;
}

export function get(key) {
    return globalData[key];
}
