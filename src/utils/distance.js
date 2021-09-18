/**
 * @file 根据距离计算经纬度函数
 *
*/


/**
 * 计算两点之间的距离
 * @param {number} lat1 经纬度
 * @param {number} lng1 经纬度
 * @param {number} lat2 经纬度
 * @param {number} lng2 经纬度
 * @return {number} 返回距离(米)
 */
function getDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = lat1 * Math.PI / 180.0;
    let radLat2 = lat2 * Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
    + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return Math.floor(s * 1000);
};

export default getDistance;