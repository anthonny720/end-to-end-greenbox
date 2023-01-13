import {
    ADD_KARDEX_COMMERCIAL_FAIL,
    ADD_KARDEX_COMMERCIAL_SUCCESS,
    ADD_LOT_COMMERCIAL_FAIL,
    ADD_LOT_COMMERCIAL_SUCCESS,
    DELETE_LOT_COMMERCIAL_FAIL,
    DELETE_LOT_COMMERCIAL_SUCCESS,
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
    GET_TRACEABILITY_FAIL,
    GET_TRACEABILITY_SUCCESS,
    GET_TYPE_COMMERCIAL_FAIL,
    GET_TYPE_COMMERCIAL_SUCCESS,
    GET_VARIETY_COMMERCIAL_FAIL,
    GET_VARIETY_COMMERCIAL_SUCCESS,
    UPDATE_LOT_COMMERCIAL_FAIL,
    UPDATE_LOT_COMMERCIAL_SUCCESS
} from './types'

import axios from "axios";
import {setAlert} from "./alert";

export const get_traceability = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/traceability/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TRACEABILITY_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_TRACEABILITY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TRACEABILITY_FAIL
        });

    }
}
export const get_family = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/family`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FAMILY_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_FAMILY_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FAMILY_COMMERCIAL_FAIL
        });

    }
}
export const get_group = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/group`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GROUP_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_GROUP_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GROUP_COMMERCIAL_FAIL
        });

    }
}
export const get_type = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/type`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TYPE_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_TYPE_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TYPE_COMMERCIAL_FAIL
        });

    }
}
export const get_cut = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/cut/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CUT_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CUT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CUT_COMMERCIAL_FAIL
        });

    }
}
export const get_variety = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/variety/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_VARIETY_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_VARIETY_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_VARIETY_COMMERCIAL_FAIL
        });

    }
}

export const get_presentation = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/presentation`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRESENTATION_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRESENTATION_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRESENTATION_COMMERCIAL_FAIL
        });

    }
}
export const get_packaging = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/packaging`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKAGING_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKAGING_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKAGING_COMMERCIAL_FAIL
        });

    }
}
export const get_packing = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/packing`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_COMMERCIAL_FAIL
        });

    }
}


export const get_condition = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/condition`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CONDITION_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CONDITION_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CONDITION_COMMERCIAL_FAIL
        });

    }
}

export const add_lots = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/commercial/lot`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_LOT_COMMERCIAL_SUCCESS, payload: res.data
            });
            dispatch(get_lots())
            dispatch(get_family())


            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_LOT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_LOT_COMMERCIAL_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_lot = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/commercial/lot/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_LOT_COMMERCIAL_SUCCESS,
            });
            dispatch(get_lots())
            dispatch(get_family())

            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_LOT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_LOT_COMMERCIAL_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_lot = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/commercial/lot/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_LOT_COMMERCIAL_SUCCESS,
            });
            dispatch(get_lots())
            dispatch(get_family())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: DELETE_LOT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_LOT_COMMERCIAL_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const get_lot = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/lot/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOT_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOT_COMMERCIAL_FAIL
        });

    }
}

export const get_lots = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/lot`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_COMMERCIAL_FAIL
        });

    }
}
export const get_lots_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/lot?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_COMMERCIAL_FAIL
        });

    }
}

export const get_kardex = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/kardex/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_KARDEX_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_KARDEX_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_KARDEX_COMMERCIAL_FAIL
        });

    }
}
export const add_kardex = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/commercial/kardex`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_KARDEX_COMMERCIAL_SUCCESS, payload: res.data
            });
            dispatch(get_kardex(slug))
            dispatch(get_lot(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_KARDEX_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_KARDEX_COMMERCIAL_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}