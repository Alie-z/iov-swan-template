/**
 * @file store action
 * @author meijuntao@baidu.com
 */
export default {
    addBook(context, payload) {
        context.commit('addBook', payload);
    },
    formDetailChange(context, payload) {
        context.commit('formDetailChange', payload);
    },
    formDetailChangeItem(context, payload) {
        context.commit('formDetailChangeItem', payload);
    },
    changeInvoiceDetail(context, payload) {
        context.commit('changeInvoiceDetail', payload);
    }
};
