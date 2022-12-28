import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {map} from "lodash";
import {update_kpi_maintenance} from "../../redux/actions/planning";


const FormMaintenance = ({data, close, params}) => {
    const user = useSelector(state => state.Auth.user);


    const columns = [
        {name: 'consumption', title: 'Consumo GLP', type: 'text', maxLength: 5},
        {name: 'kg_terminated', title: 'Kg PT', type: 'text', maxLength: 9},
        {name: 'kg_executed', title: 'Kg ejecutados', type: 'text', maxLength: 8},
        {name: 'ability', title: 'Capacidad picadora', type: 'text', maxLength:5 },
        {name: 'kg_defective', title: 'Kg defectuosos', type: 'text', maxLength: 9},
        {name: 'kg_released', title: 'Kg lanzados', type: 'text', maxLength: 9},
    ]

    const columns2 = [
        {name: 'works_scheduled', title: 'Precio objetivo', type: 'text', maxLength: 2},
        {name: 'work_corrective', title: 'Precio objetivo', type: 'text', maxLength: 2},
        {name: 'work_preventive', title: 'Precio objetivo', type: 'text', maxLength: 2},
    ]

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(update_kpi_maintenance(form, data.id, params))
            close()
        }
    })

    console.log(data)


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

        <div className={`grid grid-cols-2 gap-2`}>
            {user && user !== undefined && user !== null && user.get_role_name === 'Operaciones' &&

                map(columns, (column, index) => (
                    <div key={index}>
                        <p className={`${formik.errors[column.name] ? "text-red-500" : "text-base mt-4 font-medium leading-none text-gray-800"}`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase"
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))

            }
            {user && user !== undefined && user !== null && user.get_role_name === 'Mantenimiento' &&
                map(columns2, (column, index) => (
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
        consumption: data?.consumption || 0,
        kg_terminated: data?.kg_terminated || 0,
        kg_executed: data?.kg_executed || 0,
        ability: data?.ability || 0,
        kg_defective: data?.kg_defective || 0,
        kg_released: data?.kg_released || 0,
        works_scheduled: data?.works_scheduled || 0,
        work_corrective: data?.work_corrective || 0,
        work_preventive: data?.work_preventive || 0,

    }
}
const newSchema = () => {
    return {
        consumption: Yup.number().min(0),
        kg_terminated: Yup.number(),
        kg_executed: Yup.number().min(0),
        ability: Yup.number().min(1008).max(1800).integer(),
        kg_defective: Yup.number().min(0),
        kg_released: Yup.number().min(0).integer(),
        works_scheduled: Yup.number().min(0).integer(),
        work_corrective: Yup.number().min(0).integer(),
        work_preventive: Yup.number().min(0).integer(),
    }
}

export default FormMaintenance;
