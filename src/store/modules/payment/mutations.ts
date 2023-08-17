export default {
    setLoading(state: any, payload: any) {
        state.isLoading = payload;
    },
    setError(state: any, payload: any) {
        state.error = payload;
    },
    setPaymentIntent(state: any, payload: any) {
        state.paymentIntent = payload;
    }
}