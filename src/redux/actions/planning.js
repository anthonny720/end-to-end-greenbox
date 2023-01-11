import axios from "axios";
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
} from "./types";
import {setAlert} from "./alert";

export const get_kpi_pineapple = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/planning/kpi/pineapple`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_KPI_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_KPI_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_KPI_PINEAPPLE_FAIL
        });

    }
}

export const get_kpi_mango = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/planning/kpi/mango`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_KPI_MANGO_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_KPI_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_KPI_MANGO_FAIL
        });

    }
}
export const get_kpi_aguaymanto = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/planning/kpi/aguaymanto`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_KPI_AGUAYMANTO_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_KPI_AGUAYMANTO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_KPI_AGUAYMANTO_FAIL
        });

    }
}

export const update_kpi_aguaymanto = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/planning/kpi/aguaymanto/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_KPI_AGUAYMANTO_SUCCESS
            });
            dispatch(get_kpi_aguaymanto(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_KPI_AGUAYMANTO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_KPI_AGUAYMANTO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_kpi_pineapple = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/planning/kpi/pineapple/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_KPI_PINEAPPLE_SUCCESS
            });
            dispatch(get_kpi_pineapple(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_KPI_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_KPI_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_kpi_mango = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/planning/kpi/mango/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_KPI_MANGO_SUCCESS
            });
            dispatch(get_kpi_mango(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_KPI_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_KPI_MANGO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

