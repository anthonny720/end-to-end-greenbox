import {GET_TRACEABILITY_FAIL, GET_TRACEABILITY_SUCCESS} from '../actions/types';

const initialState = {
    acopio: null, report_mp: null, report_pt: null, quality: null, conditioning: null,terminated: null,released: null,packing:null,comex:null
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
                conditioning: payload.conditioning,
                terminated: payload.terminated,
                released: payload.released,
                packing: payload.packing,
                comex: payload.comex
            }
        case GET_TRACEABILITY_FAIL:
            return {
                ...state, acopio: null, report_mp: null, report_pt: null, quality: null, conditioning: null,terminated: null,released: null,
                packing: null,comex: null
            }


        default:
            return state;
    }
}