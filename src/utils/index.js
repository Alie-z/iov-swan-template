/**
 * @file
 * @author meijuntao@baidu.com
 *  通用方法
 */

function speak(e, message = '好的') {
    if (swan.iovauto && e && e.vsl) {
        swan.iovauto.speak(message, false);
    }
}

export default {
    speak
};
