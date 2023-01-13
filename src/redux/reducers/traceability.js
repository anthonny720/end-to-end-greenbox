import {GET_TRACEABILITY_FAIL, GET_TRACEABILITY_SUCCESS} from '../actions/types';

const initialState = {
    acopio: null, report_mp: null, report_pt: null, quality: null, conditioning: null
}
export default function Traceability(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_TRACEABILITY_SUCCESS:
            return {
                ...state,
                acopio: payload.acopio,
                report_mp: payload.report_mp,
                report_pt: payload.report_pt,
                quality: payload.quality,
                conditioning: payload.conditioning
            }
        case GET_TRACEABILITY_FAIL:
            return {
                ...state, acopio: null, report_mp: null, report_pt: null, quality: null, conditioning: null
            }


        default:
            return state;
    }
}