/**
 * @file 格式化距离
 */


/**
 * 格式化距离
 * @param {number} distance 距离
 * @return {string} String 100m、1.0km
 */
export function formatdistance(distance) {
    const a = parseFloat(distance);
    if (isNaN(a)) {
        return '';
    } else if (a >= 1000) {
        return (a / 1000).toFixed(1) + 'km';
    } else {
        return Math.floor(a) + 'm';
    }
}


/**
 * 格式城市名字
 * @param {Object} e 城市坐标信息
 * @return {string} String 显示城市名称
 */
export function formatcity(e) {
    if (!e) {
        return '';
    }
    return `${
        e.province || ''
    }${
        e.city === e.province ? '' : e.city
    }${
        e.district || ''
    }${
        e.street || ''
    }${
        e.streetNumber || ''
    }`;
}
