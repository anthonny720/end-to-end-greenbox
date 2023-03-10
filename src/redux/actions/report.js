import {
    GET_PROVIDERS_CATEGORY_FAIL,
    GET_PROVIDERS_CATEGORY_SUCCESS,
    GET_REPORT_FAIL,
    GET_REPORT_PT_BANANA,
    GET_REPORT_PT_BANANA_FAIL,
    GET_REPORT_PT_BLUEBERRY,
    GET_REPORT_PT_BLUEBERRY_FAIL,
    GET_REPORT_PT_GOLDENBERRY,
    GET_REPORT_PT_GOLDENBERRY_FAIL,
    GET_REPORT_PT_MANGO,
    GET_REPORT_PT_MANGO_FAIL,
    GET_REPORT_PT_PINEAPPLE,
    GET_REPORT_PT_PINEAPPLE_FAIL,
    GET_REPORT_SUCCESS,
    GET_SUMMARY_CATEGORY_FAIL,
    GET_SUMMARY_CATEGORY_SUCCESS,
    UPDATE_REPORT_FAIL,
    UPDATE_REPORT_PT_BANANA,
    UPDATE_REPORT_PT_BANANA_FAIL, UPDATE_REPORT_PT_BLUEBERRY, UPDATE_REPORT_PT_BLUEBERRY_FAIL,
    UPDATE_REPORT_PT_GOLDENBERRY,
    UPDATE_REPORT_PT_GOLDENBERRY_FAIL,
    UPDATE_REPORT_PT_MANGO,
    UPDATE_REPORT_PT_MANGO_FAIL,
    UPDATE_REPORT_PT_PINEAPPLE,
    UPDATE_REPORT_PT_PINEAPPLE_FAIL,
    UPDATE_REPORT_SUCCESS,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getReport = (category, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_FAIL
        });
    }
}
export const getReport_page = (category, params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/${category}?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_FAIL
        });
    }
}

export const getProvidersCategory = (category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/providers/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_CATEGORY_FAIL
        });
    }
}
export const getSummaryCategory = (category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/summary/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SUMMARY_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SUMMARY_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SUMMARY_CATEGORY_FAIL
        });
    }
}

export const update_report = (form, id, category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_SUCCESS,
            });
            dispatch(getSummaryCategory(category));
            dispatch(getReport(category));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const get_report_pt_pineapple = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }

    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/pt/pineapple`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PT_PINEAPPLE,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PT_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PT_PINEAPPLE_FAIL
        });
    }
}
export const get_report_pt_mango = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }

    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/pt/mango`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PT_MANGO,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PT_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PT_MANGO_FAIL
        });
    }
}
export const get_report_pt_banano = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }

    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/pt/banano`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PT_BANANA,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PT_BANANA_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PT_BANANA_FAIL
        });
    }
}
export const get_report_pt_goldenberry = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }

    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/pt/goldenberry`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PT_GOLDENBERRY,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PT_GOLDENBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PT_GOLDENBERRY_FAIL
        });
    }
}
export const get_report_pt_blueberry = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }

    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/pt/blueberry`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PT_BLUEBERRY,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PT_BLUEBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PT_BLUEBERRY_FAIL
        });
    }
}

export const update_report_pt_mango = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/pt/mango/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_PT_MANGO,
            });
            dispatch(get_report_pt_mango(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_REPORT_PT_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_PT_MANGO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_report_pt_pineapple = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/pt/pineapple/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_PT_PINEAPPLE,
            });
            dispatch(get_report_pt_pineapple(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_REPORT_PT_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_PT_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_report_pt_banana = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/pt/banana/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_PT_BANANA,
            });
            dispatch(get_report_pt_banano(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_REPORT_PT_BANANA_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_PT_BANANA_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_report_pt_goldenberry = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/pt/goldenberry/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_PT_GOLDENBERRY,
            });
            dispatch(get_report_pt_goldenberry(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_REPORT_PT_GOLDENBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_PT_GOLDENBERRY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_report_pt_blueberry = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/pt/blueberry/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_PT_BLUEBERRY,
            });
            dispatch(get_report_pt_blueberry(params));
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_REPORT_PT_BLUEBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_PT_BLUEBERRY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}