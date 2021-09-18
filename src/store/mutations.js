/**
 * @file store reduce
 * @author meijuntao@baidu.com
 */
export default {
    addBook(state, payload) {
        state.bookList.push(payload);
        return state;
    },
    formDetailChange(state, payload) {
        state.formDetail = payload;
    },
    formDetailChangeItem(state, payload) {
        const params = state.formDetail;
        state.formDetail = {
            ...params,
            ...payload
        };
        return state;
    },
    changeInvoiceDetail(state, payload) {
        state.invoiceDetail = payload;
        return state;
    }
};
