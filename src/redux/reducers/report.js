import {
    GET_PROVIDERS_CATEGORY_FAIL,
    GET_PROVIDERS_CATEGORY_SUCCESS,
    GET_REPORT_FAIL,
    GET_REPORT_PT_BANANA,
    GET_REPORT_PT_BANANA_FAIL, GET_REPORT_PT_BLUEBERRY, GET_REPORT_PT_BLUEBERRY_FAIL,
    GET_REPORT_PT_GOLDENBERRY,
    GET_REPORT_PT_GOLDENBERRY_FAIL,
    GET_REPORT_PT_MANGO,
    GET_REPORT_PT_MANGO_FAIL,
    GET_REPORT_PT_PINEAPPLE,
    GET_REPORT_PT_PINEAPPLE_FAIL,
    GET_REPORT_SUCCESS,
    GET_SUMMARY_CATEGORY_FAIL,
    GET_SUMMARY_CATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
    category_data: null,
    report: null,
    providers: null,
    summary_provider: null,
    summary_avg_price: null,
    summary_kg_month: null,
    summary_month: null,
    summary_provider_kg: null,
    summary_provider_month: null,
    count: null,
    next: null,
    previous: null,
    pineapple:null,
    banana:null,
    mango:null,
    goldenberry:null,
    blueberry:null
}

export default function Report(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_REPORT_PT_PINEAPPLE:
            return{
                ...state,pineapple: payload.result
            }
            case GET_REPORT_PT_PINEAPPLE_FAIL:
                return{
                    ...state,pineapple: null
                }
            case GET_REPORT_PT_MANGO:
                return{
                    ...state,mango: payload.result
                }
            case GET_REPORT_PT_MANGO_FAIL:
                return{
                    ...state,mango: null
                }
            case GET_REPORT_PT_BANANA:
                return{
                    ...state, banana: payload.result
                }
            case GET_REPORT_PT_BANANA_FAIL:
                return{
                    ...state,banana: null
                }
            case GET_REPORT_PT_GOLDENBERRY:
                return{
                    ...state, goldenberry: payload.result
                }
            case GET_REPORT_PT_GOLDENBERRY_FAIL:
                return{
                    ...state, goldenberry: null
                }
            case GET_REPORT_PT_BLUEBERRY:
                return{
                    ...state, blueberry: payload.result
                }
            case GET_REPORT_PT_BLUEBERRY_FAIL:
                return{
                    ...state, blueberry: null
                }
        case GET_REPORT_SUCCESS:
            return {
                ...state,
                category_data: payload.results.result,
                report: payload.results.report,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_REPORT_FAIL:
            return {
                ...state, category_data: null, report: null, count: null, next: null, previous: null
            }
        case GET_PROVIDERS_CATEGORY_SUCCESS:
            return {
                ...state, providers: payload.providers
            }
        case GET_PROVIDERS_CATEGORY_FAIL:
            return {
                ...state, providers: null
            }
        case GET_SUMMARY_CATEGORY_SUCCESS:
            return {
                ...state,
                summary_month: payload.orders_by_month,
                summary_provider: payload.orders_by_provider,
                summary_provider_month: payload.providers_by_month,
                summary_provider_kg: payload.providers_by_kg,
                summary_kg_month: payload.kg_by_month,
                summary_avg_price: payload.summary_avg_price
            }
        case GET_SUMMARY_CATEGORY_FAIL:
            return {
                ...state,
                summary_provider: null,
                summary_avg_price: null,
                summary_kg_month: null,
                summary_month: null,
                summary_provider_kg: null,
                summary_provider_month: null

            }
        default:
            return state
    }
}