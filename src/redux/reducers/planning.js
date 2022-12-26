import {
    GET_KPI_AGUAYMANTO_FAIL,
    GET_KPI_AGUAYMANTO_SUCCESS,
    GET_KPI_MANGO_FAIL,
    GET_KPI_MANGO_SUCCESS,
    GET_KPI_PINEAPPLE_FAIL,
    GET_KPI_PINEAPPLE_SUCCESS
} from '../actions/types';

const initialState = {
    pineapple: null,
    mango: null,
    aguaymanto: null,
    summary_pineapple: null,
    summary_mango: null,
    summary_aguaymanto: null,
};

export default function Planning(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_KPI_PINEAPPLE_SUCCESS:
            return {
                ...state, pineapple: payload.result, summary_pineapple: payload.summary
            }
        case GET_KPI_PINEAPPLE_FAIL:
            return {
                ...state, pineapple: null, summary_pineapple: null
            }
        case GET_KPI_MANGO_SUCCESS:
            return {
                ...state, mango: payload.result, summary_mango: payload.summary
            }
        case GET_KPI_MANGO_FAIL:
            return {
                ...state, mango: null, summary_mango: null
            }
        case GET_KPI_AGUAYMANTO_SUCCESS:
            return {
                ...state, aguaymanto: payload.result, summary_aguaymanto: payload.summary
            }
        case GET_KPI_AGUAYMANTO_FAIL:
            return {
                ...state, aguaymanto: null, summary_aguaymanto: null
            }

        default:
            return state
    }
}