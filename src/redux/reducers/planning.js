import {
    GET_KPI_AGUAYMANTO_FAIL,
    GET_KPI_AGUAYMANTO_SUCCESS,
    GET_KPI_MAINTENANCE_FAIL,
    GET_KPI_MAINTENANCE_SUCCESS,
    GET_KPI_MANGO_FAIL,
    GET_KPI_MANGO_SUCCESS,
    GET_KPI_PINEAPPLE_FAIL,
    GET_KPI_PINEAPPLE_SUCCESS,
    UPDATE_KPI_AGUAYMANTO_FAIL,
    UPDATE_KPI_AGUAYMANTO_SUCCESS,
    UPDATE_KPI_MAINTENANCE_FAIL,
    UPDATE_KPI_MAINTENANCE_SUCCESS,
    UPDATE_KPI_MANGO_FAIL,
    UPDATE_KPI_MANGO_SUCCESS,
    UPDATE_KPI_PINEAPPLE_FAIL,
    UPDATE_KPI_PINEAPPLE_SUCCESS
} from '../actions/types';

const initialState = {
    pineapple: null,
    mango: null,
    aguaymanto: null,
    summary_pineapple: null,
    summary_mango: null,
    summary_aguaymanto: null,
    maintenance: null,
    summary_maintenance: null,
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
        case GET_KPI_MAINTENANCE_SUCCESS:
            return {
                ...state, maintenance: payload.result, summary_maintenance: payload.summary
            }
        case GET_KPI_MAINTENANCE_FAIL:
            return {
                ...state, maintenance: null, summary_maintenance: null
            }
        case UPDATE_KPI_PINEAPPLE_SUCCESS:
        case UPDATE_KPI_PINEAPPLE_FAIL:
        case UPDATE_KPI_MANGO_SUCCESS:
        case UPDATE_KPI_MANGO_FAIL:
        case UPDATE_KPI_AGUAYMANTO_SUCCESS:
        case UPDATE_KPI_AGUAYMANTO_FAIL:
        case UPDATE_KPI_MAINTENANCE_SUCCESS:
        case UPDATE_KPI_MAINTENANCE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}