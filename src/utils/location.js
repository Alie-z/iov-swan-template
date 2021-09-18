const NAME_MAP = {
    CITY: 'city',
    DISTRICT: 'district',
    LATITUDE: 'latitude',
    LONGITUDE: 'longitude',
    PROVINCE: 'province',
    STREET: 'street'
};

export default {

    /**
     * getByProp
     *
     * @param {string} name MAP中的KEY
     * @return {Object} Promise
     */
    getByProp(name) {
        return new Promise((resolve, reject) => {
            if (!NAME_MAP[name]) {
                const msg = 'name [' + name + '] not found！';
                reject(msg);
            }
            else {
                this.getWithNative().then(res => {
                    resolve(res[NAME_MAP[name]]);
                }, err => {
                    reject(err);
                });
            }
        });
    },

    // 定位失败时使用默认数据
    // 可以通过opt.reject = true，来改变返回的状态
    // opt.realResult = true，来改变返回的状态
    getWithNative(opt = {}) {
        return new Promise((resolve, reject) => {
            swan.getLocation({
                type: 'gcj02',
                success(res) {
                    resolve(res);
                },
                fail(err) {
                    reject(err);
                }
            });
        });
    }
};
