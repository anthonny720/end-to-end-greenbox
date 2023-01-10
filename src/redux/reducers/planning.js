import {
    GET_KPI_AGUAYMANTO_FAIL,
    GET_KPI_AGUAYMANTO_SUCCESS,
    GET_KPI_MANGO_FAIL,
    GET_KPI_MANGO_SUCCESS,
    GET_KPI_PINEAPPLE_FAIL,
    GET_KPI_PINEAPPLE_SUCCESS,
    UPDATE_KPI_AGUAYMANTO_FAIL,
    UPDATE_KPI_AGUAYMANTO_SUCCESS,
    UPDATE_KPI_MANGO_FAIL,
    UPDATE_KPI_MANGO_SUCCESS,
    UPDATE_KPI_PINEAPPLE_FAIL,
    UPDATE_KPI_PINEAPPLE_SUCCESS
} from '../actions/types';

const initialState = {
    pineapple: null,
    mango: null,
    aguaymanto: null,
    maintenance: null,
};

export default function Planning(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_KPI_PINEAPPLE_SUCCESS:
            return {
                ...state, pineapple: payload.result
            }
        case GET_KPI_PINEAPPLE_FAIL:
            return {
                ...state, pineapple: null
            }
        case GET_KPI_MANGO_SUCCESS:
            return {
                ...state, mango: payload.result
            }
        case GET_KPI_MANGO_FAIL:
            return {
                ...state, mango: null
            }
        case GET_KPI_AGUAYMANTO_SUCCESS:
            return {
                ...state, aguaymanto: payload.result
            }
        case GET_KPI_AGUAYMANTO_FAIL:
            return {
                ...state, aguaymanto: null
            }
        case UPDATE_KPI_PINEAPPLE_SUCCESS:
        case UPDATE_KPI_PINEAPPLE_FAIL:
        case UPDATE_KPI_MANGO_SUCCESS:
        case UPDATE_KPI_MANGO_FAIL:
        case UPDATE_KPI_AGUAYMANTO_SUCCESS:
        case UPDATE_KPI_AGUAYMANTO_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}