/*eslint-disable*/

// @if NODE_ENV = 'development'
if (!swan.iovauto) {
    swan.iovauto = {
        getBduss: obj => {
            obj.success(
                'hwczVuWlNzaXNvV3RKQ3NyVkY1MmVnb2U2RUFxfkVHemVqdjlZbGdVZ2NHODVlSVFBQUFBJCQAAAAAAAAAAAEAAADqrFkgZmt1ZWlkZmYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByOpl4cjqZeY1'
            );
        },
        getIovConfig: obj => {
            obj.success({
                prefix: '123456',
                suffix: '123456',
                ak: 'sgm_info4',
                cn: 2001,
                c: 'a',
                uuid: 'my_uuid'
            });
        },
        getPhone(options) {
            if (options.success) {
                // 可以写自己的手机号
                options.success('17610888798');
            }
        },
        getVehicleInfo(options) {
            if (options.success) {
                options.success({brand: '凯迪'});
            }
        }
    };
}
// @endif

const publicjs = {
    // @if NODE_ENV = 'development'
    apiRootUrl: 'https://sandbox-vehicle.baidu.com',
    mock: 'http://127.0.0.1:7001',
    // @endif
    // @if NODE_ENV = 'production'
    apiRootUrl: 'http://sandbox.codriverapi.baidu.com/operationbackend'
    // @endif
};
export default publicjs;
