import {
    ADD_KARDEX_COMMERCIAL_FAIL,
    ADD_KARDEX_COMMERCIAL_SUCCESS,
    GET_CONDITION_COMMERCIAL_FAIL,
    GET_CONDITION_COMMERCIAL_SUCCESS,
    GET_CUT_COMMERCIAL_FAIL,
    GET_CUT_COMMERCIAL_SUCCESS,
    GET_FAMILY_COMMERCIAL_FAIL,
    GET_FAMILY_COMMERCIAL_SUCCESS,
    GET_GROUP_COMMERCIAL_FAIL,
    GET_GROUP_COMMERCIAL_SUCCESS,
    GET_KARDEX_COMMERCIAL_FAIL,
    GET_KARDEX_COMMERCIAL_SUCCESS,
    GET_LOT_COMMERCIAL_FAIL,
    GET_LOT_COMMERCIAL_SUCCESS,
    GET_LOTS_COMMERCIAL_FAIL,
    GET_LOTS_COMMERCIAL_SUCCESS,
    GET_PACKAGING_COMMERCIAL_FAIL,
    GET_PACKAGING_COMMERCIAL_SUCCESS,
    GET_PACKING_COMMERCIAL_FAIL,
    GET_PACKING_COMMERCIAL_SUCCESS,
    GET_PRESENTATION_COMMERCIAL_FAIL,
    GET_PRESENTATION_COMMERCIAL_SUCCESS,
    GET_PRODUCTS_COMMERCIAL_FAIL,
    GET_PRODUCTS_COMMERCIAL_SUCCESS,
    GET_PROVIDER_COMMERCIAL_FAIL,
    GET_PROVIDER_COMMERCIAL_SUCCESS,
    GET_TYPE_COMMERCIAL_FAIL,
    GET_TYPE_COMMERCIAL_SUCCESS,
    GET_VARIETY_COMMERCIAL_FAIL,
    GET_VARIETY_COMMERCIAL_SUCCESS
} from '../actions/types';

const initialState = {
    stock: 0,
    products: null,
    lots: null,
    count: null,
    family: null,
    group: null,
    type_inf: null,
    cut: null,
    variety: null,
    presentation: null,
    packaging: null,
    packing: null,
    provider: null,
    condition: null,
    lot: null,
    events: null,
}
export default function Commercial(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_KARDEX_COMMERCIAL_SUCCESS:
            return {
                ...state, events: payload.result
            }
        case GET_KARDEX_COMMERCIAL_FAIL:
            return {
                ...state, events: null
            }
        case GET_PRODUCTS_COMMERCIAL_SUCCESS:
            return {
                ...state, products: payload.result
            }
        case GET_PRODUCTS_COMMERCIAL_FAIL:
            return {
                ...state, products: null
            }
        case GET_FAMILY_COMMERCIAL_SUCCESS:
            return {
                ...state, family: payload.result, stock: payload.stock
            }
        case GET_FAMILY_COMMERCIAL_FAIL:
            return {
                ...state, family: null, stock: 0
            }
        case GET_GROUP_COMMERCIAL_SUCCESS:
            return {
                ...state, group: payload.result
            }
        case GET_GROUP_COMMERCIAL_FAIL:
            return {
                ...state, group: null,
            }
        case GET_TYPE_COMMERCIAL_SUCCESS:
            return {
                ...state, type_inf: payload.result
            }
        case GET_TYPE_COMMERCIAL_FAIL:
            return {
                ...state, type_inf: null,
            }
        case GET_CUT_COMMERCIAL_SUCCESS:
            return {
                ...state, cut: payload.result
            }
        case GET_CUT_COMMERCIAL_FAIL:
            return {
                ...state, cut: null,
            }
        case GET_VARIETY_COMMERCIAL_SUCCESS:
            return {
                ...state, variety: payload.result
            }
        case GET_VARIETY_COMMERCIAL_FAIL:
            return {
                ...state, variety: null,
            }
        case GET_PRESENTATION_COMMERCIAL_SUCCESS:
            return {
                ...state, presentation: payload.result
            }
        case GET_PRESENTATION_COMMERCIAL_FAIL:
            return {
                ...state, presentation: payload.result
            }
        case GET_PACKAGING_COMMERCIAL_SUCCESS:
            return {
                ...state, packaging: payload.result
            }
        case GET_PACKAGING_COMMERCIAL_FAIL:
            return {
                ...state, packaging: payload.result
            }
        case GET_PACKING_COMMERCIAL_SUCCESS:
            return {
                ...state, packing: payload.result
            }
        case GET_PACKING_COMMERCIAL_FAIL:
            return {
                ...state, packing: payload.result
            }
        case GET_PROVIDER_COMMERCIAL_SUCCESS:
            return {
                ...state, provider: payload.result
            }
        case GET_PROVIDER_COMMERCIAL_FAIL:
            return {
                ...state, provider: payload.result
            }
        case GET_CONDITION_COMMERCIAL_SUCCESS:
            return {
                ...state, condition: payload.result
            }
        case GET_CONDITION_COMMERCIAL_FAIL:
            return {
                ...state, condition: payload.result
            }

        case GET_LOTS_COMMERCIAL_SUCCESS:
            return {
                ...state, lots: payload.results, count: payload.count
            }
        case GET_LOTS_COMMERCIAL_FAIL:
            return {
                ...state, lots: null, count: null
            }
        case GET_LOT_COMMERCIAL_SUCCESS:
            return {
                ...state, lot: payload.result,
            }
        case GET_LOT_COMMERCIAL_FAIL:
            return {
                ...state, lot: null, count: null
            }
        case ADD_KARDEX_COMMERCIAL_SUCCESS:
        case ADD_KARDEX_COMMERCIAL_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}