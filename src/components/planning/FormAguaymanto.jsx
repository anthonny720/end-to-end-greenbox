import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {map} from "lodash";
import {update_kpi_aguaymanto} from "../../redux/actions/planning";


const FormPlanningAguaymanto = ({data, close, params}) => {


    const columns = [
        {name: 'entry', title: 'Proy. ingreso', type: 'text', maxLength: 7},
        {name: 'entry_objective', title: '% Objetivo ingreso', type: 'text', maxLength: 3},
        {name: 'discard', title: 'Kg descarte', type: 'text', maxLength: 7},
        {name: 'caliz', title: 'Kg caliz', type: 'text', maxLength: 7},
        {name: 'discard_objective', title: '% Objetivo descarte', type: 'text', maxLength: 2},
        {name: 'kg_brute', title: 'Kg mp bruta', type: 'text', maxLength: 7},
        {name: 'objective', title: '% Objetivo producción', type: 'text', maxLength: 3},
        {name: 'price_objective', title: 'Precio objetivo', type: 'text', maxLength: 4},
    ]

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_kpi_aguaymanto(form, data.id, params))
            close()
        }
    })

    console.log(data)


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid grid-cols-2 gap-2`}>
            {

                map(columns, (column, index) => (
                    <div key={index}>
                        <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))

            }
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = (data) => {
    return {
        entry: data?.entry || 0,
        entry_objective: data?.entry_objective || 100,
        discard: data?.discard || 0,
        kg_brute: data?.kg_brute || 0,
        objective: data?.objective || 90,
        price_objective: data?.price_objective || 2.60,
        caliz: data?.caliz || 0,
        discard_objective: data?.discard_objective || 5,


    }
}
const newSchema = () => {
    return {
        entry: Yup.number().min(0).required(true),
        entry_objective: Yup.number().integer().min(100).max(100).required(true),
        discard: Yup.number().min(0).required(true),
        kg_brute: Yup.number().min(0).required(true),
        objective: Yup.number().min(80).max(100).integer().required(true),
        price_objective: Yup.number().min(0).required(true),
    }
}


export default FormPlanningAguaymanto;
